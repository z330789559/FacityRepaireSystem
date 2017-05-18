import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
export default class EditIconView extends Component {
  constructor(props) {
   super(props);
   this.state = {text: '',current:""};

 }
    setCurrentValue=(str)=>{
           this.setState({
            current:str
        })
        }
  render() {
    return (
      <View style={LoginStyles.TextInputView}>
          <TouchableOpacity onPress={this.props.press}>
          <Image  style={LoginStyles.logo} source={this.props.icon} />
              </TouchableOpacity>
       <TextInput style={LoginStyles.TextInput}
         placeholder={this.props.name}
                  keyboardType={'default'}
         onChangeText={
           (text) => {
             this.props.onChangeText(text);
           }
        }
       />
       </View>
    );
  }
}


const LoginStyles = StyleSheet.create({
  TextInputView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'#000000',
    flexDirection: 'row',
    justifyContent: 'center',
      alignItems: "flex-start",
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height:45,
      flex:3
  },
    logo: {
        width: 35,
        height: 35,
        flex:1,
        marginTop:10,
        marginRight: 1,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f5f5f5"
    }
});
