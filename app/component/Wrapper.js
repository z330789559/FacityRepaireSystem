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
        const { navigator,grap,orderid} =this.props;
       
        this.tabNames=[
            ["首页", "logo-google", "HomeRepairePage", <HomeRepairePage  {...this.props}  selectTabs={this.selectTabs}/>],
            // ["我要维修", "ios-compass-outline", "Discover", <Discover {...this.props}/>],
            ["我的维修记录", "ios-list-box-outline", "OrderRepaire", <OrderRepaire  {...this.props}  selectTabs={this.selectTabs} />],
            ["我", "ios-contact-outline", "MyRepaire", <MyHomeRepaire {...this.props}  selectTabs={this.selectTabs} />]
        ]

    }
    selectTabs=(index)=>{
        this.tabView.selectTabs(index);
    }

    render(){
        return(

                <View style={{flex: 1, justifyContent: 'flex-start',backgroundColor:'#fff'}}>
                 <TabView ref={(tabView)=>{this.tabView=tabView}} {...this.props}  tabNames={this.tabNames}/>
                </View>
        )


    }

   
}
