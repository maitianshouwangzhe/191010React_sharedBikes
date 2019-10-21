import React, {Component} from 'react'
import { Menu } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import menuList from "../../config/menuConfig";
import logo from '../../asserts/images/logo-ant.svg'
import './left-nav.less'
import {setHeaderTitle} from "../../redux/action";

const { SubMenu } = Menu;
class LeftNav extends Component{


    // 生成左侧的导航栏
    getMenuNodes = (menuList)=> {
        return menuList.map(item => {
            if (item.children){
                return (
                    <SubMenu
                        title={item.title}
                        key={item.key}
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} onClick={()=> this.props.setHeaderTitle(item.title)}>
                        <Link to={item.key}>{item.title}</Link>    {/*   点击导肮项，实现路由跳转   */}
                    </Menu.Item>
                )
            }
        })
    }

    // 使用方法实现路由跳转
    // 这里传如的参数是形参
    handleMenu=(key, title)=>{
        this.props.setHeaderTitle(title)
        // 实现路由跳转
        this.props.history.push(key)
    }

    // 生成左侧的导航栏(方法2)
    getMenuNodes2 = (menuList)=> {
        // 取出当前的路由路径
        const path = this.props.location.pathname
        console.log(path)
        return menuList.reduce((pre, item)=> {
            if (! item.children){
                // 解决一旦刷新，标题不能正确显示的bug
                if (item.key === path || path.indexOf(item.key)=== 0){
                    this.props.setHeaderTitle(item.title)
                }
                // 解决从根目录访问，标题不能显示的bug
                if (path === '/'){
                    this.props.setHeaderTitle('首页')
                }
                pre.push(
                    <Menu.Item key={item.key} onClick={()=>this.handleMenu(item.key, item.title)}>   {/* 传两个参数  */}
                        {item.title}
                    </Menu.Item>
                )
            } else {
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={item.title}
                    >
                        {
                            this.getMenuNodes2(item.children)
                        }
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }


    componentWillMount() {
        // 根据menuList生成左侧菜单
     this.menuNodes = this.getMenuNodes2(menuList)
    }

    render() {
        const path = this.props.location.pathname
        return (
            <div className='left-nav'>
                <Link to='/home' className='logo'>
                    <img src={logo} alt='logo'/>
                    <h1>共享单车后台</h1>
                </Link>
                <Menu
                    mode="vertical"
                    theme='dark'
                    selectedKeys={[path]}       /* 根据当前的路由路径， 选中当前的menu */
                >
                    {
                        this.menuNodes           /*  左侧菜单   */
                    }
                </Menu>
            </div>
        )
    }
}

// 将非路由组件包装成路由组件
export default connect(
    state => ({headerTitle: state.headerTitle}),
    {setHeaderTitle}
)(withRouter(LeftNav))
