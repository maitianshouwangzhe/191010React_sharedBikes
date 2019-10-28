import React, {Component} from 'react'
import {Card, Form, Icon, Input, Button, Checkbox} from "antd"

import '../form-admin.less'

// 是否有错误
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

class LoginAdmin extends Component{


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields()
    }


    handleSubmit1 = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    // 第二个card的提交
    // 自动提交表单
    handleSubmit2 = e => {
        // 如果使用默认提交，则需要阻止该事件的默认行为
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username')
        const passwordError = isFieldTouched('password') && getFieldError('password')
        // 对form表单布局进行设置
        // 响应式布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 15 },
                sm: { span: 16 },
            },
        }

        return (
            <div>
                <Card title='内联(行内)登录表单' className='card-wrap'>
                    <Form layout="inline" onSubmit={this.handleSubmit1}>
                        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>


                <Card title='普通（水平）的登录框' className='card-wrap'>
                    <Form onSubmit={this.handleSubmit2} className="login-form" {...formItemLayout}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名必须输入！' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码必须输入！' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            Or <a href="">立即注册</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({ name: 'horizontal_login' })(LoginAdmin)
