import React, {Component} from 'react'
import {Card, Table, Modal, Button, message} from "antd";
import axios from '../../../axios/index'
import {paginationUtil} from "../../../utils/paginationUtil";
export default class BasicTable extends Component{

    state = {
        // 初始数据为空数组
        dataSource: [],
        dataSource2: [],
        selectedRowKeys: [],
        selectedRows:{},
        disabled:true,
        pagination: {},
    }

    // 定义静态数据，该数据的变化不会使页面渲染变化
    params = {
        page:1
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
                render: sex => sex*1 === 1 ? '男' : '女'
            },
            {
                title: '状态',
                key: 'currentState',
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
            }
        ]
        this.setState({
            dataSource: data
        })

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


    // 适用于点击某个radio圆圈时，可以得到key和该行的数据
    onSelectChange = ( selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys变化为： ', selectedRowKeys, selectedRows);
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }


    // 单选
    // 适用于点击某一行时，可以得到key和该行的数据
    onRow1 = (record)=>{
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.like}`
        })
        this.setState({
            selectedRowKeys:record.id,
            selectedRows: record
        })
    }


    handleDelete = () => {
        let users = []
        this.state.selectedRows.map( item => users.push(item.userName) )
        Modal.info({
            title: '删除提示',
            content: `您确定要删除这些数据吗？其中包括：${users.join('，')}`,         /*       数组中， 字符串的拼接    */
            onOk: ()=> {
                message.success('删除成功')
                this.setState({
                    selectedRowKeys:[],
                    selectedRows:{},
                    disabled: true,
                })
            }
        })
    }



    render() {
        const {dataSource, dataSource2, selectedRowKeys, disabled, pagination} = this.state
        const rowSelection1 = {
            type:'radio',                       /*   一旦设置radio， 则右上角为灰色    */
            selectedRowKeys,
            // onChange: this.onSelectChange,     /*  选中某个radio圆圈， 执行的回调函数    */
        }

        //  配置表格是否有 选择 功能
        const rowSelection2 = {
            type: "checkbox",                   /* 一旦设置checkbox， 则右上角出现方框    */
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {       /* onChange的回调函数    */
                console.log('selectedRowKeys变化为： ', selectedRowKeys, selectedRows);
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                    disabled: false,
                })
        }}

        return (
            <div>
                <Card title='基础表格（静态数据）' className='card-wrap'>
                    <Table
                        rowKey='id'
                        dataSource={dataSource}
                        columns={this.columns}
                        pagination={false}
                    />
                </Card>

                <Card title='Easy Mock数据（动态数据）' className='card-wrap'>
                    <Table
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                    />
                </Card>

                <Card title='Mock数据（单选radio操作）' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                        rowSelection={rowSelection1}     /*  配置表格的行是否可进行单选操作  */
                        onRow = { record => {           /*  点击某一行， 使使得该行的radio选中，并且得到该行的全部数据   */
                            return {
                                onClick: () => {
                                    this.onRow1(record)
                                }
                            }
                        }}
                    />
                </Card>

                <Card title='Mock数据（多选checkbox操作）' className='card-wrap'>
                    <Button type='primary' style={{marginBottom: 20}} onClick={this.handleDelete} disabled={disabled}>删除</Button>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                        rowSelection={rowSelection2}   /*  配置表格的行是否可进行 多行选择操作  */
                    />
                </Card>

                <Card title='Mock数据（分页功能 [统一分页样式] ）' className='card-wrap'>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={dataSource2}
                        columns={this.columns}
                        pagination={pagination}
                    />
                </Card>
            </div>
        )
    }
}
