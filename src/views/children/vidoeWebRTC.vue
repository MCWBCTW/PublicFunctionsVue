<template>
    <div class="flex">
        
        <button @click="sendMsg">发送信息</button>
    </div>
</template>


<script setup lang="ts">
    import { WEBSOCKET_DOMAIN } from '../../utils/public'
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
</script>


<style scoped>
    
</style>