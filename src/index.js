import React from "react"
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import HRouter from "./router"
import store from "./redux/store"

import './index.css'



// 入口js文件

ReactDOM.render((
    <Provider store={store}>
        <HRouter/>
    </Provider>
    ), document.getElementById('root'))
