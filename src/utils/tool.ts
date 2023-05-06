

import { REQUEST_HTTP } from './public'
// 声明
const xml = new XMLHttpRequest();


/**
 * 
 * @param method 请求方法，GET POST
 * @param url 
 * @param data 
 * @returns 
 */
export function CreateRequest(method: string, url: string, data?: object){
    return new Promise((resolve, reject) => {
        url = REQUEST_HTTP + url; // 拼接地址
        if (method == 'GET') {
            if(data){
                // 拼接参数
                Object.keys(data).forEach((item, index) => {
                    url += `${index == 0 ? '?' : '&'}${item}=${data[item as keyof typeof data]}`;
                })
            }
            xml.open(method, url);
            xml.send();
        } else if (method == 'POST') {
            let param = ''; // 请求参数
            if(data){
                Object.keys(data).forEach((item, index) => {
                    param += `${index == 0 ? '' : '&'}${item}=${data[item as keyof typeof data]}`;
                })
            }
            xml.open(method, url);
            xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xml.send(param);
        }
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && xml.status === 200) {
                //数据获取成功，获取服务器响应的数据 
                console.log(xml.responseText);
                resolve(xml.responseText);
            } else {
                reject(xml.responseText);
            }
        }
    })
    
}