import React, {Component} from 'react'
import {Card, Spin, Icon, Switch, Alert} from "antd";
import '../ui-admin.less'
export default class LoadingAdmin extends Component{
    state = {
        loading: false
    }

    toggle = value => {
        this.setState({ loading: value })
    }

    render() {
        const icon = (<Icon type='loading' style={{fontSize: 20}} />)
        return (
            <div>
                <Card
                    title='Spin的用法'
                    className='card-wrap'
                >
                    <Spin size="small" />
                    <Spin style={{margin: '0  20px'}}/>
                    <Spin size="large" />
                    <Spin indicator={icon} style={{marginLeft: 20}}/>  {/*  使用indicator自定义加载图标的样式  */}

                </Card>
                <Card
                    title='内容遮罩1'
                    className='card-wrap'
                >
                    <Spin spinning={this.state.loading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                    <div style={{ marginTop: 16 }}>
                        加载状态(开关按钮)：
                        <Switch checked={this.state.loading} onChange={this.toggle} />
                    </div>
                </Card>
                <Card
                    title='内容遮罩2'
                    className='card-wrap'
                >
                    <Spin spinning={true} tip='加载中....' indicator={icon}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
