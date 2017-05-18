import React, { Component } from 'react'
import Config from '../config'

import ItemContent from "../component/ItemContent"
export default class TakeOutRepairable extends Component {
  constructor(props) {
    super(props)
      
  }
  render(){

     const  url=Config.domain+"/order/acceptableOrder"
     const title="所有可维修的单子"
     const  isOperator=false
    return (
        <ItemContent  {...this.props}  url={url} title={title} isOperator={isOperator}/>
    )
  }
}