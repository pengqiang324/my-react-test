import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getTitle, getUserList } from './store/action'
import { request } from './api/request' 
import reactContext from './Context'
import {Helmet} from "react-helmet";

import styles from './App.css'

function Home(props) {
    const [num, setNum] = useState(0)
    const handleNum = () => {
        console.log('点击了')
        setNum(value => (value+1))
    }
    useEffect(async () => {
        await props.getTitle()
        await props.getUserList()
    }, [])
    return (
        <reactContext.Consumer>
            {
                (context) => {
                    if (context) {
                        context.css.push(styles)
                        // console.log(context.css)
                    }
                    return (
                        <div>
                            <Helmet>
                                <title>这是首页</title>
                                <meta name="description" content="首页信息"></meta>
                            </Helmet>
                            <h1 className="title">标题：{props.title}</h1>
                            <div>数值递增：{num}  <button onClick={handleNum}>+1</button></div>
                            <h4>用户列表：</h4>
                            <ul>
                                {
                                    props.userList.map((item,index) => (
                                        <li key={index} style={{ marginTop: '10px'}}>
                                            <h4>姓名：{item.name}</h4>
                                            <p>年龄：{item.age} 性别：{item.sex}</p>
                                            <p>简介：{item.descri}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            }
        </reactContext.Consumer>
    )
}

Home.getInitData = async (store) => {
    await store.dispatch(getTitle())
    await store.dispatch(getUserList())
}

const mapStateToProps = function(state) {
    return {
        title: state.title,
        userList: state.userList
    }
}

const mapActionToProps = function(dispatch) {
    return {
        getTitle: async () => {
            await dispatch(getTitle())
        },
        getUserList: async () => {
            await dispatch(getUserList())
        }
    }
}
export default connect(mapStateToProps,mapActionToProps)(Home)