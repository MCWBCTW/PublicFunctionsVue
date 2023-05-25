<template>
    <div>
        <input id="input" type="file" @change="choiceFile">
        <button @click="handleUpload">上传文件</button>
    </div>
    <div class="schedule">
        <span>上传进度：</span>
        <div class="line">
            <div class="line-success" :style="{width: `${value * 4}px`}"></div>
        </div>
        <span>{{ value }}%</span>
    </div>
</template>


<script setup lang="ts">

    import SparkMD5 from 'spark-md5'

    import { CreateRequest } from '../../utils/request'

    // 上传完成的进度值
    let value: Ref<number> = ref(0);

    // 储存文件切片数组
    let fileArray: Array<FormData> = [];

    // 上传失败的切片数组
    let failUploadArray: Array<FormData> = [];
    // 储存切片hash值
    let fileHashArray: Array<string> = [];

    // 当前选中的文件，文件名
    let filename: string = '';

    // 选择文件
    function choiceFile(){
        fileArray = []; // 文件切片置空
        fileHashArray = []; // 文件hash值置空
        let input = document.getElementById('input') as HTMLInputElement;
        if(input.files !== null){
            splitFile(input.files[0], 1).then(res => {
                fileArray = res;
            })
        }
    }


    /**
     * 将传入的文件分片，返回分片后的数组
     * @param file 需要分片的文件
     * @param splitSize 每一片文件的大小，默认为1M
     */
    async function splitFile(file: File, splitSize: number = 1):Promise<Array<FormData>>{
        const single: number = 1024 * 1024 * splitSize; // 单个切片的大小

        const { size, type, name } = file; // 当前文件的大小

        filename = name; // 储存文件名称

        let result: Array<FormData> = []; // 返回的文件切片数组
        
        for(let i = 0; i < size; i += single){
            let start = i; // 切片开始的位置
            let end = start + single < size ? start + single : size; // 切片结束的位置

            let itemFile: Blob = file.slice(start, end, type); // 文件切片

            let form = new FormData()
            form.append('filename', name)
            form.append('chunk', itemFile)
            let pro = await generateFileMark(itemFile).then(res => {
                form.append('hash', res as string)
                result.push(form)
            });
        }
        return result
    }



    /**
     * 为分片的文件生成唯一的标识
     * @param file 需要生成标识的文件
     */
    function generateFileMark(file: Blob){
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            let spark = new SparkMD5();
            reader.readAsBinaryString(file);
            reader.onload = (e: any) => {
                spark.appendBinary(e.target.result);
                const md5: string = spark.end();
                const hash: string = md5 + Date.now();
                fileHashArray.push(hash);
                resolve(hash);
            };
        });
    }


    /**
     * 上传文件，校验当前文件是否已上传过
     */
    function handleUpload(){
        if(fileArray.length == 0){
            alert('请先选择需要上传的文件')
            return
        }
        value.value = 0;
        CreateRequest('GET', '/get/inspectFile', {filename}).then((res: any) => {
            if (res.code == 202) {
                // 文件未上传
                uploadFile(fileArray);
            } else if (res.code == 201) {
                // 文件上传过，不需要再次上传
                value.value = 100;
            }
        })
        
    }


    /**
     * 
     * @param data 上传的文件切片数组
     */
    async function uploadFile(files: Array<FormData>){
        for (let i = 0; i < files.length; i++){
            let result = await CreateRequest('POST', '/post/uploadFile', files[i]).then((res: any) => {
                // 文件切片正常上传
                let index: number = fileHashArray.indexOf(res.data.hash);
                fileHashArray.splice(index, 1);
                value.value = Number(((1 - (fileHashArray.length/fileArray.length)) * 100).toFixed(2));
                if(fileHashArray.length === 0){
                    mergeFile(res.data.filename);
                }
            }).catch(err => {
                failUploadArray.push(files[i])
                if(i == files.length - 1 && failUploadArray.length){
                    uploadFile(JSON.parse(JSON.stringify(failUploadArray))); // 将失败的文件切片重新上传
                    failUploadArray = []; // 置空失败的文件切片
                }
            })
        }
    }


    /**
     * 文件分片上传完成，请求后端合并分片
     */
    function mergeFile(filename: string){
        CreateRequest('GET', '/get/mergeFile', {filename}).then(res => {
            value.value = 100;
        }).catch(err => {
            console.log(err)
        })
    }


    watch(value, (newV) => {
        if(newV == 100){
            // 文件已上传完成，清除已上传的文件
            let input = document.getElementById('input') as HTMLInputElement;
            if(input.files !== null){
                input.files = null;
                input.value = '';
                fileArray = [];
            }
        }
    })
</script>


<style scoped>
    .schedule {
        margin-top: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .line {
        width: 400px;
        height: 10px;
        background-color: gray;
        border-radius: 10px;
        position: relative;
    }
    .line-success {
        height: 10px;
        background-color: gold;
        border-radius: 10px;
        position: absolute;
        top: 0;
    }
</style>