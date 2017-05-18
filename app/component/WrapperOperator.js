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
        ["我要维修", "ios-list-box-outline", "CreateOrder", <CreateOrder {...this.props}  selectTabs={this.selectTabs} />],
        ["订单状况", "logo-google", "HomeOperatorPage", <HomeOperatorPage {...this.props}  selectTabs={this.selectTabs}/>],
        // ["我要维修", "ios-compass-outline", "Discover", <Discover {...this.props}/>],
        
        ["我", "ios-contact-outline", "MyRepaire", <MyHomeRepaire   {...this.props} selectTabs={this.selectTabs}/>]
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
