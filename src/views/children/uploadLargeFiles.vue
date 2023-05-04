<template>
    <input id="input" type="file" @change="choiceFile">
</template>


<script setup lang="ts">


    function choiceFile(e: any){
        console.log(e)
        let input = document.getElementById('input') as HTMLInputElement;
        console.log(input.files)
    }
</script>


<style scoped>
    
</style>