import React, {Component} from 'react';
import DropDownMenu from 'react-native-dropdown-menu';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';

  export default class HealthGoals extends Component{

    constructor(){
        super();
        this.state = {
            text: ''
        };
    }

    render(){
        //var height = [[feet], [inches]];
        var height = [["1", "2", "3", "4", "5", "6", "7", "8", "9","10"], ["1", "2", "3", "4", "5", "6", "7", "8", "9","10", "11"]];
        return(
            <View style={{flex: 1}}>
                <View style={{height: 30, width: 50}}/>
                <DropDownMenu style={{flex:1}}
                bgColor={'#fafafa'}
                tintColor={'#000000'}
                handler={(selection, row)=> this.setState({text: height[selection][row]})}
                data={height}/>

            </View>
        )
    }



  }
  const styles = StyleSheet.create({
    container: {
      height: '95%',
      alignItems: 'center',
      backgroundColor: '#Ffffff',
      //maxWidth:'105%'
    }
  

  });