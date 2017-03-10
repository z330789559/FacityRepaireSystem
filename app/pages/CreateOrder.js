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
import EditView from '../component/EditView';
import LoadImg from '../images';
import LoginButton from '../component/LoginButton';
import NetUitl from '../util/NetUtil';
import Config from '../config'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height}=Dimensions.get('window')
export default class createOrder extends Component{
    constructor(props){
        super(props)
        this.title = ""
        this.faultType = ""
        this.state={
            faultType:[]
        }
        this.selectTabs=this.props.selectTabs;
    }
    componentWillMount(){
        var _this=this;
        NetUitl.getJson(Config.domain+"/dict/getFaultType",{},function (data) {
           
            _this.setState({
               faultType:data.faultTypes
           })
        })
    }
 render(){
     return (
         <View style={LoginStyles.loginview}>
          <ScrollView>
         <View   style={{flexDirection: 'row',height:60,marginTop:10,
        justifyContent: 'center',
        alignItems: 'flex-start'}}>
             <Icon name="md-create" size={px2dp(40)} color="red" />
         </View>
         <View style={{marginTop:40}}>
             <EditView  name='设备编号' onChangeText={(text) => {
            this.title = text;
        }}/>
             <View style={LoginStyles.typeDropContainerStyle}>
                 {this.state.faultType==0?<Text></Text>:this.getFaultType()}
             </View>


             <LoginButton name='提交' onPressCallback={this.onPressCallback}/>
         </View>
              </ScrollView>
     </View>)
 }

   getFaultType=()=>{
       return <ModalDropdown
                              options={this.state.faultType} defaultValue="请选择报修原因"
                              style={LoginStyles.typeDropStyle}
                              textStyle={LoginStyles.typeDropTextStyle}
                              dropdownStyle={LoginStyles.dropDownStyle}
                              onSelect={(index,value)=>{this.setStatuCode(value)}}
       />
   }
    onPressCallback=()=>{
        console.log(this.reasonCode);
        let formData = {
            title:this.title,
            stateCode:"待维修",
            reasonCode:this.faultType
        };
        console.log(JSON.stringify(formData));
        let _this=this;
        let url = Config.domain+"/order";
        NetUitl.postJson(url,formData,(data) => {
            console.log(JSON.stringify(data))
            if(data && data.status && data.status=="success"){
                _this.selectTabs(1);
            }else{
                alert(JSON.stringify(data.error))
            }

        })
   }
    setStatuCode=(value)=>{
        this.faultType=value
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