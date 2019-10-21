import React, {Component} from 'react'
import {Card, Button, message} from "antd";

import '../ui-admin.less'
export default class MessageAdmin extends Component{

    showMessage=(type)=>{
        message[type](`This is ${type} message`)
    }


    success = () => {
        message.loading('加载中..', 2.5)
            .then(() => message.success('加载完成', 2))
            .then( () => message.info('已完成加载', 1))
    }


    render() {
        return (
            <div>
                <Card
                    title='全局message（1）'
                    className='card-wrap'
                >
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>

                <Card
                    title='全局message（2）'
                    className='card-wrap'
                >
                    <Button onClick={this.success}>点击加载</Button>
                </Card>
            </div>
        )
    }
}
