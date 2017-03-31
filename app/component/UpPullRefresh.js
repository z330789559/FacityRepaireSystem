
import React, { Component } from 'react'
import {
    View,
    Image,
    ScrollView,
    ListView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Animated,
    Easing,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import NetUitl from '../util/NetUtil';
export default class UpPullRefresh extends Component {
    constructor(props) {
        super(props);
        this.renderRowCallback = props.renderRowCallback;
        this.networkParams = props.networkParams;
        this.defaultPageItem = props.defaultPageItem; // 默认每一page能刷多少条，配合最后刷新
        this.canLoadMore = true;

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            marginDistance: new Animated.Value(0),
            dataSource: ds,
            theNetworkData: [],
            isLoadingMore: false,
            isRefreshing:false
        };
    }
    getData() {
        return this.state.theNetworkData;
    }
    _onRefresh(refresh) {

        this._getRecord(1, refresh);
    }
    _onLoadMore=()=>{
        this.setState({
            isRefreshing : true
        })
        NetUitl.getJson(this.networkParams[0],{pageIndex:1}, (responseJson)=> {
            this.setState({
                isRefreshing:false
            }) 
            if (responseJson.orders.length > 0) {
                var temp = responseJson.orders;
                temp.push("");
                this.setState({theNetworkData: temp});
            }
        })
    }
    _onEndReached(event) {
        if (this.tbvOffsetY > 5 && this.canLoadMore == true) {
            this._getRecord(2,null);
        }
    }
    _fetchData(type,refresh,responseJson){


            this.setState({isLoadingMore: false});

        if (responseJson != undefined && responseJson != null) {
            if (responseJson.orders.length > 0) {
                if (type == 1) {
                    var temp = responseJson.orders;
                    temp.push("");
                    this.setState({theNetworkData: temp});
                }
                else {
                    var temp = this.state.theNetworkData;
                    temp.pop();
                    temp = temp.concat(responseJson.orders);
                    temp.push("");
                    this.setState({theNetworkData: temp});
                }
                if (responseJson.orders.length < this.defaultPageItem ) {
                    this.canLoadMore = false;
                }
                else {
                    this.canLoadMore = true;
                }
            }
        }
        else {
            this.page --;
        }
    }
    _getRecord(type, refresh) {
        if (type == 1) {
            this.page = 1;
        }
        else {
            if (this.state.isLoadingMore == true) {
                return;
            }
            this.page ++;
            this.setState({isLoadingMore: true});
        }
        var body = null;
        NetUitl.getJson(this.networkParams[0],{pageIndex:this.page},this._fetchData.bind(this,type,refresh))
        // setTimeout(function () {
        //     fetch(this.networkParams[0]+"pageIndex="+this.page)
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //
        //         })
        //         .catch((error) => {
        //             // this.page --;
        //             // if (refresh != null) {
        //             //     refresh.onRefreshEnd();
        //             // }
        //             // else {
        //             //     Public.hideHUD();
        //             // }
        //             // if (type == 2) {
        //             //     this.setState({isLoadingMore: false});
        //             // }
        //         });
        // }.bind(this), 1000);
    }
    _renderRow(rowData, sectionId, rowId) {
        if (rowId == this.state.theNetworkData.length - 1) {
            return (<ActivityIndicator style={{height: 100}} animating={this.state.isLoadingMore} color="black" />);
        }
        return this.renderRowCallback(rowData, sectionId, rowId);
    }


    render() {
        return(
            <ListView
                ref={(ref) => this.tbv = ref}
            //     refreshControl={
            //   <RefreshControl
            //    refreshing={this.state.isRefreshing}
            //     onRefresh={this._onLoadMore}
            //     colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
            //    progressBackgroundColor="#ffffff"
            //   />
            // }

            renderScrollComponent={(props) => <PullRefreshScrollView  onRefresh={(PullRefresh)=>this._onRefresh(PullRefresh)} {...props}     />}
                dataSource={this.state.dataSource.cloneWithRows(this.state.theNetworkData)}
                renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, sectionId, rowId)}
                onEndReachedThreshold={200}
                scrollEventThrottle={200}
                onScroll={(event)=>this.tbvOffsetY = event.nativeEvent.contentOffset.y}
                onEndReached={(event)=>this._onEndReached(event)}
                enableEmptySections = {true}
                automaticallyAdjustContentInsets = {false}
                showsVerticalScrollIndicator = {false}

            >
            </ListView>
        );
    }
}
