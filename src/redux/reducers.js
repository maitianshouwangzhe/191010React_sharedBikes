import {combineReducers} from "redux";

import {SET_HEADER_TITLE} from "./action-types";


const initHeaderTitle = ''
function headerTitle( state = initHeaderTitle, action) {
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.headerTitle
        default:
            return state
    }
}



const currentUser = '麦穗'

function user( state = currentUser, action) {
    switch (action.type) {
        default:
            return state

    }
}


// reducer管理着总的状态
export default combineReducers({
        headerTitle,
        user
})

