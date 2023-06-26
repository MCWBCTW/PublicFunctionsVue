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


    // weuSocket 相关逻辑

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



    // 获取设备相关逻辑，在获取完成当前已经在线的设备信息后，再获取一个未在线的设备信息，作为当前登录者的设备信息

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
            setLocalDevice();
        })
    }

    // 设置本地设备信息
    function setLocalDevice(){
        CreateRequest('GET', '/get/setLocalDevice').then((res: any) => {
            console.log('获取本地设备信息', res);
        })
    }
    getDevice();

    


    onMounted(() => {
        window.addEventListener('beforeunload', pageBeforeUnload)
    })

    function editDevice(){
        CreateRequest('POST', '/post/editOnline', {
            deviceId: '123'
        }).then(res => {
            console.log(res)
        })
    }

    // 项目标签关闭前执行
    function pageBeforeUnload(){
        editDevice();
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