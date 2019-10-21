import React, {Component} from 'react'

import { Modal, Button, Card } from 'antd'

import '../ui-admin.less'
/*
总结：
对于基本的对话框，需要点击按钮，更改状态显示对话框，点击关闭或者确定，更改状态使得隐藏对话框；

而对于简单的对话框，直接点击即可显示对话框。

 */
export default class ModalAdmin extends Component{
    state = {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        // 是否显示加载的状态
        loading: false
    }

    // 用一个方法控制多个modal框的打开
    showModal = (type) => {
        this.setState({
            // 用中括号将type包起来， 则type就是变量，根据传入的参数而定
            [type]: true,
        })
    }

    // 用一个方法去管理modal框的ok
    handleOk = (type) => {
        this.setState({
            [type]: false,
        })
    }

    // 用一个方法去管理modal框的cancel
    handleCancel = (type) => {
        this.setState({
            [type]: false,
        })
    }

    handleModals=(type)=>{
        // 一般是Modal.info, 由于写成了变量的形式，且由于Modal里面包含了对象，则Modal[type]即可读出对应的值
        Modal[type]({
            title: `This is a ${type}`,
            content: '你确定精通React了么？',
            onOk:()=>{
                console.log(`${type}`)
            },
        });
}




    render() {
        const {modal1, modal2, modal3, modal4, loading} = this.state
        return (
            <div>
                <Card
                    title="基本的Modal对话框（不能自动关闭，一般均需要对 ok和  cancel进行操作处理）"
                    className='card-wrap'
                >
                    <Button type="primary" onClick={()=>this.showModal('modal1')}>open</Button>
                    <Button type="primary" onClick={()=>this.showModal('modal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.showModal('modal3')}>（弹出的对话框）距顶部20px</Button>
                    <Button type="primary" onClick={()=>this.showModal('modal4')}>（弹出的对话框）水平垂直居中</Button>

                    <Modal
                        title="React-001"
                        visible={modal1}
                        onOk={()=>this.handleOk('modal1')}
                        onCancel={()=>this.handleCancel('modal1')}
                        okText="确认"
                        cancelText="取消"
                        okType= 'danger'
                    >
                        <p>React-001后台管理开发</p>
                    </Modal>

                    <Modal
                        title="React-002"
                        visible={modal2}
                        onOk={()=>this.handleOk('modal2')}
                        onCancel={()=>this.handleCancel('modal2')}
                        footer={[
                            <Button key="back" onClick={()=>this.handleCancel('modal2')}>返回</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={()=>this.setState({
                                loading: true,
                                modal2: false,
                            })}>提交</Button>,
                        ]}
                    >
                        <p>react-redux</p>
                    </Modal>

                    <Modal
                        title="React-3"
                        style={{top: 20}}
                        visible={modal3}
                        onOk={()=>this.handleOk('modal3')}
                        onCancel={()=>this.handleCancel('modal3')}
                    >
                        <p>React-route-dom</p>
                    </Modal>

                    <Modal
                        title="React-4"
                        wrapClassName='vertical-center-modal'
                        visible={modal4}
                        onOk={()=>this.handleOk('modal4')}
                        onCancel={()=>this.handleCancel('modal4')}
                    >
                        <p>react-ant-design</p>
                    </Modal>
                </Card>

                <Card
                    title="信息确认(简单的)对话框（cancel一般可自动关闭， 仅仅对ok进行操作）"
                    className='card-wrap'
                >
                    <Button type='primary' onClick={() => this.handleModals('confirm')}>Confirm</Button>
                    <Button type='primary' onClick={() => this.handleModals('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.handleModals('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.handleModals('error')}>Error</Button>
                    <Button type='primary' onClick={() => this.handleModals('warning')}>Warning</Button>
                </Card>
            </div>
        )
    }
}
