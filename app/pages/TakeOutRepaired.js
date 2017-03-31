import React, { Component } from 'react'
import Config from '../config'

import ItemContent from "../component/ItemContent"
export default class TakeOutRepaired extends Component {
  constructor(props) {
    super(props)
  }
  render(){

    const  url=Config.domain+"/order/repairedorder"
    const title="我的维修记录"
    const  isOperator=false
    const {navigator}=this.props
    const {switchPage}=this.props
    return (
        <ItemContent url={url} title={title} isOperator={isOperator} navigator={navigator} switchPage={switchPage}/>
    )
  }
}