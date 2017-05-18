/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
    DeviceEventEmitter
} from 'react-native';

import RootApp from './app/root';
import GrapOrder from './app/pages/GrapOrder'

AppRegistry.registerComponent('FacityRepaireSystem', () => RootApp);
AppRegistry.registerComponent('GrapOderActivity', () => GrapOrder);
