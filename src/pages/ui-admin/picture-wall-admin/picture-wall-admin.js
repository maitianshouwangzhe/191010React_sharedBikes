import React, {Component} from 'react'
import {Card, Col, Modal, Row} from "antd"
const { Meta } = Card
export default class PictureWallAdmin extends Component{

    state = {
        visible: false
    }


    openGallery = (item) => {
        this.setState({
            visible: true,
            // 如果没法确定初值状态，可以先不定义，
            //先着手实现，最后定义初值状态
            currentImg: '/gallery/'+ item,
        })
    }

    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ]
        const imgList = imgs.map(list => list.map((item, index) =>
            <Card
                hoverable
                key={index}
                style={{ width: 240, marginBottom: 15 }}
                cover={ <img src={'/gallery/' + item} alt={index}   /> }
                onClick={ ()=> this.openGallery(item) }
            >
                <Meta title='图片画廊' description={item}/>
            </Card>
        ))
        return (
            <div>
                <Row gutter={40}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    title="图片画廊"
                    visible={this.state.visible}
                    onCancel={ () => this.setState({visible:false}) }   /* 必须含有隐藏对话框的回调函数   */
                    footer={null}
                    width={600}    /*  设置对话框的宽度     */
                    height={800}
                >
                    <img src={this.state.currentImg} alt='' style={{width:'100%'}}/>   {/* 图片占对话框的百分比 */}
                </Modal>
            </div>
        )
    }
}
