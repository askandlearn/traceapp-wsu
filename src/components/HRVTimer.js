// /*This is an Example of Timer/Stopwatch in React Native */
// import React, { Component,useRef, useEffect } from 'react';
// //import React in our project

// import { StyleSheet, Animated,Text, View, TouchableOpacity } from 'react-native';
// //import all the required components

// import { Stopwatch } from 'react-native-stopwatch-timer';

// //importing library to use Stopwatch and Timer


// export default class HRVStopwatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stopwatchStart: false,
//       stopwatchReset: false,
//     };
//     this.toggleStopwatch = this.toggleStopwatch.bind(this);
//     this.resetStopwatch = this.resetStopwatch.bind(this);
//   }
//   toggleStopwatch() {
//     this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
//   }
 
//   resetStopwatch() {
//     this.setState({stopwatchStart: false, stopwatchReset: true});
//   }
//   getFormattedTime(time) {
//     this.currentTime = time;
//   }

//   render() {
    
    
//     return (
//         <View style={styles.container}>
//             <Stopwatch laps 
//             secs 
//             start={this.state.stopwatchStart}
//             reset={this.state.stopwatchReset}
//             options={options}
//             getTime={this.getFormattedTime} />
//           <View style={{flexDirection:'row', marginHorizontal:'15%'}}>
//           <TouchableOpacity onPress={this.toggleStopwatch} style={styles.button}>
//             <Text style={styles.buttonText}>
//             {!this.state.stopwatchStart ? "Start" : "Stop"}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress= {this.resetStopwatch }style={styles.button}>             
//             <Text style={styles.buttonText}>RESET</Text>
//           </TouchableOpacity>
//           </View>
//         </View> 
//     );
//   }
// }

// const handleTimerComplete = () => alert('Custom Completion Function');

// const styles = {
  
//     container: {
//        //flex: 1,
//         backgroundColor: '#ffffff',
//         justifyContent:'center',
//         alignItems:'center',
//         marginBottom:'-1%'
//         //flexDirection:'row',
//       },

//       inputFields: {
//         backgroundColor: '#FFFFFF',
//         marginHorizontal: '10%',
//         marginVertical: 10,
//         padding: 10,
//         fontWeight: 'bold',
//         opacity: 0.4,
//         borderRadius: 3,
//       },
//       title: {
//         alignSelf: 'center',
//         marginHorizontal: '10%',
//         marginVertical: 10,
//         color: '#202020',
//         fontWeight: 'bold',
//         fontSize: 30,
//         paddingBottom: 30,
//       },
//       button: {
//         //alignSelf: 'center',
//         //width: '60%',
//         alignItems: 'center',
//         marginHorizontal: '10%',
//         marginVertical: 3,
//         width: '40%',
//         paddingVertical:6,
//         borderRadius: 20,
//         backgroundColor: '#ff2222',
//         shadowColor: '#000000',
//         shadowOffset: {width: 0, height: 2},
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 1,
//       },
//       buttonText: {
//         color: '#FFFFFF',
//         fontWeight: 'bold',
//       },
//       header: {
//         width: '100%',
//         height: 60,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//       },
  
//       NavBarDivider: {
//         height: 1,
//         width: '100%',
//         backgroundColor: 'lightgray',
//         marginVertical: 10,
//       },
     
// };

// const options = {
//   container: {
//     //padding: 5,
//     //borderRadius: 5,
//     width: '40%',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 30,
//     color: '#000000',
//    // marginLeft: 7,
//   },
// };
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';

class StopWatch extends Component {

    state = {
        timer: null,
        counter: '00',
        miliseconds: '00',
        minutes:'00',
        hours:'00',
        startDisabled: true,
        stopDisabled: false
    }


    constructor( props ) {
        super( props );

        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
        this.onButtonClear = this.onButtonClear.bind(this);
        this.start = this.start.bind(this);
    }
  
    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter,
                minute=this.state.minutes,
                hour=this.state.hours;
            //To be tested below 
            if( Number(this.state.miliseconds) == 59 ) { 
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }
            else if(Number(this.state.counter) == 5 ){
              minute= (Number(this.state.minutes) + 1).toString();
              num = '00';
              count='00';
            }
            else if (Number(this.state.minutes) == 3 ){
              hour= (Number(this.state.hours) + 1).toString();
              minute='00';
              num = '00';
              count='00';
            }
            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num,
                minutes: minute.length==1?'0'+minute : minute,
                hours: hour.length==1?'0'+hour : hour,

            });
        }, 0);
        this.setState({timer});
    }
    onButtonStart() {
        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }
    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }
    onButtonClear() {
        this.setState({
            timer: null,
            counter: '00',
            miliseconds: '00',
            minutes:'00',
            hours: '00'
        });
    }
    render() {
        return(
            <View>

                 <Text style={{justifyContent:'center', alignSelf:'center'}}>
                   {this.state.hours}:{this.state.minutes}:
                   {this.state.counter}</Text>
                
                    <Button title="Start"  onPress={()=>this.onButtonStart()}></Button>
                    <Button title="Stop" onPress={()=>this.onButtonStop()}></Button>
                    <Button title="Clear" onPress={()=>this.onButtonClear()}></Button>
            </View>
            
        );
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    counter: {
      fontSize: 60,
      textAlign: 'center',
      height: 60,
      margin: 10,
    },
    miniCounter: {
        fontSize:20,
        position: 'relative',
        top: -32,
        right: -50
    }
});


module.exports = StopWatch;