/*
axios可用于发送GET 和 POST 请求， 但是不能解决跨域问题

jsonp可解决跨域问题， 但只能用于GET请求
*/

import jsonP from 'jsonp'
import {message} from "antd"

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
                    // 不能reject出error，否则极大的错误
                    // reject(response.message);
                    message.error('请求天气失败')
                }
            })
        })
    }
}