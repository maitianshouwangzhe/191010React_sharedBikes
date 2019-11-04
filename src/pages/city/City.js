import React, {Component} from 'react'
import {Button, Card, Modal, Table} from "antd"

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
        isDisabled: true,
    }

    // 配置参数
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
                render: (op_mode)=>  op_mode === 1 ? '自营' : '加盟'
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
        axios.ajax({
            url:'/city',
            data:{
                params: {page: this.params.page}
            },
        }).then( (result) => {
            this.setState({
                list: result.data.data_list,
            })
        })
    }


    // 开通城市提交
    openCitySubmit = () => {
        // 发送请求
        this.setState({openCityModal: false})
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
                        <OpenCityForm />
                    </Modal>
                </div>
            </div>
        )
    }
}
