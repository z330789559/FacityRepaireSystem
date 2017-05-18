import React, { Component } from 'react'
import Config from '../config'
import {View,Text} from 'react-native'
import ItemContent from "../component/ItemContent"
import NavBar from '../component/NavBar'

export default class HomeRepairePage extends Component {
  constructor(props) {
    super(props)
    
  }
  
  render(){
    const  url=Config.domain+"/order/repairingorder"
    const title="我抢到的单子"
    const  isOperator=false
    const {navigator,orderid,grap}=this.props
    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
          <NavBar
              title="我抢到的单子"/>
        <ItemContent {...this.props} url={url} title={title} isOperator={isOperator} result={grap}  />
          </View>
    )
  }
}