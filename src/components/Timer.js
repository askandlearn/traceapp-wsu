/*This is an Example of Timer/Stopwatch in React Native */
import React, {Component, useRef, useEffect} from 'react';
//import React in our project

import {StyleSheet, Animated, Text, View, TouchableOpacity} from 'react-native';
//import all the required components

import {Timer} from 'react-native-stopwatch-timer';
var Sound = require('react-native-sound');
//importing library to use Stopwatch and Timer

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      //Set at 3 seconds for prototype 2 presentation purposes
      timerDuration: 3000,
      //180000,
      resetTimer: false,
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  //sound = new Sound('../files/sound.mp3');

  startStopTimer() {
    this.setState({
      isTimerStart: !this.state.isTimerStart,
      resetTimer: false,
    });
  }
  resetTimer() {
    this.setState({isTimerStart: false, resetTimer: true});
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  playSound = () => {
    let sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else if ((this.isTimerStart = false)) {
        sound.pause();
      } else {
        sound.play(); // have to put the call to play() in the onload callback
      }
    });
  };
  handleTimerComplete = () => {
    this.playSound();
    this.setState({isTimerStart: false, resetTimer: true});
  };
  render() {
    return (
      <View style={styles.container}>
        <Timer
          totalDuration={this.state.timerDuration}
          secs
          start={this.state.isTimerStart}
          reset={this.state.resetTimer}
          options={options}
          handleFinish={this.handleTimerComplete}
          getTime={this.getFormattedTime}
        />
        <View style={{flexDirection: 'row', marginHorizontal: '15%'}}>
          <TouchableOpacity onPress={this.startStopTimer} style={styles.button}>
            <Text style={styles.buttonText}>
              {!this.state.isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetTimer} style={styles.button}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    //flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-1%',
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
    paddingVertical: 6,
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
