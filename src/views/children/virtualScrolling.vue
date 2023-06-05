<template>
    <div class="wrapper" @scroll="contentScroll">
        <div class="background" :style="{height:`${ contentHeight }px`}"></div>
        <div class="list" :style="{transform: `translateY(${scrollTop}px)`}">
            <div class="line" v-for="item in ergodicData.data" :key="item.id" :style="{height: `${lineHeight}px`}">
                <span>{{ item.id }}</span>
                <span>{{ item.msg }}</span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { CreateRequest } from '../../utils/request'

    interface Idata {
        data: Array<baseData>
    }
    interface baseData {
        id: number
        msg: string
    }
    let scrollTop: Ref<number> = ref(0); // 滚动隐藏的高度
    let data: Idata = reactive({data: []}); // 全部数据数组
    let ergodicData: Idata = reactive({data: []}); // 遍历的数组
    let lineHeight: number = 50; // 单项行高
    let contentHeight: Ref<number> = ref(0); // 全部数据列表应占高度

    function getData () {
        CreateRequest('GET', '/get/oneHundredThousand').then((res: any) => {
            if(data.data.length == 0){
                data.data = res.data;
            }
            contentHeight.value = data.data.length * 50;
            ergodicData.data = data.data.slice(0, 16)
        })
    }

    getData();


    /**
     * 单条数据高度为 50 px
     * 数据长度为十万条，列表总高度 5000000 px
     * 
     */
    function contentScroll(e: any){
        let top: number = e.srcElement.scrollTop;
        let start = Math.round(top / lineHeight);
        let end = start + 16;
        ergodicData.data = data.data.slice(start, end)
        scrollTop.value = top;
    }

    /**
     * 二分查找法
     * 
     * @param arr 目标数组
     * @param target 需要查询的目标值
     * @return 查询目标的下标
     */

    function binarySearch(arr: Array<number>, target: number): number {
        let start: number = 0; // 当前查询的起始位
        let end: number = arr.length - 1; // 当前查询的结束位
        while (start <= end) {
            let half: number = Math.floor((start + end) / 2); // 查询的中间位次
            if (arr[half] == target) {
                return half
            } else if (arr[half] > target) {
                end = half - 1;
            } else {
                start = half + 1;
            }
        }
        return -1
    }

</script>


<style scoped>
    .wrapper {
        width: 600px;
        height: 800px;
        position: absolute;
        left: 500px;
        bottom: 0;
        top: 60px;
        overflow-y: scroll;
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }
    .list {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .line {
        width: 500px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: aqua;
    }
</style>