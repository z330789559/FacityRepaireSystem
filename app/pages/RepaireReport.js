/**
 * Created by baozhong on 2017/3/9.
 */
import React, {Component} from "react";
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    DeviceEventEmitter
} from "react-native";
import EditView from "../component/EditView";
import Config from "../config"
import NetUitl from '../util/NetUtil';
import LoginButton from "../component/LoginButton";
import px2dp from '../util'
import Wrapper from '../component/Wrapper'
const {width,height}=Dimensions.get("window")
export default class RepaireReport extends Component {
    constructor(props) {
        super(props)
        this.repaireMethod = ""
    }

    onPressCallback = ()=> {
        const {navigator}=this.props
        const _id=this.props._id
        let formData = {
            _id:_id,
            repaireMethod:this.repaireMethod
        };
        let _this=this;
        let url = Config.domain+"/order/updatereport";
        NetUitl.postJson(url,formData,(data) => {
            if(data && data.status=="success"){
                if(navigator){
                    navigator.pop();
                    DeviceEventEmitter.emit("reportover")
                }
            }
        })
    }
    backHome=()=>{
        const {navigator}=this.props
        navigator.pop();
    }
    render = ()=> {
        return (
            <View style={RepaireReportStyles.repaireReportView}>
                <ScrollView>
                <View style={{marginTop:px2dp(200),flexDirection:'column',flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={RepaireReportStyles.groupStyles}>
              <EditView name="输入维修方式" onChangeText={(text) => {
                 this.repaireMethod = text;
        }}/>
                    <LoginButton name='提交' onPressCallback={this.onPressCallback}/>
                        <TouchableOpacity onPress = {this.backHome}>
                            <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >返回首页</Text>
                        </TouchableOpacity>
</View>
                </View>
</ScrollView>
            </View>
        )
    }
}
const RepaireReportStyles = StyleSheet.create({
    repaireReportView: {
        flex:1,
        padding: 5,
        backgroundColor: "#fff"
    },
    groupStyles:{
     width:width-60
}
})