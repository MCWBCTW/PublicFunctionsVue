<template>
    <div class="main flex">
        <div class="menu">
            <div class="menu-item flex flex-a-c flex-j-c" v-for="item in menuArray" :key="item.id" @click="handleChoiceTabs(item)">
                <span class="menu-item-label" :class="[item.id == activeChildrenId ? 'active' : 'static']">{{ item.label }}</span>
            </div>
        </div>
        <div class="content flex flex-d-c flex-a-c flex-j-c">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { useRouter } from "vue-router"
    const router = useRouter()
 
    interface Imenu {
        path: string
        id: number
        active: boolean
        label: string
    }
    const menuArray: Array<Imenu> = reactive([
        {
            path: '/',
            id: 1,
            active: true,
            label: '大文件上传'
        },
        {
            path: '/vidoeWebRTC',
            id: 2,
            active: false,
            label: 'webRTC视频通话'
        },
        {
            path: '/virtualScrolling',
            id: 3,
            active: false,
            label: '虚拟滚动（一）'
        },
        {
            path: '/virtualScrollingSecond',
            id: 4,
            active: false,
            label: '虚拟滚动（二）'
        },
        {
            path: '/popup',
            id: 5,
            active: false,
            label: '全局弹窗'
        }
    ])

    // 当前激活的子类id
    let activeChildrenId: Ref<number> = ref(1)
    
    // 点击菜单项回调
    function handleChoiceTabs(item: Imenu){
        activeChildrenId.value = item.id;
        router.push({ path: item.path})
    }


</script>
  
<style scoped>
    .main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    .menu {
        width: 10%;
        min-width: 200px;
        height: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        background-color: #2f3e62;
    }
    .menu::-webkit-scrollbar { 
        width: 0 !important 
    }
    .menu-item {
        width: 100%;
        height: 50px;
        cursor: pointer;
    }
    .menu-item:hover {
        background-color: rgb(38, 50, 78);
    }
    .menu-item-label {
        font-size: 18px;
    }
    .active {
        color: rgb(255, 208, 75);
    }
    .static {
        color: #ffffff;
    }
    .content {
        width: 90%;
        height: 100vh;
    }
</style>