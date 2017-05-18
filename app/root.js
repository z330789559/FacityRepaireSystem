/**
 * Created by baozhong on 2017/3/5.
 */


import React, { Component } from 'react'
import {View,Platform,Text,
    DeviceEventEmitter} from 'react-native'
import App from './app'
import Loading from './component/Loading'
import Config from './config'
import WrapperOperator from './component/WrapperOperator'
import Wrapper from './component/Wrapper'
import NetUitl from './util/NetUtil'
import  LoginActivity from './pages/Login/LoginActivity'
import JPushModule from 'jpush-react-native';
var {NativeModules}=require('react-native')
import GrapOrder from './pages/GrapOrder'
export default class RootApp extends  Component {

    constructor(props) {
        super(props)
        this.orderid=null;
        this.state = {
            _component: {},
            loginStatu: false
        }
    }

    componentWillMount() {
        
        // JPushModule.addReceiveOpenNotificationListener((map) => {
        //     console.log("extras: " + JSON.stringify( map.extras));
        //     this.setState({
        //         orderid: map.extras.orderid
        //     })
        //
        // });
        

        this._getLogin();
        // NativeModules.JPushModule.getMainActivityData(function (orderid,result) {
        //     console.warn(orderid+"----"+result)
        //     _this.orderid=orderid
        //     _this.grap=result
        // },function (error) {
        //     console.warn(JSON.stringify(error))
        // })

    }
    render() {
        
        return this.state.loginStatu?(
            <View style={{backgroundColor:Platform.OS=="ios"?"#000":"#fff",flex:1}}>
                   <App _component={this.state._component}  orderid={this.orderid}/>
            </View>
        ):<Loading></Loading>

    }
    _getLogin=()=>{
        // console.warn()
           var _this=this;

        NetUitl.getJson(Config.domain+"/signin",{},(data)=>{
            if(data && data.isLogin){
                if (data.user && data.user.account_type == "操作员") {

                    this.setState({
                        loginStatu: true,
                        _component: WrapperOperator
                    })
                }else if(data.user && data.user.account_type == "维修员"){
                    // JPushModule.setAlias(data.user.name,()=>{
                    //     console.log('设置别名成功"extras3: "'+data.user.name)
                    // })
                     // if(_this.orderid) {
                         _this.setState({
                             loginStatu: true,
                             _component: GrapOrder
                         })

                     // }else{
                     //     _this.setState({
                     //         loginStatu: true,
                     //         _component: Wrapper
                     //     })
                     //
                     // }


                }

            }else{

                this.setState({
                    loginStatu:true,
                    _component:LoginActivity
                })
            }
        })
    }
}