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
    Dimensions
} from "react-native";
import EditView from "../component/EditView";
import Config from "../config"
import NetUitl from '../util/NetUtil';
import LoginButton from "../component/LoginButton";
import px2dp from '../util'
import ModalDropdown from 'react-native-modal-dropdown';
const {width,height}=Dimensions
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.score = 6
    }

    onPressCallback = ()=> {
        const {navigator}=this.props
        const _id=this.props._id
        let formData = {
            _id:_id,
            score:this.score
        };
        let _this=this;
        let url = Config.domain+"/comment/updateComment";
        NetUitl.postJson(url,formData,(data) => {
            if(data && data.status=="success"){
                if(navigator){
                    navigator.pop();
                }
            }
        })
    }
    setCommentValue=(index)=>{
       this.score=++index;
    }
    render = ()=> {
        return (
            <View style={RepaireReportStyles.repaireReportView}>
                <ScrollView>
                <View style={{marginTop:px2dp(200)}}>
                    <View style={RepaireReportStyles.groupStyles}>
                        <View style={RepaireReportStyles.typeDropContainerStyle}>
                            <ModalDropdown
                                options={["★","★★","★★★","★★★★","★★★★★"]} defaultValue="请选择评分"
                                style={RepaireReportStyles.typeDropStyle}
                                textStyle={RepaireReportStyles.typeDropTextStyle}
                                dropdownStyle={RepaireReportStyles.dropDownStyle}
                                onSelect={(index,value)=>{this.setCommentValue(index)}}
                            />
                        </View>
                    <LoginButton name='提交' onPressCallback={this.onPressCallback}/>
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
        width:width-60,
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
})