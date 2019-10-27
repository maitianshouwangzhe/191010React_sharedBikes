import React, {Component} from 'react'
import { Card, Carousel, Radio} from 'antd'

import carousel1 from '../../../asserts/carousel-img/carousel-1.jpg'
import carousel2 from '../../../asserts/carousel-img/carousel-2.jpg'
import carousel3 from '../../../asserts/carousel-img/carousel-3.jpg'
import '../ui-admin.less'

export default class CarouselPhoto extends Component{
    state = {
        dotPosition: 'top'
    }


    onChange = (a, b, c) => {
        console.log(a, b, c)
    }



    handlePositionChange = ({ target: { value: dotPosition } }) =>{
        this.setState({ dotPosition })
    }

    render() {
        const { dotPosition } = this.state
        return (
            <div>
                <Card title="文字背景轮播图"  className='card-wrap'>
                    <Carousel
                        afterChange={this.onChange}
                        effect='fade'
                    >
                        <div>
                            <h3>React</h3>
                        </div>
                        <div>
                            <h3>Vue</h3>
                        </div>
                        <div>
                            <h3>Angular</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播"  className='slide-wrap'>
                    <Carousel
                        afterChange={this.onChange}
                        autoplay
                    >
                        <div>
                            <img src={carousel1} alt="1" style={{width: '100%'}}/>
                        </div>
                        <div>
                            <img src={carousel2} alt="2"/>
                        </div>
                        <div>
                            <img src={carousel3} alt="3"/>
                        </div>
                    </Carousel>
                </Card>
                <Card title="变换位置轮播"  className='card-wrap'>
                    <Radio.Group
                        onChange={this.handlePositionChange}
                        value={dotPosition}
                        style={{ marginBottom: 8 }}
                    >
                        <Radio.Button value="top">Top</Radio.Button>
                        <Radio.Button value="bottom">Bottom</Radio.Button>
                        <Radio.Button value="left">Left</Radio.Button>
                        <Radio.Button value="right">Right</Radio.Button>
                    </Radio.Group>
                    <Carousel dotPosition={dotPosition}>
                        <div>
                            <h3>1-react</h3>
                        </div>
                        <div>
                            <h3>2-vue</h3>
                        </div>
                        <div>
                            <h3>3-angular</h3>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
