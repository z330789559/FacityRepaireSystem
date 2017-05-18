import React, { Component } from 'react'
import Config from '../config'

import ItemContent from "../component/ItemContent"
export default class TakeOutRepairing extends Component {
  constructor(props) {
    super(props)
  }
  render(){

    const  url=Config.domain+"/order/repairingorder"
    const title="我正在维修的单子"
    const  isOperator=false
    return (
        <ItemContent  {...this.props} url={url} title={title} isOperator={isOperator}  />
    )
  }
}