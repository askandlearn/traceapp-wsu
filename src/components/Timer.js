import React, { Component, useState } from 'react'

import {StyleSheet, Animated, Text, View, Button} from 'react-native';
const Timer = () => {
    
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const [startDisabled, setStartDisabled] = useState(true);
    const [stopDisabled, setStopDisabled] = useState(false);
    const[timer, setTimer] = useState(null);


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
