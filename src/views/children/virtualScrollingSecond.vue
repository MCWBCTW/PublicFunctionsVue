<template>
    <div class="wrapper" @scroll="contentScroll">
        <div class="pillar" :style="{height: `${data.data.length * lineHeight}px`}"></div>
        <div class="list" :style="{transform: `translateY(${transformY}px)`}">
            <div class="line" :style="{height: `${lineHeight}px`}" v-for="item in ergodicData.data" :key="item.id">
                <span>{{ item.id }}</span>
                <span>{{ item.msg }}</span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { CreateRequest } from '../../utils/request'

    onActivated(() => {
        transformY.value = 0;
        ergodicData.data = data.data.slice(0, 16)
    })

    const lineHeight: number = 50;

    interface Idata {
        data: Array<baseData>
    }
    interface baseData {
        id: number
        msg: string
    }
    let data: Idata = reactive({data: []}); // 页面遍历的数据


    let ergodicData: Idata = reactive({data: []}); // 页面遍历的数据

    function getData () {
        CreateRequest('GET', '/get/oneHundredThousand').then((res: any) => {
            data.data = res.data;
            ergodicData.data = data.data.slice(0, 20);
        })
    }

    getData();


    let transformY: Ref<number> = ref(0);

    function contentScroll(e: any) {
        let top = e.srcElement.scrollTop;
        transformY.value = top - (top % 50);
        let hiddenNum = Math.floor(top / lineHeight);
        ergodicData.data = data.data.slice(hiddenNum, hiddenNum + 20);
    }
</script>


<style scoped>
    .wrapper {
        width: 600px;
        height: 800px;
        position: relative;
        overflow-y: scroll;
    }
    .pillar {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .line {
        width: 500px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>