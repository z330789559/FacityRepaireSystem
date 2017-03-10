/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import { Navigator, View,Text } from 'react-native'
import TabView from './TabViewContainer'
import MyHomeRepaire from '../pages/MyHomeRepaire'
import HomeRepairePage from '../pages/HomeRepairePage'
import OrderRepaire from '../pages/OrderRepaire'

export default class Wrapper extends Component{
    constructor(props){
      super(props)
        let { navigator } =this.props;
        this.tabNames=[
            ["首页", "logo-google", "HomeRepairePage", <HomeRepairePage navigator={navigator} {...this.props} />],
            // ["我要维修", "ios-compass-outline", "Discover", <Discover {...this.props}/>],
            ["我的维修记录", "ios-list-box-outline", "OrderRepaire", <OrderRepaire  navigator={navigator} {...this.props} />],
            ["我", "ios-contact-outline", "MyRepaire", <MyHomeRepaire navigator={navigator} {...this.props}/>]
        ]
    }

    render(){
        
       
        return(

                <View style={{flex: 1, justifyContent: 'flex-start',backgroundColor:'#fff'}}>
                 <TabView ref={(tabView)=>{this.tabView=tabView}} {...this.props} tabNames={this.tabNames}/>
                </View>
        )


    }
   
}
