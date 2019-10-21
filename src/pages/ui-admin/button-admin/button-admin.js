import React, {Component} from 'react'
import { Card, Button, Icon, Radio } from 'antd';

import '../ui-admin.less'
export default class ButtonAdmin extends Component{
    state = {
        // 是否显示加载
        loading: true,
        handleLoading: true,
        size: 'large',
    }

    closeLoading=()=>{
        this.setState({
            loading: false,
            handleLoading: false,
        })
    }

    startLoading=()=>{
        this.setState({
            loading: true,
            handleLoading: true,
        })
    }

    // 带有选择项，即多选， 多选
    onChange=(e)=>{
        // 单选一般要取出当前的选中value
        const value = e.target.value
        this.setState({size: value})
    }

    render() {
        const {loading, handleLoading, size} = this.state
        return (
            <div>
                <Card title="基础按钮" className='card-wrap'>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="primary" disabled>disabled</Button>
                </Card>

                <Card title="图像按钮" className='card-wrap'>
                    <Button icon="plus" >创建</Button>
                    <Button icon="edit" >编辑</Button>
                    <Button icon="delete" >删除</Button>
                    <Button shape="circle" icon="search" ></Button>
                    <Button type="primary" icon="search" >搜索</Button>
                    <Button type="primary" icon="download" >下载</Button>
                </Card>

                <Card title="Loading按钮" className='card-wrap'>
                    <Button type="primary" loading={loading}>确定</Button>
                    <Button type="primary" shape='circle' loading={loading}/>
                    <Button size="small" loading={loading}>点击加载</Button>
                    <Button shape='circle' loading={loading} />
                    {
                        handleLoading===true ? <Button type="primary" onClick={this.closeLoading}>关闭加载</Button> : <Button type="primary" onClick={this.startLoading}>开始加载</Button>
                    }
                </Card>

                {/* 中间不设置间隔 */}
                <Card title="按钮组" style={{marginBottom: 20}}>
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            后退
                        </Button>
                        <Button type="primary">
                            前进
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className='card-wrap'>
                    <Radio.Group onChange={this.onChange} value={size}>
                        <Radio value="large">大</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="small">小</Radio>
                    </Radio.Group>
                        <Button type="primary" size={size}>Primary</Button>
                        <Button size={size}>Default</Button>
                        <Button type="dashed" size={size}>Dashed</Button>
                        <Button type="danger" size={size}>Danger</Button>
                </Card>
            </div>
        )
    }
}
