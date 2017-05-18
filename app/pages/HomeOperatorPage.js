import React, { Component } from 'react'
import Config from '../config'
import NavBar from '../component/NavBar'
import ItemContent from "../component/ItemContent"
import {
    View
} from 'react-native';
export default class HomeOperatorPage extends Component {
  constructor(props) {
    super(props)
  }
  render(){

    const  url=Config.domain+"/order/myorder"
    const title="我提报的维修";
    const  isOperator=true;

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
          <NavBar
              title="我提报的维修"/>
        <ItemContent url={url} title={title} isOperator={isOperator}  {...this.props} />
          </View>
    )
  }
}