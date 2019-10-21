import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import reducers from './reducers'

//根据reducers，创建store对象。并搭建搭建redux开发环境。
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))