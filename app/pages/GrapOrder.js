/**
 * Created by baozhong on 2017/5/2.
 */
import React, { Component } from 'react'
import moment from 'moment'
import { Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    DeviceEventEmitter} from 'react-native'
var {NativeModules}=require('react-native')
import px2dp from '../util'
import NetUitl from '../util/NetUtil'
import Config from '../config'
import Loading from '../component/Loading'
import Wrapper from '../component/Wrapper'
import WrapperOperator from '../component/WrapperOperator'
import GrapOrderContent from './GrapOrderContent'
import  LoginActivity from '../pages/Login/LoginActivity'
import App from '../app'
export default class GrapOrder extends Component{

    constructor(props){
        super(props)
        this.state={
            orderid:null,
            _component:null,
            loginStatu:false
        }
    }
    componentDidMount() {
    var _this=this;
       NativeModules.JPushModule.getDataFromIntent(function (data) {
           console.log("得到oderid"+data)
           var extra=data&&JSON.parse(data);
          if(extra&&extra.orderid){
              _this.setState({
                  orderid:extra.orderid
              })
          }
           _this._getLogin();
           console.log(data)

        },function () {
           _this._getLogin();
           _this.setState({
               _component:Wrapper
           })
       })

    }
    _getLogin=()=> {
        // console.warn()
        var _this = this;

        NetUitl.getJson(Config.domain + "/signin", {}, (data)=> {
           console.log("GrapOrder------"+JSON.stringify(data))
            console.log("GrapOrder------orderid"+this.state.orderid)
            if (data && data.isLogin) {
                if (data.user && data.user.account_type == "操作员") {

                    this.setState({

                        _component: WrapperOperator
                    })
                }
                else if (data.user && data.user.account_type == "维修员" && this.state.orderid) {
                    _this.setState({
                        loginStatu: true,
                        _component: GrapOrderContent
                    })
                } else {
                    _this.setState({
                        loginStatu: true,
                        _component: Wrapper
                    })
                }
            } else {
                this.setState({
                    loginStatu: true,
                    _component: LoginActivity
                })
            }
        })
    }
        render=()=>{
            return this.state._component?(
                <View style={{backgroundColor:Platform.OS=="ios"?"#000":"#fff",flex:1}}>
                    <App _component={this.state._component}  orderid={this.state.orderid}/>
                </View>
            ):<Loading></Loading>
            // (
            //     <View style={{backgroundColor:Platform.OS=="ios"?"#000":"#0398ff",flex:1,padding: 30, flexDirection: "column",justifyContent: "center",
            // alignItems: "center"}}>
            //         <TouchableOpacity onPress = {this._grapOrder}>
            //             <Text style={{backgroundColor:"green",color:"#fff",fontSize:px2dp(28),textAlign:'center',paddingTop:px2dp(40),marginTop:10,width:px2dp(120),height:px2dp(120),borderRadius:px2dp(60)}} >抢单</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity onPress = {this._giveUp}>
            //             <Text style={{backgroundColor:"red",color:"#fff",fontSize:px2dp(28),textAlign:'center',paddingTop:px2dp(40),marginTop:10,width:px2dp(120),height:px2dp(120),borderRadius:px2dp(60)}} >不抢</Text>
            //         </TouchableOpacity>
            //     </View>
            // )


          }

}
    const styles = StyleSheet.create({
        item: {
            flexDirection: "row",
            paddingLeft: 16,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingTop: 16,
            borderTopWidth:2,
            borderTopColor:"#ccc"
        },
        logo: {
            width: 35,
            height: 35,
            marginRight: 8,
            resizeMode: "cover",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#f5f5f5"
        },
        info: {
            paddingRight: 16,
            flex: 1
        }
    })
