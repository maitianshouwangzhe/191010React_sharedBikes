/*
axios可用于发送GET 和 POST 请求， 但是不能解决跨域问题

jsonp可解决跨域问题， 但只能用于GET请求
*/

import jsonP from 'jsonp'
import {message, Modal} from "antd"
import axios from 'axios'



// 定义一个Axios类


export default class Axios {
    // 类似于以前使用axios封装的ajax函数
    // 定义一个options大对象， 控制传入的参数
    static jsonp(options){
        return new Promise((resolve, reject) => {
            jsonP(options.url, {},(error,response)=>{
                if (!error && response.status === 'success') {
                    // jsonp函数有自己用法， resolve(response)就得到请求的数据
                    resolve(response)
                }else {
                    // 不能reject出error
                    // reject(response.message);
                    message.error('请求天气失败')
                }
            })
        })
    }


    // 基于axios封装的ajax函数
    static ajax(options){
        const baseUrl = 'https://www.easy-mock.com/mock/5db92c42f94af26320296a42/mockapi'
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseUrl,
                // timeout: 5000,           /*  超时  */
                params: (options.data && options.data.params) || ''      /*    配置参数  */
            }).then( response => {
                // 响应
                if (response.status === 200){
                    const result = response.data
                    if (result.code === 0){
                        // 转为字符串格式
                        resolve(result)
                    } else {
                        Modal.info({
                            title:'提示',
                            content: result.msg
                        })
                    }
                } else {
                    message.error('请求出错！')
                }
            })
        })
    }
}
