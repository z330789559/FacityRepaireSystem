/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import { Navigator, View,StatusBar, Platform } from 'react-native'

export default class Navigation extends Component{
    constructor(props){
      super(props)
    }
      
    render(){
               let {_component}=this.props;


        return Platform.OS == "ios"?(
          <Navigator
            initialRoute={{component:_component}}
            configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) => {
                  return <route.component   {...this.params} {...this.props} navigator={navigator}/>
                }
            }
          />
        ):(
          <View style={{flex: 1}}>
              <StatusBar
                  backgroundColor="#0398ff"
                  barStyle="light-content"
              />
            <Navigator
              initialRoute={{component:_component}}
              configureScene={() => Navigator.SceneConfigs.FloatFromRight}
              renderScene={(route, navigator) => {
                    return <route.component  {...route.params} {...this.props} navigator={navigator}/>
                  }
              }
            />
          </View>
        )
    }


}
