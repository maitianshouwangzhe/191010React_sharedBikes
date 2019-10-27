import React, {Component} from 'react'
import {HashRouter, Switch, Redirect, Route} from "react-router-dom";

import App from "./App";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import ButtonAdmin from "./pages/ui-admin/button-admin/button-admin";
import ModalAdmin from "./pages/ui-admin/modal-admin/modal-admin";
import LoadingAdmin from "./pages/ui-admin/loading-admin/loading-admin";
import NotificationAdmin from "./pages/ui-admin/notification-admin/notification-admin";
import MessageAdmin from "./pages/ui-admin/message-admin/message-admin";
import TabAdmin from "./pages/ui-admin/tab-admin/tab-admin";
import PictureWallAdmin from "./pages/ui-admin/picture-wall-admin/picture-wall-admin";
import CarouselPhoto from "./pages/ui-admin/carousel-photo/carousel-photo";
import LoginAdmin from "./pages/form-admin/login-admin/login-admin";
import RegisterAdmin from "./pages/form-admin/register-admin/register-admin";
import BasicTable from "./pages/table-admin/basic-table/basic-table";
import SeniorTable from "./pages/table-admin/senior-table/senior-table";
import RichTextEditor from "./pages/rich-text-editor/RichTextEditor";
import City from "./pages/city/City";
import Order from "./pages/order/Order";
import User from "./pages/user/User";
import Bike from "./pages/bike/Bike";
import Bar from "./pages/charts-admin/bar";
import Pie from "./pages/charts-admin/pie";
import Line from "./pages/charts-admin/line";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/not-found/NotFound";


//  路由器  集中管理项目中所有的 路由
export default class HRouter extends Component{

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login} />

                        {/* 不能将path='/' 放在第一个，否则永远只匹配这一个，只能将其放在最后一个 */}
                        <Route path='/' render={()=>
                            <Admin>
                                <Switch>
                                    <Redirect exact from='/' to='/home'/>        {/*  从根目录进去，直接跳转到首页 */}
                                    <Route path='/home' component={Home}/>
                                    <Route path='/ui/buttons' component={ButtonAdmin}/>
                                    <Route path='/ui/modals' component={ModalAdmin}/>
                                    <Route path='/ui/loadings' component={LoadingAdmin}/>
                                    <Route path='/ui/notification' component={NotificationAdmin}/>
                                    <Route path='/ui/messages' component={MessageAdmin}/>
                                    <Route path='/ui/tabs' component={TabAdmin}/>
                                    <Route path='/ui/gallery' component={PictureWallAdmin}/>
                                    <Route path='/ui/carousel' component={CarouselPhoto}/>
                                    <Route path='/form/login' component={LoginAdmin}/>
                                    <Route path='/form/reg' component={RegisterAdmin}/>
                                    <Route path='/table/basic' component={BasicTable}/>
                                    <Route path='/table/high' component={SeniorTable}/>
                                    <Route path='/rich' component={RichTextEditor}/>
                                    <Route path='/city' component={City}/>
                                    <Route path='/order' component={Order}/>
                                    <Route path='/user' component={User}/>
                                    <Route path='/bikeMap' component={Bike}/>
                                    <Route path='/charts/bar' component={Bar}/>
                                    <Route path='/charts/pie' component={Pie}/>
                                    <Route path='/charts/line' component={Line}/>
                                    <Route path='/permission' component={Auth}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </Admin>
                        }/>
                        <Redirect to='/'/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
