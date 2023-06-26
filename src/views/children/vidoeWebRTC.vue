<template>
    <div class="flex">
        <div class="formline">
            <span>选择呼叫对象：</span>
            <dropdown :size="'mini'" :option="deviceOption.data" :clear="false"></dropdown>
        </div>

        <div class="content">

        </div>

        <!-- <button @click="sendMsg">发送信息</button>

        <button @click="getDevice">获取设备信息</button>

        <button @click="editDevice">编辑设备在线信息</button> -->
        
    </div>
</template>


<script setup lang="ts">
    import { WEBSOCKET_DOMAIN } from '../../utils/public'

    import { CreateRequest } from '../../utils/request'

    import { formatDate } from '../../utils/tool'


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

    interface IoptionBase {
        id: string;
        label: string;
        desc?: string;
    }
    interface Ioption {
        data: Array<IoptionBase>
    }

    let deviceOption: Ioption = reactive({
        data: []
    })


    function sendMsg(){
        ws.send('发送测试消息');
    }

    // 获取在线的设备
    function getDevice(){
        CreateRequest('GET', '/get/getDeviceInfo').then((res: any) => {
            let data: Array<IoptionBase> = [];
            res.data.forEach((item: any) => {
                let temp: IoptionBase = {
                    id: item.deviceId,
                    label: item.deviceName
                }
                data.push(temp);
            });
            deviceOption.data = data;
            console.log(deviceOption)
        })
    }
    getDevice();

    function editDevice(){
        CreateRequest('POST', '/post/editOnline', {
            deviceId: '123'
        }).then(res => {
            console.log(res)
        })
    }

</script>


<style scoped>
    .flex {
        width: 90%;
        height: 95vh;
        display: flex;
        flex-direction: column;
    }
    .formline {
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
</style>