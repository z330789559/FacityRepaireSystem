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
    TouchableNativeFeedback,
    DeviceEventEmitter
} from 'react-native'


import ItemList from './ItemList'
import  ItemContentPull from "./ItemContentPull"
import px2dp from '../util'
export default class ItemContent extends Component {
    constructor(props){
        super(props)
        this.pageIndex=0;
       
        this.state = {
            data: [],
            isRefreshing: false
        }
    }
    componentDidMount(){
        DeviceEventEmitter.addListener("reportover",()=>{
            this._refreshCurrentPage();
        })
        DeviceEventEmitter.addListener("createorder",()=>{
            this._refreshCurrentPage();
        })
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
    _refreshCurrentPage=()=>{
        this.tbv.onPullRelease()
     }

    _renderRow=(rowData, sectionId, rowId)=>{
        const { isOperator,switchPage,navigator }=this.props
        return(
            <View stye={{flex:1}}>
                <ItemList key={rowId} {...rowData} navigator={navigator} isOperator={isOperator} switchPage={switchPage}  refreshCurrentPage={this._refreshCurrentPage} />
            </View>
        );
    }
    render(){
        const {url,title,orderid,result}=this.props
        return (
            <View style={{backgroundColor: '#fff', flex: 1,justifyContent:"flex-start"}}>
                {!orderid?<Text></Text>:result?<Text style={{fontSize:px2dp(30),color:"green",textAlign:"center"}} >抢单成功</Text>:<Text style={{fontSize:px2dp(30),color:"red",textAlign:"center"}} >抢单失败</Text>}
                <ItemContentPull
                    ref={(e)=>this.tbv = e}
                    renderRowCallback={(rowData, sectionId, rowId)=>this._renderRow(rowData, sectionId, rowId)}
                    networkParams={[url]}
                    title={title}
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