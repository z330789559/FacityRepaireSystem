/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import { Navigator, View,Text } from 'react-native'
import TabView from './TabViewContainer'
import MyHomeRepaire from '../pages/MyHomeRepaire'
import CreateOrder from '../pages/CreateOrder'
import HomeOperatorPage from '../pages/HomeOperatorPage'

export default class WrapperOperator extends Component{
    constructor(props){
      super(props)
        let { navigator } =this.props;
        this.selectTabs.bind(this)
    this.tabNames=[
        ["我要维修", "ios-list-box-outline", "CreateOrder", <CreateOrder navigator={navigator} selectTabs={this.selectTabs} {...this.props}/>],
        ["我的报修记录", "logo-google", "HomeOperatorPage", <HomeOperatorPage  navigator={navigator}  {...this.props}/>],
        // ["我要维修", "ios-compass-outline", "Discover", <Discover {...this.props}/>],
        
        ["我", "ios-contact-outline", "MyRepaire", <MyHomeRepaire navigator={navigator}  {...this.props}/>]
    ]
    }
    selectTabs=(index)=>{
        this.tabView.selectTabs(index);
    }

    render(){
       
        return(
                <View style={{flex: 1, justifyContent: 'flex-start',backgroundColor:'#fff'}}>
                 <TabView ref={(tabView)=>this.tabView=tabView} {...this.props} tabNames={this.tabNames} /></View>
        )


    }
   
}
