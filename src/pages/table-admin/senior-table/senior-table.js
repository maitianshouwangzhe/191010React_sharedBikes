import React, {Component} from 'react'
import {Badge, Card, Table, Popconfirm, message} from "antd"
import axios from '../../../axios/index'
import {paginationUtil} from "../../../utils/paginationUtil"
import LinkButton from "../../../components/link-button/link-button";
export default class SeniorTable extends Component{

    state = {
        // 初始数据为空数组
        dataSource2: []
    }

    // 定义静态数据，该数据的变化不会使页面渲染变化
    params = {
        page:1
    }


    // 在组件挂载到DOM前调用，且只会被执行调用一次，
    // 在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项目中很少用

    // 生成初始列
    componentWillMount() {
        this.columns = [
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
        this.columns2 = [
            {
                title:'id',
                key:'id',
                width: 178,
                fixed: 'left',    /*  固定该列，在左边    */
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 120,
                fixed: 'left',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                width: 80,
                fixed: 'left',
                dataIndex: 'sex',
                render: sex => sex*1 === 1 ? '男' : '女'
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
                title: '生日',
                key: 'birthday1',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday2',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday3',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday4',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday5',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday6',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday7',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday8',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday9',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday10',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday11',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday12',
                width: 90,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                width: 256,
                fixed: 'right',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'getUpTime',
                width: 100,
                fixed: 'right',
                dataIndex: 'getUpTime'
            }
        ]
        this.columns3 = [
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
        this.columns4 = [
            {
                title:'id',
                key:'id',
                width: 178,
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 100,
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
                width: 100,
                dataIndex: 'like',
                render(abc) {
                    let config = {
                        '1': <Badge status='success' text='游泳'/>,    /*   徽标数组件     */
                        '2': <Badge status='error' text='打篮球'/>,
                        '3': <Badge status='default' text='踢足球'/>,
                        '4': <Badge status='processing' text='跑步'/>,
                        '5': <Badge status="warning" text="爬山" />,
                        '6': <Badge color="#87d068" text="'骑行'" />,
                        '7': <Badge color="#108ee9" text='桌球' />,
                        '8': <Badge color="#f50" text="麦霸" />
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                width: 120,
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
            },
            {
                title: '操作',
                key: 'action',
                width: 80,
                render: (user)=>  (
                    <Popconfirm
                        title='你确定删除吗？'
                        onConfirm={  () =>  this.confirm(user)  }
                        onCancel={ this.cancel }
                        okText="是"
                        cancelText="否"
                    >
                        <LinkButton>删除</LinkButton>
                    </Popconfirm>
                )

            }
        ]
    }

    confirm=(e)=> {
        console.log(e);
        message.success('删除成功')
    }

    cancel=(e)=> {
        console.log(e);
        message.error('取消删除')
    }

    // 删除
    handleDelete =(user) => {
        console.log(user)
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
    }




    render() {
        const { dataSource2} = this.state
        return (
            <div>

                <Card title='固定表头' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                        pagination={false}
                        scroll={{ y: 240 }}           /*  加上这个标识，就要固定列的宽度，否则会回到，前后内对不齐    */
                    />
                </Card>

                <Card title='固定表头和某些列' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns2}
                        pagination={{ pageSize: 50 }}
                        scroll={{ x: 2050, y: 500 }}     /*   x 的长度要比列数的总和大一点， 但不大太多，太多则滚动时会出现缝隙  */
                    />
                </Card>

                <Card title='排序' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns3}
                        onChange={this.handleChange}
                    />
                </Card>

                <Card title='徽标数and操作' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns4}
                    />
                </Card>
            </div>
        )
    }
}
