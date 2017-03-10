/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native'
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import UserInfoItem from '../component/UserInfoItem'
import Setting from './Setting'
import UserProfile from './UserProfile'
import Address from './Address'
import px2dp from '../util/index'
import  NetUtil   from '../util/NetUtil'
import  Config from '../config'
import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')

export default class My extends Component {
  constructor(props){
      super(props)
      this.state = {
        isRefreshing: false,
        user:null
      }
      this.config = [
        {keyname:"ios-pin", name:"收货地址", onPress:this.goPage.bind(this, "address")},
        {keyname:"ios-heart", name:"我的收藏", color:"#fc7b53"},
        {keyname:"md-images", name:"美食相册"},
        {keyname:"logo-usd", name:"推荐有奖", subName:"5元现金", color:"#fc7b53"},
        {keyname:"ios-cart", name:"积分商城", subName:"0元好物在这里", color:"#94d94a"}

      ]
  }
  goPage(key, data = {}){
    let pages = {
      "address": Address
    }
    if(pages[key]){
      this.props.navigator.push({
          component: pages[key],
          args: { data }
      })
    }
  }
  leftPress(){

  }
  rightPress(){
    this.props.navigator.push({
        component: Setting,
        args: {}
    });
  }
  goProfile=()=>{
    this.props.navigator.push({
        component: UserProfile,
        args: {}
    });
  }
  componentWillMount(){
    this._onRefresh()
  }
  componentDidMount(){

    var _this=this
    NetUtil.getJson(Config.domain+"/user/getUserInfo",{},function (result) {

      _this.setState({isRefreshing: false,
       user:result.user});
      })
  }
  _onRefresh(){
    this.setState({isRefreshing: true});

  }
  _renderListItem=()=>{
    var _this=this;
      const  Users=this.state.user;
      const  keys=Object.keys(Users)
      return keys.map((itemvalue, i) => {

           if(_this.isString(itemvalue)){
             var vaule=Users[itemvalue]
             return  <UserInfoItem key={i} keyname={itemvalue} name={vaule}/>
           }

         })

     // if(result.user){
     //   const  keys=Object.keys(result.user)
     //
     //   return keys.map((itemvalue, i) => {
     //
     //    if(_this.isString(itemvalue)){
     //      var vaule=result.user[itemvalue]
     //       return
     //    }
     //
     //  })
     // }
  }
  isString=(obj)=>{
      return (typeof obj=='string')&&obj.constructor==String;
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="我的"
          leftIcon="ios-notifications-outline"
          leftPress={this.leftPress.bind(this)}
          rightIcon="ios-settings-outline"
          rightPress={this.rightPress.bind(this)}
        />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#fff"
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
            
            <View>
           { this.state.user && !this.state.isRefreshing ? this._renderListItem():<Text></Text>}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: px2dp(46),
    backgroundColor: "#0398ff"
  },
  userHead: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#0398ff"
  },
  numbers: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 74
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: "center",
    alignItems: "center"
  }
})
