import React, {Component} from 'react'
import {Card, Table} from "antd";
import axios from '../../../axios/index'
export default class BasicTable extends Component{

    state = {
        // 初始数据为空数组
        dataSource: [],
        dataSource2: [],
    }


    // 生成初始列
    componentWillMount() {
        this.columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: sex => sex ==='1' ? '男' : '女'
            },
            {
                title: '状态',
                key: 'currentState',
                dataIndex: 'currentState',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'like',
                dataIndex: 'like',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'getUpTime',
                dataIndex: 'getUpTime'
            }
        ]
    }

    componentDidMount(){
        // 请求数据(静态数据)
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                currentState:'1',
                like:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园1',
                getUpTime:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '2',
                currentState: '2',
                like: '2',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园2',
                getUpTime: '09:30'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                currentState: '3',
                like: '3',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园3',
                getUpTime: '10:00'
            },
        ]
        this.setState({
            dataSource: data
        })

        // 请求服务端数据（动态数据）
        this.request()
    }

    request = () => {
        axios.ajax({
            url: '/table/basic',
        }).then( res => {
            if (res.code === 0){
                this.setState({
                    dataSource2: res.result.data
                })
            }
        })
    }


    render() {
        const {dataSource, dataSource2} = this.state
        return (
            <div>
                <Card title='基础表格' className='card-wrap'>
                    <Table
                        rowKey='id'
                        dataSource={dataSource}
                        columns={this.columns}
                        pagination={false}
                    />
                </Card>

                <Card title='动态数据表格（Easy Mock数据）' className='card-wrap'>
                    <Table
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                    />
                </Card>
            </div>
        )
    }
}
