import React, {Component} from 'react'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete, Card,Radio, InputNumber, Switch, DatePicker, TimePicker, Upload
} from 'antd'
import LinkButton from "../../../components/link-button/link-button";
import moment from "moment";


const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const { TextArea } = Input

const address = [
    {
        value: '浙江',
        label: '浙江',
        children: [
            {
                value: '杭州',
                label: '杭州',
                children: [
                    {
                        value: '西湖',
                        label: '西湖',
                    },
                ],
            },
        ],
    },
    {
        value: '江苏',
        label: '江苏',
        children: [
            {
                value: '南京',
                label: '南京',
                children: [
                    {
                        value: '中华门',
                        label: '中华门',
                    },
                ],
            },
        ],
    },
]


 class RegisterAdmin  extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        sex:'woman',
    }



    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

     onChange = e => {
         console.log('选中的值', e.target.value);
         this.setState({
             sex: e.target.value,
         })
     }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
        }
        this.setState({ autoCompleteResult })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { autoCompleteResult } = this.state

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },    /* 电脑分辨率小于576px， labelCol占 24 栅格（独占一行）  */
                sm: { span: 4 },     /* 电脑分辨率大于576px， labelCol占  3 栅格  */
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        )

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ))

        return (
            <Card title='注册表单'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ],
                        })(<Input placeholder='请输入用户名'/>)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,     /*  自定义校验规格  */
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            initialValue: this.state.sex,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别！',
                                }
                            ],
                        })(
                            <Radio.Group onChange={this.onChange}>
                                <Radio value='man'>男</Radio>
                                <Radio value='woman'>女</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                            initialValue: 18,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入年龄！',
                                }
                            ],
                        })(
                            <InputNumber min={1} max={150} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                <span style={{marginRight: 5}}>昵称</span>
                                <Tooltip title="你希望别人怎么称呼你？">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('Nickname', {
                            rules: [
                                { required: true, message: '请输入昵称!', whitespace: true }
                                ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="当前状态">
                        {getFieldDecorator('currentState', {
                            initialValue:'learn',
                            rules: [{ required: true, message: '请选择当前状态' }],
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="learn">学习ing</Option>
                                <Option value="busy">忙碌ing</Option>
                                <Option value="rest">休息ing</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="爱好">
                        {getFieldDecorator('like', {
                            initialValue:['basketball', 'football'],
                            rules: [{ required: true, message: '请选择爱好' }],
                        })(
                            <Select mode="multiple">
                                <Option value="basketball">篮球</Option>
                                <Option value="football">足球</Option>
                                <Option value="ping-pang">乒乓球</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="是否已婚">
                        {getFieldDecorator('isMarried', {
                            valuePropName: 'checked' }
                            )(<Switch/>)
                        }
                    </Form.Item>
                    <Form.Item label="出生日期">
                        {
                            getFieldDecorator('birthday', {
                                initialValue: moment('2019-10-06'),               /*   引入moment对象    */
                                rules: [{ required: true, message: '请输入你的出生日期' }],
                            })(<DatePicker
                                showTime                         /*   增加选择时间的功能  */
                                style={{ width: 450 }}
                                format="YYYY/MM/DD HH:mm:ss"     /*   设置日期的显示格式  */
                                placeholder='你的出生日期'
                            />)
                        }
                    </Form.Item>
                    <Form.Item label="联系地址">
                        {getFieldDecorator('address', {
                            initialValue: ['浙江', '杭州', '西湖'],
                            rules: [
                                { type: 'array', required: true, message: '请选择你的联系地址！' },
                            ],
                        })(<Cascader options={address} />)}
                    </Form.Item>
                    <Form.Item label="公司地址">
                        {getFieldDecorator('workAddress',{
                            initialValue: '陕西省西安市',
                        })(
                            <TextArea autoSize={{minRows: 2, maxRows: 6 }} />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="早起时间">
                        {getFieldDecorator('getUpTime',{
                            initialValue: moment('16:06:16', 'HH:mm:ss'),    /*   引入moment对象,  并定义日期格式    */
                        })(
                            <TimePicker style={{ width: 'calc(30% - 12px)' }} />
                        )
                        }
                    </Form.Item>
                    <Form.Item label="手机号">
                        {getFieldDecorator('phone')(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>

                    <Form.Item label="头像" extra="上传你的头像">
                        {getFieldDecorator('userImg', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture-card"
                            >
                                上传图片
                            </Upload>,
                        )}
                    </Form.Item>

                    <Form.Item label="个人博客">
                        {getFieldDecorator('website')(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="网址"
                            >
                                <Input />
                            </AutoComplete>,
                        )}
                    </Form.Item>
                    <Form.Item label="验证码" extra="我们必须确保不是机器人.">
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入验证码' }],
                                })(<Input />)}
                            </Col>
                            <Col span={12}>
                                <Button>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                            initialValue: true,              /*  这两句代码才能保证，默认选中    */
                        })(
                            <Checkbox>
                                我已经阅读<LinkButton>注册协议</LinkButton>
                            </Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}


export default Form.create()(RegisterAdmin)
