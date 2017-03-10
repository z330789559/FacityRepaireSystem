/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import EditView from '../../component/EditView';
import LoginButton from '../../component/LoginButton';
import NetUitl from '../../util/NetUtil'
import Wrapper from '../../component/Wrapper'
import WrapperOperator from '../../component/WrapperOperator'
import Register from '../../pages/Login/Register'
import Config from '../../config'
import px2dp from '../../util/index'
import Icon from 'react-native-vector-icons/Ionicons'
export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
  }

  render() {
      return (

    <View style={LoginStyles.loginview}>
     <View   style={{flexDirection: 'row',height:100,marginTop:1,
        justifyContent: 'center',
        alignItems: 'flex-start'}}>
         <Icon name="ios-phone-portrait-outline" size={px2dp(40)} color="#fff" />
     </View>
     <View style={{marginTop:80}}>
       <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
            this.userName = text;
        }}/>
       <EditView name='输入密码' onChangeText={(text) => {
            this.password = text;
        }}/>
        <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
         <TouchableOpacity onPress = {this.pushToRegister}>
        <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >没有账号？点击注册</Text>
             </TouchableOpacity>
      </View>
     </View>
   )
  }

    pushToRegister=()=>{
        const { navigator } = this.props;
        let _this=this;

        if (navigator) {
            navigator.push({
                name:"register",
                component:Register,
                params:{
                    backToHome:_this.onLoginSuccess
                }
            })
        }
    }

  onPressCallback = () => {
    let formData = {
        name:this.userName,
        password:this.password
    };
      let _this=this;
    let url = Config.domain+"/signin";
    NetUitl.postJson(url,formData,(data) => {
              let _wrapper=WrapperOperator;
        console.log("登陆成功"+JSON.stringify(data));
        if(data &&  data.status =="success"){
            if(data.user.account_type=="维修员"){
                _wrapper=Wrapper
            }
            console.log("跳转到操作用成功")
            _this.onLoginSuccess(_wrapper);
        }else{
            alert(JSON.stringify(data))
        }
    })


  };

  //跳转到第二个页面去
    onLoginSuccess=(wrapper)=>{
     const { navigator } = this.props;

     if (navigator) {
       navigator.push({
         name : 'wrapper',
         component : wrapper
       });
     }
   }

}

class loginLineView extends Component {
  render() {
    return (
        <Text >
            没有帐号
          </Text>
    );
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
});
