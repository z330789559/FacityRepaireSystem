/**
 * Created by baozhong on 2017/2/13.
 */
import React, { Component, PropTypes } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback,
    DeviceEventEmitter
} from 'react-native'

import px2dp from '../util'
import moment from 'moment'
import NetUtil  from "../util/NetUtil"
import  Config from "../config"
import RepaireReport from "../pages/RepaireReport"
import Comment from '../pages/Comment'
export default class ItemList extends Component {
    constructor(props){
        super(props)
        this.selectTabs=this.props.selectTabs
        this.refreshCurrentPage=this.props.refreshCurrentPage
        this.state={
            scoreStatus:"1"
        }
    }
    static propTypes = {
        id:PropTypes.string,
        title: PropTypes.string.isRequired,
        stateCode:PropTypes.string,
        create_at:PropTypes.string,
        update_at: PropTypes.string,
        report_at:PropTypes.string,
        reasonCode: PropTypes.string,
        repairor: PropTypes.string,
        operator: PropTypes.any,
        repaireMethod:PropTypes.string
    }
    componentDidMount(){
        this.getScoreStatu();
        this.refreshCurrentPage()
    }
    getScoreStatu=()=>{
        var _this=this;
        NetUtil.getJson(Config.domain+"/scorestatus",{},(data)=>{
            _this.setState({
                scoreStatus:data.scoreStatus
            })

        })
    }
    render(){
        const { title,  stateCode, create_at,update_at,report_at, reasonCode, repairor,operator,repaireMethod } = this.props
       var contentColor="#666"
        let render = (
            <View style={styles.item}>
                <View style={styles.info}>
                    <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9",marginTop:10}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: px2dp(14), color:"#333"}}>机器编号:{title}</Text>
                        <Text style={{fontSize: px2dp(14), color:"#333"}}>组别:{operator.group}</Text>
                        {this.renderReportbtn()}
                    </View>
                        </View>
                    <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9",marginTop:10}}>
                        <Text style={{fontSize: px2dp(12), color:contentColor,marginTop: 5}}>故障报修时间:{moment(create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss")}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
                        <Text style={{fontSize: px2dp(12), color:"#bbb"}}>{"操作员:"}{operator.name}</Text>

                            </View>
                        { this.getRepaireView() }

                    </View>
                        {this.getCommentView()}

                </View>
            </View>
        )
        return (
            Platform.OS === 'ios'?(
                <TouchableHighlight style={{marginTop: 10}} onPress={() => {}}>{render}</TouchableHighlight>
            ):(
                <View ><TouchableNativeFeedback onPress={() => {}}>{render}</TouchableNativeFeedback></View>
            )
        )
    }
    getCommentView=()=>{
        const {report_at,repairor,score} =this.props
        if(report_at && this.state.scoreStatus=="2"){
        const commentScore=score!=0?score+"／10":"未评价"

        return <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9",marginTop:10}}>

            <Text style={{fontSize: px2dp(12), color:"#bbb",marginTop: 5}}>评价:{commentScore}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
                <Text style={{fontSize: px2dp(13), color:"#aaa"}}>机器修好时间{moment(report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss")}</Text>
                <Text style={{fontSize: px2dp(13), color:"#333"}}>{"报告人员:"}{repairor}</Text>
        </View>
            </View>
        }else{
            return <View style={{flex:1}}><Text></Text></View>
        }

    }
    _redirectToPageg=(index,data)=>{
        const {switchPage}=this.props
        if(switchPage&& data &&data.status=="success"){
            this.refreshCurrentPage()
            switchPage(index)
            DeviceEventEmitter.emit("reportover")
        }else{
            alert(data.error)
        }

    }
    _grapOrder=(_id)=>{
        var _this=this;

        NetUtil.getJson(Config.domain+"/order/graborder",{_id:_id},_this._redirectToPageg.bind(_this,1))


    }
    getRepaireView=()=>{
        const {update_at,repairor }= this.props
        if(update_at){
            return <View style={{flex:1}}>
                <Text style={{fontSize: px2dp(13), color:"#aaa"}}>故障开始维修时间:{moment(update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss")}</Text>
                <Text style={{fontSize: px2dp(13), color:"#333",marginTop: 5}}>{"维修人员:"}{repairor}</Text>
            </View>
        }else{
            return <View style={{flex:1}}><Text></Text></View>
        }
    }
    _updateReport=(id)=>{
        const {navigator,refreshCurrentPage}=this.props
        navigator.push({
            name:"repaireReport",
            component:RepaireReport,
            params:{
                _id:id,
                refreshCurrentPage:refreshCurrentPage
            }
        })
       }

    _updateComment=(id)=>{
        const {navigator}=this.props
        navigator.push({
            name:"comment",
            component:Comment,
            params:{
                _id:id
            }
        })
    }
    renderReportbtn(){
        const {stateCode,_id,isOperator} =this.props;
        if(isOperator){
            if(stateCode =="维修完成") {
                return <TouchableHighlight onPress={()=>{this._updateComment(_id)}}>
                    <Text style={styles.btn_style}>{"发表评价"}</Text>
                </TouchableHighlight>
            }else{
                return <Text style={{fontSize: px2dp(14), color:"#ccc"}}>{stateCode}</Text>
            }
        }else{
            if(stateCode =="待维修"){
                return  <TouchableHighlight onPress={()=>{this._grapOrder(_id)}}>
                    <Text style={styles.btn_style}>{"抢单维修"}</Text>
                </TouchableHighlight>
            }else if(stateCode =="维修中"){
                return  <TouchableHighlight onPress={()=>{this._updateReport(_id)}}>
                    <Text style={styles.btn_style}>{"提交维修报表"}</Text>
                </TouchableHighlight>
            }else if(stateCode =="维修完成"){
                return <Text style={{fontSize: px2dp(14), color:"#ccc"}}>{"等待评价"}</Text>

            }else if(stateCode =="评价完成"){
                return <Text style={styles.btn_style}>{"已结单"}</Text>

            }
        }

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
    },
    btn_style:{
        fontSize: px2dp(14),
        color:"#fff",
        padding:px2dp(10),
        marginTop: 5,
        fontWeight:'600',
        backgroundColor:"green",
        borderRadius:px2dp(10)
    }
})
