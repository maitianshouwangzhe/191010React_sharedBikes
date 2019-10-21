import React, {Component} from 'react'
import { Row,Col } from 'antd';

import LeftNav from "../../components/left-nav/leftNav"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"

import './admin.less'




export default class Admin extends Component{

    render() {
        return (
            <Row className="container">
                <Col span={3} className="nav-left">
                    <LeftNav/>
                </Col>
                {/*  头部、内容、及底部均占栅格20   */}
                <Col span={21} className="main">
                    <Header/>
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>

        )
    }
}
