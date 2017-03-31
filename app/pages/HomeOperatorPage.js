import React, { Component } from 'react'
import Config from '../config'

import ItemContent from "../component/ItemContent"
export default class HomeOperatorPage extends Component {
  constructor(props) {
    super(props)
  }
  render(){

    const  url=Config.domain+"/order/myorder"
    const title="我提报的维修"
    const  isOperator=true
    const {navigator}=this.props
    return (
        <ItemContent url={url} title={title} isOperator={isOperator} navigator={navigator} />
    )
  }
}