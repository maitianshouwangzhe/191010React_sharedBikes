import React, {Component} from 'react'
import {Card, Tabs, Icon} from "antd"

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
                //  是否可以关闭， false就是不能关闭
                closable: false,
            },
        ]

        this.state = {
            activeKey: panes[0].key,
            panes,
        }
    }

    onChange = activeKey  => {
        this.setState({ activeKey })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }


    add = () => {
        const { panes } = this.state
        const activeKey = `newTab${this.newTabIndex++}`
        // 添加一个面板
        panes.push({ title: `newTab${this.newTabIndex++}`, content: `Content of newTab${this.newTabIndex++}`, key: activeKey })
        this.setState({ panes, activeKey })
    }

    remove = targetKey => {
        let { activeKey } = this.state
        let lastIndex
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
            }
        })
        const panes = this.state.panes.filter(pane => pane.key !== targetKey)
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key
            } else {
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
