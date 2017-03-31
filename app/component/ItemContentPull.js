
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ListView,
    Animated
} from 'react-native';

import {PullList} from 'react-native-pull';
import NetUitl from '../util/NetUtil';
export default class extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.page=1;
        this.networkParams = props.networkParams;
        this.defaultPageItem =10; // 默认每一page能刷多少条，配合最后刷新
        this.canLoadMore = true;
        this.state = {
            marginDistance: new Animated.Value(0),
            dataSource: ds,
            theNetworkData: [],
            isLoadingMore: false,
        };
        this.renderRowCallback=this.props.renderRowCallback
        this.renderHeader = this.renderHeader.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        // this.loadMore();
    }

    onPullRelease=(resolve)=>{
     var _this=this;
        NetUitl.getJson(this.networkParams[0],{pageIndex:1}, (responseJson)=> {

            resolve();
            if (responseJson.orders.length > 0) {
                var temp = responseJson.orders;
                temp.push("");
                _this.setState({theNetworkData: temp});
            }
        })
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 500);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>当前PullList状态: pulling...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>当前PullList状态: pullok......</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>当前PullList状态: pullrelease......</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    style={{}}
                    onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                    renderHeader={this.renderHeader}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.theNetworkData)}
                    pageSize={10}
                    initialListSize={10}
                    renderRow={this._renderRow}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }

    renderHeader=()=>{
        const {title}=this.props
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
            </View>
        );
    }

    _renderRow=(rowData, sectionId, rowId)=>{
    
        if (rowId == this.state.theNetworkData.length - 1) {
            return (<ActivityIndicator style={{height: 100}} animating={this.state.isLoadingMore} color="black" />);
        }
        return this.renderRowCallback(rowData, sectionId, rowId);
    }

    renderFooter=()=>{
        if(!this.canLoadMore) {
            return null;
        }
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }
    _fetchData=(type,responseJson)=>{


        this.setState({isLoadingMore: false});

        if (responseJson != undefined && responseJson != null) {

            if (responseJson.orders.length > 0) {

                    var temp = this.state.theNetworkData;
                    temp.pop();
                    temp = temp.concat(responseJson.orders);
                    temp.push("");
                    this.setState({theNetworkData: temp});
                // console.warn(JSON.stringify(this.state.theNetworkData))
                if (responseJson.orders.length < this.defaultPageItem ) {
                    this.canLoadMore = false;

                }
                else {
                    this.page ++;
                    this.canLoadMore = true;
                }
            }
        }
        else {
            this.page --;
        }
    }
    loadMore=(type)=>{

            if (this.state.isLoadingMore == true || this.canLoadMore==false) {
                return;
            }

            this.setState({isLoadingMore: true});

        var body = null;

        NetUitl.getJson(this.networkParams[0],{pageIndex:this.page},this._fetchData.bind(this,type))
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
});
