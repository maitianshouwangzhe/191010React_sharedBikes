import React, {Component} from 'react'
import {Button, Card, message, Modal, Table} from "antd"

import axios from '../../axios'
import {formatDate} from "../../utils/dateUtil"
import FilterForm from "./FilterForm"
import {paginationUtil} from "../../utils/paginationUtil"
import OpenCityForm from "./OpenCityForm"


// 前面组件知识的总结
export default class City extends Component{

    state={
        list:[],
        openCityModal: false,
        // 首先定义pagination为一个空对象，然后使用自定义的paginationUtil
        pagination: {},
    }

    // 配置参数
    // 不放在state里面，这是由于state一旦发生变化，则render渲染页面，
    params = {
        page: 1
    }

    componentWillMount() {
        this.columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render: (mode) => mode ===1 ?'停车点':'禁停区'
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render: (op_mode)=> op_mode  === 1 ? '自营' : '加盟'
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render:  ( arr ) => arr.map( item => item.user_name).join('、')        /*  render不能渲染一个对象或者一个数组，必须拆分, 并且用符号、连接  */
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
                render: (open_time) => ('时间戳：' + open_time)
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (update_time) => formatDate(update_time * 1),
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
    }

    componentDidMount() {
        this.reqList()
    }

    // 请求接口
    reqList = () => {
        // this 作用域
        axios.ajax({
            url:'/city',
            data:{  params: {page: this.params.page} } ,
        }).then( result => {
            if (result.code === 0){
                this.setState({
                    list: result.data.list,
                    pagination: paginationUtil(result, (current) => {
                        // 将当前页保存给page
                        this.params.page = current
                        this.reqList()
                    })
                })
            }})
    }


    // 开通城市请求
    openCitySubmit = () => {
        // 使用this.OpenCityForm.props.form就得到了form对象
        // 得到子组件的form对象，就可以获得子组件中form表单的输入值
        this.OpenCityForm.props.form.validateFields((error, values)=>{
            if (!error){
                console.log('values', values)
                axios.ajax({
                    url: '/city/open',
                    data:{  params: values}
                }).then(result => {
                    if (result.code === 0){
                        message.success(result.msg)
                        this.setState({openCityModal: false})
                        // 重新查询数据
                        this.reqList()
                    }
                })
            }
        })

    }


    render() {
        const {list, pagination, openCityModal} = this.state
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <div>
                    <Button type="primary" style={{margin: '15px 0 15px 20px'}} onClick={ () => this.setState({openCityModal: true})} >开通城市</Button>
                    <Table
                        bordered
                        rowKey='id'
                        columns={this.columns}
                        dataSource={list}
                        pagination={pagination}
                    />
                    <Modal
                        title="开通城市"
                        visible={openCityModal}
                        onCancel={ () => this.setState({openCityModal:false}) }
                        onOk={this.openCitySubmit}
                    >
                        <OpenCityForm  wrappedComponentRef={ (inst) => this.OpenCityForm = inst}  />      {/*      在wrappedComponentRef的基础上， 使用this.OpenCityForm.props.form就得到了form对象    */}
                    </Modal>
                </div>
            </div>
        )
    }
}
