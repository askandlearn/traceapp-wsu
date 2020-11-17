import React, {useContext, useState} from 'react';
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
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import { sleep } from '../utils/sleep';

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
  metrics: state.BLE['metrics'] //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

const RealTimeScreen = (props) => {

  var path = RNFS.DocumentDirectoryPath + '/test.txt';

  const [content,setContent] = useState()

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

  
  const onStart = async () => {
    props.updateMetric();
  }

  const onStop = async () => {
    console.log('Cancelling transaction...')
    props.stopTransaction(transactionID)
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
        {/* <RTTimer ></RTTimer>  */}
        <TouchableOpacity style={styles.button} onPress={() => onStart()}>
            <Text>Start Plot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onStop()}>
            <Text>Stop Plot</Text>
          </TouchableOpacity> 
    {/* sendData={this.testTimer} */}
        <View style={styles.NavBarDivider}/>
        {/* <Swiper style={styles.wrapper} showsButtons loop={false} autoplay={false}> */}
        <View testID="Data" style={styles.slide1}>
          <Text style={styles.slideTitles}>Biometric Data by Numbers</Text>
          <RTData></RTData>
        </View>
        {/* <View style={styles.NavBarDivider} /> */}
        {/* <View testID="Plot" style={styles.slide2}>
        <Text style={styles.slideTitles}>Biometric Data by Plot</Text>
         <Plot ></Plot>
        </View>
        </Swiper> */}
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
    padding: 10,
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
