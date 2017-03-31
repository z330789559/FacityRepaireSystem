import React, { Component } from 'react'
import Config from '../config'
import {View,Text} from 'react-native'
import ItemContent from "../component/ItemContent"
export default class HomeRepairePage extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const  url=Config.domain+"/order/allorder"
    const title="所有单子"
    const  isOperator=false
    const {navigator}=this.props
    return (
        <ItemContent url={url} title={title} isOperator={isOperator}  navigator={navigator}/>
    )
  }
}