/*
action对象： 有同步action和异步的action
*/

import {SET_HEADER_TITLE} from "./action-types";

export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, headerTitle})