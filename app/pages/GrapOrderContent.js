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

import Wrapper from '../component/Wrapper'


export default class GrapOrderContent extends Component{

    constructor(props){
        super(props)
        
    }
    
        render=()=>{
            return (
                <View style={{backgroundColor:Platform.OS=="ios"?"#000":"#0398ff",flex:1,padding: 30, flexDirection: "column",justifyContent: "center",
            alignItems: "center"}}>
                    <TouchableOpacity onPress = {this._grapOrder}>
                        <Text style={{backgroundColor:"green",color:"#fff",fontSize:px2dp(28),textAlign:'center',paddingTop:px2dp(40),marginTop:10,width:px2dp(120),height:px2dp(120),borderRadius:px2dp(60)}} >抢单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._giveUp}>
                        <Text style={{backgroundColor:"red",color:"#fff",fontSize:px2dp(28),textAlign:'center',paddingTop:px2dp(40),marginTop:10,width:px2dp(120),height:px2dp(120),borderRadius:px2dp(60)}} >不抢</Text>
                    </TouchableOpacity>
                </View>
            )
                

          }
      _grapOrder=()=>{
          const {navigator,orderid} =this.props
          NetUitl.getJson(Config.domain+"/order/graborder",{"_id":orderid},(data)=>{
              var result=data &&data.status=="success"?true:false;
              
              navigator.push({
                  name:"wrapper",
                  component:Wrapper,
                  params:{
                      orderid:orderid,
                      grap:result
                  }
              })
          })
      }
      _giveUp=()=>{
          const {navigator} =this.props
          navigator.push({
              name:"wrapper",
              component:Wrapper
          })
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
