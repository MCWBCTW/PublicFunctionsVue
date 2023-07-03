
/**
 * 定义一些全局使用的公共参数
 */
let HTTP = '';
if (process.env.NODE_ENV === 'development') {
    // 开发环境下的逻辑
    console.log('当前是开发环境');
    HTTP = 'http://127.0.0.1:3050'
} else if (process.env.NODE_ENV === 'production') {
    // 正式环境下的逻辑
    console.log('当前是正式环境');
    HTTP = 'http://functions.mcwbctw.cn:3050'
}

// http请求域名配置
export const REQUEST_HTTP = HTTP;

// webSocket 连接域名配置
export const WEBSOCKET_DOMAIN = 'ws://127.0.0.1:3060';