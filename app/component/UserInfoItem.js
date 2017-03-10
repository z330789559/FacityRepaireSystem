/**
 * Created by baozhong on 2017/3/7.
 */

import React, { Component, PropTypes } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableHighlight,
    AlertIOS,
    TouchableNativeFeedback
} from 'react-native'
import px2dp from '../util'

let {width, height} = Dimensions.get('window')
const itemHeight = px2dp(45)


export default class UserInfoItem extends Component{
    constructor(props){
        super(props)

    }
    static propTypes = {
        keyname:PropTypes.string
    }
    render(){
        const {keyname,name,first }=this.props;
        return(
            <View style={styles.listItem}>
                <View style={[styles.listInfo, {borderTopWidth:!first?1:0}]}>
                    <View style={{flex: 1}}><Text>{keyname}</Text></View>
                    <View style={styles.listInfoRight}>
                        <Text style={{color: "#aaa", fontSize:12}}>{name}</Text>
                    </View>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    listItem: {
        height: itemHeight,
        paddingLeft: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button:{
        height: itemHeight,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    listInfo: {
        height: itemHeight,
        flex: 1,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopColor: "#f5f5f5"
    },
    listInfoRight: {
        flexDirection: "row",
        alignItems: "center"
    }
})