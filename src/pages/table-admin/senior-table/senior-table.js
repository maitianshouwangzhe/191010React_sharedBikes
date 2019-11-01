import React, {Component} from 'react'
import {Card, Table} from "antd";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}


export default class SeniorTable extends Component{

    render() {
        return (
            <div>
                <Card title='高级表格---固定表头' className='card-wrap'>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Card>
                <Card title='高级表格---固定左侧' className='card-wrap'>

                </Card>
            </div>
        )
    }
}
