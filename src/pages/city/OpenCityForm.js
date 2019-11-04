import React from "react"
import {Form, Select} from "antd"

const FormItem = Form.Item
const Option = Select.Option


class OpenCityForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator }  =this.props.form
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 126 }}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(OpenCityForm)
