/**
 * Created by baozhong on 2017/3/9.
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
    TouchableNativeFeedback
} from 'react-native'

import px2dp from '../util'
import data from '../data'
import ItemList from './ItemList'

import Config from '../config'

import UpPullRefresh from "../component/UpPullRefresh"
export default class HomeRepairePage extends Component {
    constructor(props){
        super(props)
        this.pageIndex=0;
        this.moredata=true;
       
        this.state = {
            data: [],
            isRefreshing: false
        }
    }
    componentDidMount(){
        this.tbv._onRefresh(1, null);
    }
    // _onRefresh=()=>{
    //   var _this=this;
    //    if(this.moredata){
    //      this.setState({isRefreshing: true});
    //    }
    //  return  this.moredata && NetUitl.getJson(Config.domain+"/order/myorder",{pageIndex:_this.pageIndex},function (data) {
    //     if(data && data.status=="success"){
    //       _this.pageIndex++;
    //       if(data.orders.length <10){
    //         _this.moredata=false;
    //       }
    //         _this.setState({
    //           data:_this.state.data.concat(data.orders),
    //           isRefreshing: false
    //         })
    //
    //     }
    //   })
    //
    // }
    _renderRow=(rowData, sectionId, rowId)=>{
        const { isOperator,switchPage,navigator }=this.props
        
        return(
            <View stye={{flex:1}}>
                <ItemList key={rowId} {...rowData} navigator={navigator} isOperator={isOperator} switchPage={switchPage} />
            </View>
        );
    }
    render(){
        const {url,title}=this.props
        return (
            <View style={{backgroundColor: '#eee', flex: 1}}>
                <Text style={{textAlign: "center", color: "#999", fontSize: px2dp(12), paddingTop: 20}}>{title}</Text>
                <UpPullRefresh
                    ref={(e)=>this.tbv = e}
                    defaultPageItem={10}
                    renderRowCallback={(rowData, sectionId, rowId)=>this._renderRow(rowData, sectionId, rowId)}
                    networkParams={[url]}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 16
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