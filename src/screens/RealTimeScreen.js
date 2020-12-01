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
  isConnected : state.BLE['isConnected']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
  addRecording: (username) => dispatch(updateRecordings(username))
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
  const [content,setContent] = useState()
  var path = RNFS.DocumentDirectoryPath + '/test.txt';

  const example = {
    "start_time": "2020-11-02T14:50:05Z",
    "label": "OTC",
    "description": "OTC 3X with BP.  1st one captured transient: 1: 95/57/42, 121/46/81, 99/55/54",
    "comments": "",
    "highlight": false,
    "device_type": "HRM-AA",
    "device_sn": "2",
    "device_firmware": "1.02",
    "app_version": "1.12",
    "app_hardware": "Moto G5S",
    "app_os": "Android",
    "app_os_version": "9.0"
  }
  //reference: https://stackoverflow.com/questions/56235286/react-native-post-form-data-with-object-and-file-in-it-using-axios
  //reference: https://stackoverflow.com/questions/61585437/how-to-send-post-request-with-files-in-react-native-android
  //file type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

  const upload = async () => {
    var datafile = {
      uri: 'file://' + path,  //for android 'file://' needs to be appended to the uri. not sure if this is the same case for iOS. wiil need to test
      type: 'text/plain',
      name: 'test.txt'
    }
    // console.log('In upload...')
    const formData = new FormData()
    formData.append("start_time","2020-11-02T14:50:05Z")
    formData.append("label","OTC")
    formData.append("description","OTC 3X with BP.  1st one captured transient: 1: 95/57/42, 121/46/81, 99/55/54")
    formData.append('datafile',datafile)
    formData.append("comments","")
    formData.append("highlight",false)
    formData.append("device_type","HRM-AA")
    formData.append("device_sn","2")
    formData.append("device_firmware","1.02")
    formData.append("app_version","1.12")
    formData.append("app_hardware","Moto G5S")
    formData.append("app_os","Android")
    formData.append("app_os_version","9.0")

    //debugging purposes
    // console.log('FORMDATA object appended to')
    // console.log(formData)

    //axios request
    try {
      const response = await axios({
        url: 'http://134.209.76.190:8000/api/Recording',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization':`Token ${user.token}`
        }
      }).catch(err => {
        console.log('error',err.code)
        console.log('error',err.message)
      })
      
      //if there is a network error, response will be null. in this case, it will be caught and the application won't crash
      //if response is successful, the accepted status is 201 - CREATED
      if(response.status == 201){
        console.log('SUCCESS',response.status)
        // console.log(response)
      }
      else{
        console.log('FAILURE',response.status)
      }
    } catch (error) {
      console.log('TRY..CATCH',error.message)
    }
  }

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

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <ScrollView>
         <Header openDrawer={props.navigation.openDrawer} />
         <Text style={styles.title}>Real-Time Data</Text>
         {/* <Button
         title='Show Value'
         onPress={() => console.log(isStart)}/> */}
        <TouchableOpacity style={styles.button} onPress={() => pressed()}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log(props.recordings)}>
            <Text style={styles.buttonText}>Get</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => upload()}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>  
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
