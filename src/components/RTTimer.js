import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  BackgroundImage,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';
import RTTimer from '../components/RTTimer';
import RTData from '../components/RTData';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
//import SensorAlert from '../components/ConnectToSensorAlert';
import Swiper from 'react-native-swiper';
import Plot from '../components/RTPlot';

import {connect} from 'react-redux';
import { onDisconnect, stopTransaction, updateMetric , updateRecordings} from '../actions';
import { sleep } from '../utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../contexts/UserContext';
import { Timer } from 'react-native-stopwatch-timer';

//require module
var RNFS = require('react-native-fs');

var check = true;

const serviceUUID = '0000f80d-0000-1000-8000-00805f9b34fb'
//transaction id for monitoring data
const transactionID = 'monitor_metrics'

const mapStateToProps = state => ({
  pnn50: state.DATA['pnn50'],
  hrv: state.DATA['hrv'],
  connectedDevice: state.BLE['connectedDevice'],
  metrics: state.BLE['metrics'], //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
  recordings: state.BLE['recordings']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
  addRecording: (username) => dispatch(updateRecordings(username))
})

const RealTimeScreen = (props) => {

  var path = RNFS.DocumentDirectoryPath + '/test.txt';

  const user = useContext(UserContext);

  const [content,setContent] = useState()

  const [timer, setTimer]=useState(null);
    const [counter, setCounter]=useState('00');
    const [miliseconds, setMiliseconds]=useState('00');
    const [minutes, setMinutes]=useState('00');
    const [hours, setHours]=useState('00');
    const [startDisabled, setStartDisabled]=useState(true);
    const [stopDisabled, setStopDisabled]=useState(false);

  const read = () => {
    //read the file
    console.log('PATHFILE:',path)
    RNFS.readFile(path).then(res => {
      console.log("FILE READ SUCCESSFULLY")
      setContent(res)
    }).catch(err => {
      console.log(err.message,err.code)
    })
  }

  var interval;
  const onStart = async () => {

    props.updateMetric();

  }

  const onStop = async () => {
    console.log('Cancelling transaction...')
    props.stopTransaction(transactionID);
  
  }

  const pressed = () => {
    props.addRecording(user.username)
  }
  
    


 
    // this.onButtonStop = this.onButtonStop.bind(this);
    // this.onButtonClear = this.onButtonClear.bind(this);
    // this.start = this.start.bind(this);

// const [num, setNum]= useState();
// const [count, setCount]= useState();
// const [minute, setMinute]=useState();
// const [hour, setHour]= useState();
start=()=> {

    let timer = setInterval(() => {
      //console.log("Interval running")
        var num = (Number(miliseconds) + 1).toString(),
            count = counter,
            minute=minutes,
            hour=hours;
        //To be tested below 
        if( Number(miliseconds) == 59 ) { 
            count = (Number(counter) + 1).toString();
            num = '00';
        }
        else if(Number(counter) == 59 ){
          minute= (Number(minutes) + 1).toString();
          num = '00';
          count='00';
        }
        else if (Number(minutes) == 3 ){
          hour= (Number(hours) + 1).toString();
          minute='00';
          num = '00';
          count='00';
          
        }
       console.log("Test before conditions", hours, minutes, miliseconds, counter);
       
        count.length == 1 ? setCounter('0'+count):setCounter(count);
        num.length == 1 ? setMiliseconds('0'+num): setMiliseconds(num);
        minute.length==1? setMinutes('0'+minute):setMinutes(minute);
        hour.length==1?setHours('0'+hour):setHours(hours);
        console.log("Test after conditions", hours, minutes, miliseconds, counter);
    }, 0);
    //this.setState({timer});
    setTimer(timer);
}
onButtonStart=()=> {
    start();
    setStartDisabled(true);
    setStopDisabled(false);
}
onButtonStop=()=> {
    clearInterval(timer);
    setStartDisabled(false);
    setStopDisabled(true);
}
onButtonClear=()=>{
   
        setTimer(null);
        setCounter('00');
        setMiliseconds('00');
        setMinutes('00');
        setHours('00');
 
}


  

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <ScrollView>
         <Header openDrawer={props.navigation.openDrawer} />
         <Text style={styles.title}>Real-Time Data</Text>
         {/* <Button
         title='Show Value'
         onPress={() => console.log(isStart)}/> */}
        {/* <RTTimer></RTTimer> */}
        <Text style={{justifyContent:'center', alignSelf:'center'}}>
                   {hours}:{minutes}:
                   {counter}</Text>
                
                    <Button title="Start"  onPress={()=>onButtonStart()}></Button>
                    <Button title="Stop" onPress={()=>onButtonStop()}></Button>
                    <Button title="Clear" onPress={()=>onButtonClear()}></Button>
        <TouchableOpacity style={styles.button} onPress={() => onStart()}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onStop()}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity> 
    {/* sendData={this.testTimer} */}
        <View style={styles.NavBarDivider}/>
        {/* <Swiper style={styles.wrapper} showsButtons loop={false} autoplay={false}> */}
        <View testID="Data" style={styles.wrapper}>
          {/* <Text style={styles.slideTitles}>Biometric Data by Numbers</Text> */}
          <RTData></RTData>
        </View>

      </ScrollView> 
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (RealTimeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  //   valueContainer:{
  //     marginVertical:'-2%',
  //     backgroundColor: '#ffffff',
  //     alignContent:'center',
  //   },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
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
    //marginHorizontal: '10%',
    marginVertical: 4,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    textAlign: 'center',
  },
  valueTitle: {
    fontWeight: 'bold',
    marginHorizontal: '8.5%',
    marginTop: '3%',
    width: 80,
    height: 25,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    //resizeMode: 'stretch',
    paddingHorizontal: 8,
  },
  valueButton: {
    alignItems: 'center',
    // alignContent:'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginBottom: '1%',
    borderRadius: 65,
    borderWidth: 1,
    width: 65,
    height: 65,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  valueText: {
    color: '#000000',
    //fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical:10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: '#ffffff',
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
  ASTfigure: {
    width: 210,
    height: 214,
    alignSelf: 'center',
    marginBottom: 20,
  },
  NavBarDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  wrapper: {
     height:600,
     backgroundColor:'#ffffff', 
   },
   slide1: {
     height:'100%',
     paddingHorizontal:'10%',
     justifyContent: 'center',
     alignItems: 'center',
     color: '#000000',
     fontSize: 20,
   },
   slideTitles:{
    alignSelf: 'center',
    //marginHorizontal: '10%',
    //marginVertical: 50,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
   },
   slide2: {
    // flex: 1,
     height:'100%',
     //justifyContent: 'center',
     paddingVertical:'10%',
     paddingHorizontal:'10%',
     alignItems: 'center',
    
     //backgroundColor: '#97CAE5'
   },

  steps: {
    color: '#000000',
    fontSize: 15,
  },
  centeredView: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
