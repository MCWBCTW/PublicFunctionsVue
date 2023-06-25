<template>
    <div class="flex">
        
        <button @click="sendMsg">发送信息</button>

        <button @click="getDevice">获取设备信息</button>

        <button @click="addDevice">添加设备信息</button>

        
    </div>
</template>


<script setup lang="ts">
    import { WEBSOCKET_DOMAIN } from '../../utils/public'

    import { CreateRequest } from '../../utils/request'


    const ws = new WebSocket(WEBSOCKET_DOMAIN);
    ws.onopen = () => {
        console.log('WebSocket连接成功');
        // ws.send('test');
    };
    ws.onerror = (err) => {
        console.log('WebSocket连接失败:', err);
    };
    ws.onclose = (close: any) => {
        console.log('WebSocket连接关闭:', close);
    };
    ws.onmessage = (event) => {
        console.log('WebSocket收到信息: ', event);
    };



    function sendMsg(){
        ws.send('发送测试消息');
    }

    function getDevice(){
        CreateRequest('GET', '/get/getDeviceInfo').then(res => {
            console.log(res)
        })
    }

    function addDevice(){
        CreateRequest('POST', '/post/addDevice', {
            deviceId: '1234',
            deviceName: '测试设备2',
            online: 0,
            created_at: '2023-6-25 10:00:00',
        }).then(res =>{
            console.log(res)

        })
    }
</script>


<style scoped>
    
</style>