import React, {Component} from 'react'
import {Card, Button, notification, Icon, Select} from "antd";

import '../ui-admin.less'

const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

export default class NotificationAdmin extends Component{

    openNotificationWithIcon = (type, direction) => {
        // 如果传入了第二参数
        if (direction){
            // 这个配置是全局的， 一旦改变，则弹出的位置全部发生变化
            notification.config({placement: direction})
        }
        const type01 = type
        notification[type]({
            message: `${type}`,
            description:
                `This is the content of ${type}.`,
            // 自定义图标
            icon: <Icon type={type01} style={{ color: '#108ee9' }} />,
            // 自动关闭的延时
            duration: 3,
            // 自定义样式
            style: { width: 560},
        })
    }


    close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        )
    }

    openNotification = () => {
        const key = `open${Date.now()}`
        // 关闭的时候，指定唯一的key
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm(知道了!!!)
            </Button>
        )
        notification.open({
            message: 'Notification Title',
            description:
                'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            key,
            onClose: this.close,
            // onClose: () => {
            //     console.log('Notification was closed')
            // }
        })
    }



    openNotification2 = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }




    render() {
        return (
            <div>
                <Card
                    title='notification通知提醒（1）'
                    className='card-wrap'
                >
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
                </Card>
                <Card
                    title='notification通知提醒（2）'
                    className='card-wrap'
                >
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('success', 'topLeft')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('info', 'topRight')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('warning', 'bottomLeft')}>Warning</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('error', 'bottomRight')}>Error</Button>
                </Card>
                <Card
                    title='notification通知提醒（3）'
                    className='card-wrap'
                >
                    <Button type="primary" onClick={this.openNotification}>自定义关闭按钮的样式和文字</Button>,
                </Card>

                <Card
                    title='notification通知提醒（4）'
                    className='card-wrap'
                >
                    <Select
                        defaultValue="topRight"
                        style={{ width: 120, marginRight: 15 }}
                        onChange={ value => {
                            notification.config({
                                placement: value,
                            })
                        }}
                    >
                        {
                            options.map(val => (
                                <Option key={val} value={val}>
                                    {val}
                                </Option>
                                )
                            )
                        }
                    </Select>
                    <Button type="primary" onClick={this.openNotification2}>
                        在指定位置打开notification box
                    </Button>
                </Card>
            </div>
        )
    }
}
