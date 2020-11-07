/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component,useRef, useState } from 'react';
//import React in our project

import { StyleSheet, Animated,Text, View, TouchableOpacity } from 'react-native';
//import all the required components

import { Timer } from 'react-native-stopwatch-timer';
var Sound = require('react-native-sound');
//importing library to use Stopwatch and Timer


export default Time = (props) =>  {
  

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isTimerStart: false,
  //     //Set at 3 seconds for prototype 2 presentation purposes
  //     timerDuration: 18000,
  //     resetTimer: false,
  //   };
  //   this.startStopTimer = this.startStopTimer.bind(this);
  //   this.resetTimer = this.resetTimer.bind(this);
  // }

  // //sound = new Sound('../files/sound.mp3');

  // startStopTimer() {
  //   this.setState({
  //     isTimerStart: !this.state.isTimerStart,
  //     resetTimer: false,
  //   });
  // }
  // resetTimer() {
  //   this.setState({ isTimerStart: false, resetTimer: true });
  // }

  // getFormattedTime(time) {
  //   this.currentTime = time;
  // }

  // playSound=()=>{
  //   let sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //         console.log('failed to load the sound', error);
  //     } 
  //     else if(isTimerStart=false){
  //       sound.pause();
  //     }
  //     else {
  //       sound.play(); // have to put the call to play() in the onload callback
  //   }
  // });

  // }
  //  handleTimerComplete = () => {
  //    this.playSound();
  //    this.setState({ isTimerStart: false, resetTimer: true });

  //   };

  const [isTimerStart, setIsTimerStart] = useState(false)
  const [timerDuration, setTimerDuration] = useState(5000)
  const [resetTimer, setResetTimer] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const toggleTimer = () => {
    setIsTimerStart(!isTimerStart)
    setResetTimer(false)
  }

  const resetTimerFunction = () => {
    setIsTimerStart(false)
    setResetTimer(true)
    setIsDone(false)
  }

  //sound 
  const playSound = () => {
    let sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } 
      else if(isTimerStart ){
        sound.pause();
      }
      else {
        sound.play(); // have to put the call to play() in the onload callback
      }
    });
  }

  const handleTimerComplete = () => {
    playSound();
    setIsTimerStart(false)
    setIsDone(true)
    // setResetTimer(true)
  }


  return (
      <View
        style={styles.container}>
        <Timer
          totalDuration={timerDuration}
          secs
          start={isTimerStart}
          reset={resetTimer}
          options={options}
          handleFinish={handleTimerComplete}
          // getTime={getFormattedTime}
          
        />
        <View style={{flexDirection:'row', marginHorizontal:'15%'}}>
        <TouchableOpacity onPress={toggleTimer} style={isDone ? styles.doneColor:styles.button } disabled={isDone}>
          <Text style={styles.buttonText}>
            {!isTimerStart ? 'START' : 'STOP'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress= {resetTimerFunction } style={styles.button}>             
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
        
        </View>
        
      </View> 
  );
}



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
   doneColor: {
     backgroundColor: 'gray',
     alignItems: 'center',
     marginHorizontal: '10%',
     marginVertical: 3,
     width: '40%',
     paddingVertical:6,
     borderRadius: 20,
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