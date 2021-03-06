import React, {Component} from 'react'
import {Card, Tabs, Icon, Button, message} from "antd"

const { TabPane } = Tabs
export default class TabAdmin extends Component{

    constructor(props) {
        super(props)
        this.newTabIndex = 0
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                //  是否可以关闭， false则不能关闭
                // closable: false,
            }
        ]

        this.state = {
            // 当前 tab 面板的 key
            activeKey: panes[0].key,
            panes,
        }
    }

    // 点击切换activeKey
    onChange = activeKey  => {
        // 字符串拼接
        message.info('激活的activeKey为'+ activeKey)
        this.setState({ activeKey })
    }

    // 官方api的指定用法： (targetKey, action): void
    onEdit = (targetKey, action) => {
        // action就是add 或 remove,一次只能一个方法。
        this[action](targetKey)
    }


    add = () => {
        // 取出当前的panes
        const { panes } = this.state
        const activeKey = `newTab${this.newTabIndex++}`
        // 添加一个面板
        panes.push({
            title: `newTab${this.newTabIndex}`,
            content: `Content of newTab${this.newTabIndex}`,
            key: activeKey
        })
        this.setState({
            panes,
            activeKey
        })
    }

    // 删除用filter()函数
    // targetKey为想要删除的
    // activeKey为目前激活打开的
    remove = (targetKey) => {
        let { activeKey } = this.state
        let lastIndex
        // 循环遍历查找出，符合条件的
        // i 从0开始
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
            }
        })
        // 过滤出（key不相等）的Tabs， 即删除了key相等时的Tabs
        // 过滤后得到一个新的数组
        const panes = this.state.panes.filter(pane => pane.key !== targetKey)
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key
            } else {
                // js不能从后面查找
                // 当删除第一个Tabs时
                activeKey = panes[0].key
            }
        }
        this.setState({ panes, activeKey })
    }

    render() {
        return (
            <div>
                <Card
                    title='Tab页签的使用（1）'
                    className='card-wrap'
                >
                    <Tabs
                        defaultActiveKey="2"
                        type="card"
                    >
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="apple" />
                                    Tab 1
                                </span>
                            }
                            key="1"
                        >
                            Tab 1
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="android" />
                                    Tab 2
                                </span>
                            }
                            key="2"
                        >
                            Tab 2
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="phone" />
                                    Tab 3
                                </span>
                            }
                            disabled
                            key="3">
                            Tab 3
                        </TabPane>
                    </Tabs>
                </Card>

                <Card
                    title='Tab页签的使用（2）'
                    className='card-wrap'
                >
                    <Tabs
                        defaultActiveKey='2'
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}    /*  一旦有activeKey，则defaultActiveKey不在生效  */
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>

                <Card
                    title='Tab页签的使用（3）'
                    className='card-wrap'
                >
                    <div style={{ marginBottom: 16 }}>
                        <Button type='primary'  onClick={this.add}>添加面板</Button>
                    </div>
                    <Tabs
                        defaultActiveKey='3'
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        )
    }
}
