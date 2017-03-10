/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import { Navigator, View,Text } from 'react-native'

export default class WrapperLogin extends Component{
    constructor(props){
      super(props)

    }
    render(){

       
        return(

                <View style={{flex: 1, justifyContent: 'flex-start',backgroundColor:'#fff'}}>
                  <Text>未登陆</Text>
                </View>
        )


    }
   
}
