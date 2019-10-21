import React, {Component} from 'react'
import { Row, Col, Button } from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './header.less'
import {formatDate} from '../../utils/dateUtil'
import Axios from "../../axios";

class Header extends Component{

    state={
        // Date.now()为当前时间的时间戳
        // 当前日期和时间的格式
        currentTime: formatDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    getTime = () => {
        // 定时器
        this.setIntervalId = setInterval(()=> {
            // 当前时间
            const currentTime = formatDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    // 获取当前的天气
    getWeather2 = async () => {
        const city = '西安';
        const res =await Axios.jsonp({
            url:`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        })
        if(res.status === 'success'){
            const data = res.results[0].weather_data[0]
            this.setState({
                dayPictureUrl:data.dayPictureUrl,
                weather:data.weather
            })
        }
    }

    // 获取当前的天气
    getWeather = () => {
        let city = '西安';
        Axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0]
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }

    componentDidMount() {
        this.getTime()
        this.getWeather2()
    }

    componentWillUnmount() {
        // 清除定时器, 最好的办法就是清理定时器的id
        clearInterval(this.setIntervalId)
    }


    render() {
        const {currentTime, dayPictureUrl, weather} = this.state
        const {headerTitle, user} = this.props
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{user}</span>
                        <Button className='header-quit' type="link" onClick={()=>this.props.history.replace('/login')}>退出</Button>
                    </Col>
                </Row >
                <Row className='header-bottom'>
                    <Col span={4} className='header-bottom-left'>
                        {headerTitle}
                    </Col>
                    <Col span={20} className='header-bottom-right'>
                        <span className='right-date'>{currentTime}</span>
                        <span>
                            <img src={dayPictureUrl} alt='weather' className='weather-img'/>
                            {weather}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default connect(
    state => ({headerTitle: state.headerTitle, user: state.user}),
    {}
)(withRouter(Header))
