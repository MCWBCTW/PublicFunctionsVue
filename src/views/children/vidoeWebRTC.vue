<template>
    <div class="flex">
        <div class="formline">
            <span>选择呼叫对象：</span>
            <dropdown :option="deviceOption.data" :clear="false"></dropdown>
            <span class="marL-20">本地设备名称：{{ localDeviceInfo.name }}</span>
            <c-button :size="'small'" :type="'primary'" class="marL-20">刷新</c-button>
        </div>

        <div class="content">
            <div class="video-content">
                <div class="video-local"></div>
                <div class="video-remote"></div>
            </div>
        </div>
        <!-- <button @click="sendMsg">发送信息</button>
        
        <button @click="getDevice">获取设备信息</button>

         -->
        
         <c-button :size="'small'" :type="''" class="marL-20" @click="editDevice">编辑设备在线信息</c-button>
    </div>

</template>


<script setup lang="ts">
    import { WEBSOCKET_DOMAIN } from '../../utils/public'

    import { CreateRequest } from '../../utils/request'


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

    interface IdeviceInfo {
        deviceId: string;
        name: string;
        id: number
    }
    // 本地设备信息
    let localDeviceInfo: Ref<IdeviceInfo> = ref({
        deviceId: '',
        name: '',
        id: 0,
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
            if (res.data.length > 0) {
                let info = res.data[0];
                localDeviceInfo.value.deviceId = info.deviceId;
                localDeviceInfo.value.name = info.deviceName;
                localDeviceInfo.value.id = info.id;
            }
        })
    }
    getDevice();

    


    onMounted(() => {
        // window.addEventListener('beforeunload', pageBeforeUnload)
    })

    function editDevice(){
        CreateRequest('POST', '/post/editOnline', {
            id: 1
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
        align-items: start;
    }
    .formline {
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    .marL-20 {
        margin-left: 20px;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }
    .video-content {
        width: 1200px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .video-local {
        width: 500px;
        height: 300px;
        background-color: red;
    }
    .video-remote {
        width: 500px;
        height: 300px;
        background-color: blue;
    }
</style>