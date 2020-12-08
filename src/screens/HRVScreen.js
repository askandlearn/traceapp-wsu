import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Modal,
  Alert,
  Platform,
  Button
} from 'react-native';

import Header from '../components/Header-Component';
import Swiper from 'react-native-swiper';
import Plot from '../components/Plot';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';

var check = false;

function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
    status: state.BLE['status']
  };
}



const HRVScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleCheck = (checkedId) => {
    this.setState({checkedId});
  };
  
  return (
    <View style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <Text style={styles.title}>Heart Rate Variability (HRV)</Text>
      <TouchableHighlight
        style={styles.instructionButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Instructions</Text>
      </TouchableHighlight>
      <KeyboardAvoidingScrollView style={styles.bodyMain}>
        <View>
        <Modal
        propagateSwipe
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{fontWeight: 'bold', marginBottom:10}}>HRV Instructions</Text>
            <KeyboardAvoidingScrollView>
              <View style= {styles.modalContainer}>
              <View style={styles.slide2}>
                <Text style={styles.slide1Text}>Welcome to the Heart Rate Variability screen. This helps Trace
              analyze important data regarding your heart rate dynamics.{"\n"}</Text>
              
                <Text styles={styles.note}>NOTE: Before begining a recording session, make sure you are
              comfortably sitting up straight. Once the session begins, relax
              and breathe deeply. You may begin and end the test whenever you
              are ready, but make sure you run the rest for at least a few
              minutes!{"\n"}{"\n"}</Text>
              </View>
              <View  style={styles.slide2}>
              <Text style={styles.steps}> 1. Situate yourself into a comfortable sitting position. Make sure
              your back is straight.{'\n'}
              {'\n'}2. When you are ready, press the 'Start' button on the timer
              above.{"\n"}
              </Text>  
              </View>
              <View  style={styles.slide2}>
                <Text style={styles.steps}>3.Try to stay still and breate deeply.{'\n'}
              {'\n'}
              4.When you are ready to conclude the session, press 'Stop'.{"\n"}</Text>
              </View>
              <View style={styles.slide2}>
              <Text style={styles.steps}>5. Now, fill out the survey. {'\n'}</Text>
              </View>
              </View>
            </KeyboardAvoidingScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.buttonText}>Okay</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>

      
        
        </View>
        <View style={styles.wrapper}>
        <View style={styles.slide1}>
        <Plot />
        </View>
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default connect(mapStateToProps, null) (HRVScreen);

const styles = StyleSheet.create({
  bodyMain:{
    marginTop:20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // ...Platform.select({
    //   ios: {paddingTop: 50},
    // }),
  },
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
    //marginVertical: 4,
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 32,
    //paddingBottom: ,
    //paddingLeft:15,
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
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff2222',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  instructionButton:{
    backgroundColor:'#242852', 
    alignSelf:'flex-end', 
    padding: 10, 
    marginTop:10, 
    marginRight:10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
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
    paddingHorizontal: 10,
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
  // wrapper: {
  //   // flex:1,
  //   height: 300,
  //   //backgroundColor: '#9DD6EB'

  //   //opacity:0.4,
  //   backgroundColor: '#ffffff',
  // },
  // slide1: {
  //   //flex: 1,
  //   height: '80%',
  //   //paddingVertical:'10%',
  //   paddingHorizontal: '10%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   color: '#000000',
  //   fontSize: 20,

  //   //textAlign:'center',
  // },
  wrapper: {
    height:650,
    backgroundColor:'#ffffff', 
  },
  slide1: {
    height:'100%',
   // paddingHorizontal:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 20,
  },
  slide2: {
    // flex: 1,
    height: '80%',
    //justifyContent: 'center',
    paddingVertical: '10%',
    paddingHorizontal: '10%',
    alignItems: 'center',

    //backgroundColor: '#97CAE5'
  },
  slide3: {
    // flex: 1,
    height: '80%',
    //justifyContent: 'center',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    alignItems: 'center',

    //backgroundColor: '#92BBD9'
  },
  slide1Text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  note: {
    color: '#000000',
    fontSize: 10,
    // marginVertical:50,
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
  modalContainer:{
    width: '97%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  slide2: {
    //height:'100%',
    //paddingHorizontal:'2%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 20,
  },
  slide1Text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  note: {
    color: '#000000',
    fontSize: 10,
    // marginVertical:50,
  },
});
