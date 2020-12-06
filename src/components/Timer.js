// /*This is an Example of Timer/Stopwatch in React Native */
//import React, { Component,useRef, useState, useEffect } from 'react';
//import React in our project

//import all the required components

//import {Timer} from 'react-native-stopwatch-timer';
//var Sound = require('react-native-sound');
//importing library to use Stopwatch and Timer


// const Time = (props) =>  {

//   const [isTimerStart, setIsTimerStart] = useState(false)
//   const [timerDuration, setTimerDuration] = useState(10000)
//   const [resetTimer, setResetTimer] = useState(false)
//   const [isDone, setIsDone] = useState(false)

//   const toggleTimer = () => {
//     setIsTimerStart(!isTimerStart)
//     setResetTimer(false)
//     props?.setStarted(true)
//   }

//   const resetTimerFunction = () => {
//     setIsTimerStart(false)
//     setResetTimer(true)
//     setIsDone(false)

//     //set started state in parent back to false
//     props?.setStarted(false)
//     props?.setDone(false)
//   }

//   //sound 
//   const playSound = () => {
//     let sound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
//       if (error) {
//         console.log('failed to load the sound', error);
//       } 
//       else if(isTimerStart ){
//         sound.pause();
//       } else {
//         sound.play(); // have to put the call to play() in the onload callback
//       }
//     });
//   }

//   const handleTimerComplete = () => {
//     playSound();
//     setIsTimerStart(false)
//     setIsDone(true)
    
//     //set done state in parent to true
//     props?.setDone(true)
//     // setResetTimer(true)
//   }


//   return (
//       <View
//         style={styles.container}>
//         <Timer
//           totalDuration={timerDuration}
//           secs
//           start={isTimerStart}
//           reset={resetTimer}
//           options={options}
//           handleFinish={handleTimerComplete}
//           // getTime={getFormattedTime}
          
//         />
//         <View style={{flexDirection:'row', marginHorizontal:'15%'}}>
//         <TouchableOpacity onPress={toggleTimer} style={isDone ? styles.doneColor:styles.button } disabled={isDone}>
//           <Text style={styles.buttonText}>
//             {!isTimerStart ? 'START' : 'STOP'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress= {resetTimerFunction } style={styles.button}>             
//           <Text style={styles.buttonText}>RESET</Text>
//         </TouchableOpacity>
        
//         </View>
        
//       </View> 
//   );
// }

// const styles = {
//   container: {
//     //flex: 1,
//      backgroundColor: '#ffffff',
//      justifyContent:'center',
//      alignItems:'center',
//      marginBottom:'-1%'
//      //flexDirection:'row',
//    },

//    inputFields: {
//      backgroundColor: '#FFFFFF',
//      marginHorizontal: '10%',
//      marginVertical: 10,
//      padding: 10,
//      fontWeight: 'bold',
//      opacity: 0.4,
//      borderRadius: 3,
//    },
//    title: {
//      alignSelf: 'center',
//      marginHorizontal: '10%',
//      marginVertical: 10,
//      color: '#202020',
//      fontWeight: 'bold',
//      fontSize: 30,
//      paddingBottom: 30,
//    },
//    button: {
//      //alignSelf: 'center',
//      //width: '60%',
//      alignItems: 'center',
//      marginHorizontal: '10%',
//      marginVertical: 3,
//      width: '40%',
//      paddingVertical:6,
//      borderRadius: 20,
//      backgroundColor: '#ff2222',
//      shadowColor: '#000000',
//      shadowOffset: {width: 0, height: 2},
//      shadowOpacity: 0.8,
//      shadowRadius: 2,
//      elevation: 1,
//    },
//    doneColor: {
//      backgroundColor: 'gray',
//      alignItems: 'center',
//      marginHorizontal: '10%',
//      marginVertical: 3,
//      width: '40%',
//      paddingVertical:6,
//      borderRadius: 20,
//      shadowColor: '#000000',
//      shadowOffset: {width: 0, height: 2},
//      shadowOpacity: 0.8,
//      shadowRadius: 2,
//      elevation: 1,
//    },
//    buttonText: {
//      color: '#FFFFFF',
//      fontWeight: 'bold',
//    },
//    header: {
//      width: '100%',
//      height: 60,
//      flexDirection: 'row',
//      justifyContent: 'space-between',
//      alignItems: 'center',
//      paddingHorizontal: 20,
//    },

//    NavBarDivider: {
//      height: 1,
//      width: '100%',
//      backgroundColor: 'lightgray',
//      marginVertical: 10,
//    },
  
// };

// const options = {
// container: {
//  //padding: 5,
//  //borderRadius: 5,
//  width: '40%',
//  alignItems: 'center',
// },
// text: {
//  fontSize: 30,
//  color: '#000000',
// // marginLeft: 7,
// },
// };

// export default Time;
//const {useState, useEffect} = React;
//Refactor
import React, { Component, useState } from 'react'

import {StyleSheet, Animated, Text, View, Button} from 'react-native';
const Timer = () => {
    
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const [startDisabled, setStartDisabled] = useState(true);
    const [stopDisabled, setStopDisabled] = useState(false);
    const[timer, setTimer] = useState(null);

    
   /* constructor( props ) {
      super( props );

      this.onButtonStart = this.onButtonStart.bind(this);
      this.onButtonStop = this.onButtonStop.bind(this);
      this.onButtonClear = this.onButtonClear.bind(this);
      this.start = this.start.bind(this);
  }*/

    const start = () => {
      var tempSeconds = seconds;
      var tempMinutes = minutes;
      let timer = setInterval(() => {
           

            if (tempSeconds > 0) {
                console.log("thing");
                tempSeconds = tempSeconds - 1
                setSeconds(tempSeconds);             
            }
            if (tempSeconds === 0) {
                if (tempMinutes === 0) {
                    clearInterval(timer)
                } else {
                    tempMinutes = tempMinutes - 1;
                    tempSeconds = 59;
                    setMinutes(tempMinutes);
                    setSeconds(tempSeconds);
                }
            } 
        }, 1000);
        setTimer(timer);
    }

    const onButtonStart = () => {
      start();
      setStartDisabled(true);
      setStopDisabled(false);
    }

    const onButtonStop = () => {
        clearInterval(timer);
        setStartDisabled(false);
        setStopDisabled(true);    
        setMinutes(3);
        setSeconds(0);
      }

    return (
        <View>
            <Text style={{justifyContent:'center', alignSelf:'center'}}>
            { minutes === 0 && seconds === 0
                ? <Text>Busted!</Text>
                : <Text>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
            }
            </Text>
            <Button title="Start"  onPress={()=>onButtonStart()}></Button>
            <Button title="Stop" onPress={()=>onButtonStop()}></Button>
        </View>
    )
}

export default Timer;
