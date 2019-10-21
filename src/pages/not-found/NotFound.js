import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd'

import {setHeaderTitle} from "../../redux/action";
import './NotFound.less'

 class NotFound extends Component{



    // 防止上一次修改了标题的状态，保留到这一次， 带来干扰
    componentWillMount() {
        this.props.setHeaderTitle('')
    }


     goHome = () => {
        this.props.setHeaderTitle('首页')
        this.props.history.replace('/home')
    }

    render() {
        return (
            <div className='not-found' >

                <Button className='not-found-head' type="primary" onClick={this.goHome}>返回首页</Button>
                <div className='not-found-button'>
                    404 未找到
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {setHeaderTitle}
)(NotFound)
