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
  TextInput,
} from 'react-native';
import Header from '../components/Header-Component';
import RTData from '../components/RTData';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Swiper from 'react-native-swiper';
import Plot from '../components/RTPlot';

import {connect} from 'react-redux';
import { onDisconnect, stopTransaction, updateMetric , updateRecordings} from '../actions';
import { sleep } from '../utils/sleep';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { usePrevious } from '../hooks/usePrevious';
import ModalComponent from '../components/Modal-Component';

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
  recordings: state.BLE['recordings'],
  isConnected : state.BLE['isConnected'],
  busy: state.BLE['busy']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: (timeout, label) => dispatch(updateMetric(timeout, label)),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

const RealTimeScreen = (props) => {
  //Toast for when the device disconnects
  const {isConnected} = props
  const prev = usePrevious(isConnected)
  
  useEffect(() => {
    function showToast(){
      if(prev === true && isConnected === false){
        Toast.showWithGravity('Device has disconnected. Attempting to reconnect...', Toast.LONG, Toast.BOTTOM);
      }
    }

    showToast()
  }, [isConnected])
  //End Toast


  const user = useContext(UserContext)

  const onStart = async () => {
    props.updateMetric(undefined, 'RT');

  }

  const onStop = async () => {
    console.log('Cancelling transaction...')
    props.stopTransaction(transactionID);
    setVisible(true)
  }
  const [visible, setVisible] = useState(false)

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer}/>
      <ModalComponent visible={visible} setVisible={setVisible}/>
      <Text style={styles.title}>Real-Time Data</Text>
      <KeyboardAvoidingScrollView style={styles.bodyMain}>
        <TouchableOpacity style={[styles.button, {backgroundColor: props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStart()} disabled={props.busy}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: !isConnected || !props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStop()} disabled={!isConnected || !props.busy}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity> 
        <View testID="Data" style={styles.wrapper}>
          <RTData></RTData>
        </View>   
      </KeyboardAvoidingScrollView> 
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (RealTimeScreen);

const styles = StyleSheet.create({
  bodyMain:{
    marginTop:35,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    // ...Platform.select({
    //   ios: {paddingTop: 50},
    // }),
  },
  //   valueContainer:{
  //     marginVertical:'-2%',
  //     backgroundColor: '#ffffff',
  //     alignContent:'center',
  //   },

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
    //marginVertical: 4,
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 35,
    //paddingBottom: ,
   // paddingLeft:15,
    marginTop:25,
    paddingTop:65,
   
    //textAlign:'center',
    shadowColor: '#000000',
    shadowOffset: {width: .5, height: 1},
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
    ...Platform.select({
      ios: {
        fontFamily: 
        //'CourierNewPS-BoldMT'
        'AppleSDGothicNeo-Bold'
      },
    }),
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
