import React, {useContext, useEffect, useState} from 'react';
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
import Plot from '../components/ASTPlot';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';

//redux states to props, to check if the device is connected to the app
function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
  };
}


var check = false;

const ASTScreen = (props) => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const handleCheck = (checkedId) => {
    this.setState({checkedId});
  };

  return (
    <View style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <Text style={styles.title}>Active StandUp Test (AST)</Text>
      {/* Display the instructions in a modal */}
      <TouchableHighlight
        style={styles.instructionButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Instructions</Text>
      </TouchableHighlight>
      
      <View>{check && <SensorAlert />}</View>
      <View>
        <Modal
        propagateSwipe
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', marginBottom:10}}>AST Instructions</Text>
              <KeyboardAvoidingScrollView>
                <View style= {styles.modalContainer}>
                <View style={styles.slide1}>
                  <Text style={styles.slide1Text}>Welcome to the Active StandUp Test. This test will provide TRACE with
                  important data regarding your blood flow dynamics.{"\n"}</Text>
                
                  <Text styles={styles.note}>NOTE: While the test is being conducted, your TRACE device will
                  continue to run analytics. After the 3 minute mark, please make sure
                  to stand still to ensure your TRACE device performs accurate
                  diagnostics.{"\n"}</Text>
                </View>
                <View  style={styles.slide1}>
                <Text style={styles.steps}>1. To begin, lie flat on your back. {"\n"}
                2. Start the timer. {"\n"}
                </Text>
                <Image 
                source={require('../images/figures/lyingfigure.png')}></Image>    
                </View>
                <View  style={styles.slide1}>
                  <Text style={styles.steps}>3. After the 3-minute timer is done, stand back up. {"\n"}</Text>
                  <Image style={{width:50, height:170, marginBottom: 20}}
                  source={require('../images/figures/standingfigure.png')}></Image> 
                </View>
                <View style={styles.slide1}>
                <Text style={styles.steps}>4. Lastly, fill out the survey to complete the test. {"\n"}</Text>
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
      <KeyboardAvoidingScrollView style={styles.bodyMain}>
        <View style={styles.wrapper}>
          {/* Call the plot component */}
          <View style={styles.slide1}>
            <Plot />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default connect(mapStateToProps, null) (ASTScreen);

const styles = StyleSheet.create({
  bodyMain:{
    marginTop:15,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 70,
    width: '50%',
    height: 80,
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
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop:25,
    paddingTop:65,
    shadowColor: '#000000',
    shadowOffset: {width: .5, height: 1},
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
    ...Platform.select({
      ios: {
        fontFamily: 
        'AppleSDGothicNeo-Bold'
      },
    }),
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    paddingVertical: 10,
    paddingHorizontal:15,
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
  wrapper: {
    height:650,
    backgroundColor:'#ffffff', 
  },
  note: {
    color: '#000000',
    fontSize: 10,
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
  slide1: {
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
  },
});
