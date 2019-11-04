/*
*
*
* 注意到： 生成初始列的不同，
*
* 1、在senior-table.js文件中，初始列在componentWillMount中生成，
* 2、而在该文件中，初始列在render中生成，
*
*
* 两者生成的不同，使得排序的语法有所不同（前者componentWillMount更贴近官方的代码，更精简）。
*
*
*
* */



import React, {Component} from 'react'
import {Card, Table} from "antd"
import axios from '../../../axios/index'
import {paginationUtil} from "../../../utils/paginationUtil"
export default class SeniorTable2 extends Component{

    state = {
        // 初始数据为空数组
        dataSource2: []
    }

    // 定义静态数据，该数据的变化不会使页面渲染变化
    params = {
        page:1
    }

    componentDidMount(){
        // 请求服务端数据（动态数据）
        this.request()
    }

    request = () => {
        // this的作用域问题
        axios.ajax({
            url: '/table/basic',
            data: {
                // params: {page: 1 } ,     /*    原始的写法   */
                params: {page: this.params.page } ,
                isShowLoading: false,      /*  不显示loading   */
            }
        }).then( res => {
            if (res.code === 0){
                this.setState({
                    dataSource2: res.data.user,
                    pagination: paginationUtil(res, (current) => {
                        this.params.page = current
                        this.request()
                    })
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
        // 与第一个文件相比， 增加了这行代码
        this.setState({
            sortOrder:sorter.order
        })
    }




    render() {
        const { dataSource2} = this.state
        const columns3 = [
            {
                title:'id',
                key:'id',
                width: 178,
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 120,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                width: 80,
                dataIndex: 'sex',
                render: sex => sex*1 === 1 ? '男' : '女'
            },
            {
                title: '年龄',
                key: 'age',
                width: 80,
                sorter: (a, b) => a.age - b.age,             /*  sorter指定这一列需要排序, 定义排序函数      */
                sortOrder:this.state.sortOrder,         /*  与第一个文件相比， 增加了这行代码      */
                dataIndex: 'age',
            },
            {
                title: '状态',
                key: 'currentState',
                width: 100,
                dataIndex: 'currentState',
                render(currentState){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[currentState];
                }
            },
            {
                title: '爱好',
                key: 'like',
                width: 80,
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
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                width: 256,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'getUpTime',
                width: 100,
                dataIndex: 'getUpTime'
            }
        ]
        return (
            <div>
                <Card title='排序' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={columns3}
                        onChange={this.handleChange}
                    />
                </Card>
            </div>
        )
    }
}
