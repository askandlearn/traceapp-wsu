/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component,useRef, useEffect } from 'react';
//import React in our project

import { StyleSheet, Animated,Text, View, TouchableOpacity } from 'react-native';
//import all the required components

import { Stopwatch } from 'react-native-stopwatch-timer';

//importing library to use Stopwatch and Timer


export default class RTStopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    this.props.setIsStart(!this.state.stopwatchStart);
    // console.log(this.props.setIsStart);
  }
 
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    
    
    return (
        <View style={styles.container}>
            <Stopwatch laps 
            secs 
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}
            getTime={this.getFormattedTime} />
          <View style={{flexDirection:'row', marginHorizontal:'15%'}}>
          <TouchableOpacity onPress={this.toggleStopwatch} style={styles.button}>
            <Text style={styles.buttonText}>
            {!this.state.stopwatchStart ? "Start" : "Stop"}
            </Text>
          </TouchableOpacity>
          </View>
        </View> 
    );
  }
}

const handleTimerComplete = () => alert('Custom Completion Function');

const styles = {
  
    container: {
       //flex: 1,
        backgroundColor: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'-1%'
        //flexDirection:'row',
      },

      inputFields: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding: 10,
        fontWeight: 'bold',
        opacity: 0.4,
        borderRadius: 3,
      },
      title: {
        alignSelf: 'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color: '#202020',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 30,
      },
      button: {
        //alignSelf: 'center',
        //width: '60%',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 3,
        width: '40%',
        paddingVertical:6,
        borderRadius: 20,
        backgroundColor: '#ff2222',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
  
      NavBarDivider: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgray',
        marginVertical: 10,
      },
     
};

const options = {
  container: {
    //padding: 5,
    //borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000000',
   // marginLeft: 7,
  },
};