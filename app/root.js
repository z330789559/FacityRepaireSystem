/**
 * Created by baozhong on 2017/3/5.
 */


import React, { Component } from 'react'
import {View,Platform,Text} from 'react-native'
import App from './app'
import Loading from './component/Loading'
import Config from './config'
import WrapperOperator from './component/WrapperOperator'
import Wrapper from './component/Wrapper'
import  LoginActivity from './pages/Login/LoginActivity'
export default class rootApp extends  Component {

    constructor(props) {
        super(props)
        this.state = {
            _component: {},
            loginStatu: false
        }
    }

    componentWillMount() {
        this._getLogin();
    }

    render() {
        let {navigation}=this.props;
        return this.state.loginStatu?(
            <View style={{backgroundColor:Platform.OS=="ios"?"#000":"#0398ff",flex:1}}>
               <App _component={this.state._component} navigation={navigation} />
            </View>
        ):<Loading></Loading>

    }
    _getLogin=()=>{
        // console.warn()
        (async () => {
            let res= await fetch(Config.domain+'/signin')

            let data=await res.json();
            console.log("查看登陆结果"+JSON.stringify(data))

            if(data && data.isLogin){
                if(data.user && data.user.account_type=="操作员"){
                    this.setState({
                        loginStatu:true,
                        _component:WrapperOperator
                    })
                }else{
                    this.setState({
                        loginStatu:true,
                        _component:Wrapper
                    })
                }

            }else{

                this.setState({
                    loginStatu:true,
                    _component:LoginActivity
                })
            }

        })()
    }
}