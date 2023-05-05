<template>
    <input id="input" type="file" @change="choiceFile">
</template>


<script setup lang="ts">

    import SparkMD5 from 'spark-md5'

    // 选择文件
    function choiceFile(){
        let input = document.getElementById('input') as HTMLInputElement;
        console.log(input.files)
        let fileArray: Array<Blob> = [];
        if(input.files !== null){
            fileArray = splitFile(input.files[0], 1);
        }
        console.log(fileArray)
    }


    /**
     * 将传入的文件分片，返回分片后的数组
     * @param file 需要分片的文件
     * @param splitSize 每一片文件的大小，默认为1M
     */
    function splitFile(file: File, splitSize: number = 1):Array<Blob>{
        const single: number = 1024 * 1024 * splitSize; // 单个切片的大小
        
        const { size, type } = file; // 当前文件的大小

        let result: Array<Blob> = []; // 返回的文件切片数组
        
        for(let i = 0; i < size; i += single){
            let start = i; // 切片开始的位置
            let end = start + single < size ? start + single : size; // 切片结束的位置

            let itemFile: Blob = file.slice(start, end, type); // 文件切片

            result.push(itemFile)
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
</script>


<style scoped>
    
</style>