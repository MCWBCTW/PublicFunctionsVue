<template>
    <input id="input" type="file" @change="choiceFile">

    <button @click="upload">上传文件</button>
</template>


<script setup lang="ts">

    import SparkMD5 from 'spark-md5'

    import { CreateRequest } from '../../utils/request'

    // 定义单个文件切片的数据规范
    interface ISingleFile {
        file: FormData
        index: Number
        name: String
        mark: String
    }

    // 储存文件切片数组
    let fileArray: Array<ISingleFile> = [];


    // 选择文件
    function choiceFile(){
        let input = document.getElementById('input') as HTMLInputElement;
        if(input.files !== null){
            splitFile(input.files[0], 1).then(res => {
                fileArray = res;
                console.log(fileArray)
            })
        }
    }


    /**
     * 将传入的文件分片，返回分片后的数组
     * @param file 需要分片的文件
     * @param splitSize 每一片文件的大小，默认为1M
     */
    async function splitFile(file: File, splitSize: number = 1):Promise<Array<ISingleFile>>{
        const single: number = 1024 * 1024 * splitSize; // 单个切片的大小

        const { size, type, name } = file; // 当前文件的大小

        let result: Array<ISingleFile> = []; // 返回的文件切片数组
        
        for(let i = 0; i < size; i += single){
            let start = i; // 切片开始的位置
            let end = start + single < size ? start + single : size; // 切片结束的位置

            let itemFile: Blob = file.slice(start, end, type); // 文件切片

            let form = new FormData()
            form.append(type, itemFile)
            let item: ISingleFile = {
                file: form,
                index: i,
                name: name + `-${i}`,
                mark: '',
            }

            let pro = await generateFileMark(itemFile).then(res => {
                item.mark = res as string;
                result.push(item);
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
                const md5 = spark.end();
                resolve(md5 + Date.now());
            };
        });
    }


    async function upload(){
        if(fileArray.length == 0){
            alert('请先选择需要上传的文件')
            return
        }
        fileArray.forEach(item => {
            CreateRequest('POST', '/post/uploadFile', {file: item.file}, {'content-type': 'multipart/form-data'}).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }
</script>


<style scoped>
    
</style>