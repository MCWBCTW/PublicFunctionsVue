import axios from 'axios';
import { REQUEST_HTTP } from './public'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


/**
 * 
 * @param method 方法类型，GET，POST
 * @param url 请求地址
 * @param data 参数
 * @param headers 请求头
 * @returns 请求回调
 */
export function CreateRequest(method: string, url: string, data?: object, headers?: object){
    return new Promise((resolve, reject) => {
        axios({
            baseURL: REQUEST_HTTP,
            method,
            url,
            data,
            timeout: 1000,
            headers,
        }).then(res => {
            if(res.data.code == 200){
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }).catch(err => {
            reject(err);
        })
    })
}