/**
 * Created by baozhong on 2017/2/9.
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
    TouchableOpacity,
    Dimensions,
ScrollView
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import EditView from '../../component/EditView';
import LoadImg from '../../images';
import LoginButton from '../../component/LoginButton';
import NetUitl from '../../util/NetUtil';
import Config from '../../config'
import px2dp from '../../util'
import Wrapper from '../../component/Wrapper'
import WrapperOperator from '../../component/WrapperOperator'
const {width,height}=Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'
export default class Register extends Component{
    constructor(props){
        super(props)
        this.userName = ""
        this.password = ""
        this.rePassword=""
        this.gender=""
        this.group=""
        this.accountType=""
        this.signature=""
        this.onRegisterSuccess=this.props.backToHome
        this.setAccountType.bind(this)
        this.state={
            accountTypes:[],
            groups:[]
        }

    }
   componentWillMount(){
   this._getGroupAndType();
   }
   _getGroupAndType=()=>{
       var _this=this;
      return NetUitl.getJson(Config.domain+"/dict/getGroupAndType",{},function (data) {
          _this.setState({
              accountTypes:data.types,
              groups:data.groups
          })
      })
   }
 render(){
     return (
         <View style={LoginStyles.loginview}>
          <ScrollView>

         <View style={{marginTop:20}}>
             <EditView  name='输入用户名' onChangeText={(text) => {
            this.userName = text;
        }}/>
             <EditView name='输入密码' onChangeText={(text) => {
            this.password = text;
        }}/>
             <EditView name='重复密码' onChangeText={(text) => {
            this.rePassword = text;
        }}/>
             <View style={LoginStyles.typeDropContainerStyle}>
                 {this.state.accountTypes.length > 0?this.getTypeList():<Text></Text>}

         </View>
             <View style={LoginStyles.typeDropContainerStyle}>
                 {this.state.groups.length> 0?this.getGroupList():<Text></Text>}
             </View>
             <View style={LoginStyles.typeDropContainerStyle}>
             <ModalDropdown
                 options={["男","女"]} defaultValue="请选择性别"
                 style={LoginStyles.typeDropStyle}
                 textStyle={LoginStyles.typeDropTextStyle}
                 dropdownStyle={LoginStyles.dropDownStyle}
                 onSelect={(index,value)=>{this.setSexType(value)}}
             />
             </View>
             <LoginButton name='注册' onPressCallback={this.onPressCallback.bind(this)}/>
             <TouchableOpacity onPress = {this.backLogin}>
                 <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >返回登陆</Text>
             </TouchableOpacity>
         </View>
              </ScrollView>
     </View>)
 }
    backLogin=()=>{
        const {navigator} =this.props
        if(navigator){
            navigator.pop();
        }
    }
    setSexType=(value)=>{
       this.gender=value
    }
    setGroupType=(value)=>{
      this.group=value
    }
    getGroupList=()=>{
        return   <ModalDropdown
            options={this.state.groups} defaultValue="请选择组别"
            style={LoginStyles.typeDropStyle}
            textStyle={LoginStyles.typeDropTextStyle}
            dropdownStyle={LoginStyles.dropDownStyle}
            onSelect={(index,value)=>{this.setGroupType(value)}}
        />
    }
    getTypeList=()=>{
        return <ModalDropdown
            options={this.state.accountTypes} defaultValue="请选择类型"
            style={LoginStyles.typeDropStyle}
            textStyle={LoginStyles.typeDropTextStyle}
            dropdownStyle={LoginStyles.dropDownStyle}
            onSelect={(index,value)=>{this.setAccountType(value)}}
        />
    }
    onPressCallback=()=>{
        if(!this.userName && !this.password && !this.rePassword && !this.group && this.accountType){
            alert("请填写完成信息!");
            return false;
        }
        let formData = {
            name:this.userName,
            password:this.password,
            re_password:this.rePassword,
            gender:this.gender,
            group:this.group,
            account_type:this.accountType
        };
        let _this=this;
        let url = Config.domain+"/signup";
        NetUitl.postJson(url,formData,(data) => {
            if(data && data.status && data.status=="success"){
                if(_this.accountType=="维修员"){
                    _this.onRegisterSuccess(Wrapper);
                }else{
                    _this.onRegisterSuccess(WrapperOperator);
                }

            }else{
                alert(data.error)
            }

        })
   }
    setAccountType=(value)=>{
        this.accountType=value
       // this.modalDropdown.select(index)
    }

}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    typeDropStyle:{
        backgroundColor: '#ffffff',
        height:45,

    },
    typeDropTextStyle:{
        backgroundColor: '#ffffff',
        fontSize:px2dp(14),
        paddingLeft:30,
        paddingVertical:10

    },
    typeDropContainerStyle:{
        marginTop: 10,
        height:50,
        backgroundColor: '#ffffff',
        borderRadius:5,
        borderWidth:0.3,
        borderColor:'#000000',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dropDownStyle:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width:width-60,
        flex:1,
        height:100
    }
});