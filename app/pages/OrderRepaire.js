/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import NavBar from '../component/NavBar'

import TabViewBar from '../component/TabViewBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TakeOutRepairable from './TakeOutRepairable'
import TakeOutRepaired from './TakeOutRepaired'
import TakeOutRepairing from './TakeOutRepairing'
export default class OrderRepaire extends Component {
  constructor(props){
      super(props)
  }
    switchPage=(index)=>{
        this.scrollableTabView.goToPage(index)
    }

  render(){
      const {navigator} =this.props
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar title="订单"/>
        <ScrollableTabView   ref={(scrollableTabView)=>{this.scrollableTabView=scrollableTabView}} renderTabBar={() => <TabViewBar/> }>
          <TakeOutRepairable tabLabel="接单" switchPage={this.switchPage} navigator={navigator}/>
            <TakeOutRepairing tabLabel="维修中"  switchPage={this.switchPage} navigator={navigator}/>
          <TakeOutRepaired tabLabel="维修结果" switchPage={this.switchPage} navigator={navigator}/>
        </ScrollableTabView>
      </View>
    )
  }
}
