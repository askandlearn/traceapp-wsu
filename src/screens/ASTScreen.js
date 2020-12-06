{/* <Swiper autoplayTimeout={1} style={styles.wrapper} showsButtons loop={true} autoplay={started}>
            { started ? null :
              <View testID="Hello" style={styles.slide1}>
                <Text style={styles.slide1Text}>Welcome to the Active StandUp Test. This test will provide TRACE with
                important data regarding your blood flow dynamics.{"\n"}</Text>
              
                <Text styles={styles.note}>NOTE: While the test is being conducted, your TRACE device will
                continue to run analytics. After the 3 minute mark, please make sure
                to stand still to ensure your TRACE device performs accurate
                diagnostics.</Text>
              </View>
            }
            {done ? null :
            <View testID="Beautiful" style={styles.slide2}>
              <Text style={styles.steps}>1. To begin, lie flat on your back. {"\n"}
              2. Start the timer. {"\n"}
              </Text>
              <Image style={styles.backgroundImage}
              source={require('../images/figures/lyingfigure.png')}></Image>    
            </View>
            }
            {done ? null : 
            <View testID="Simple" style={styles.slide3}>
              <Text style={styles.steps}>3. After the 3-minute timer is done, stand back up. {"\n"}</Text>
              <Image style={{width:50, height:170, marginBottom: 60}}
              source={require('../images/figures/standingfigure.png')}></Image> 
            </View>
            }
            {!done ? null :
            <View testID="Slide4" style={styles.slide3}>
            <Text style={styles.steps}>4. Now, fill out the survey to complete the test. {"\n"}</Text>
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Animate></Animate>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity style={styles.button}
              onPress={() => {
                setModalVisible(true);
              }}><Text style={styles.buttonText}>Take Survey</Text></TouchableOpacity>
            </View>
            </View>
            }
        </Swiper> */}

//To-do: Check if can autoplay on time start
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
import Timer from '../components/Timer';
import Animate from '../components/HRVSurvey';
import Swiper from 'react-native-swiper';
import Plot from '../components/ASTPlot';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';

//redux states to props
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

  //const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <KeyboardAvoidingScrollView>
        <Text style={styles.title}>Active StandUp Test {'\n'}(AST)</Text>
        <View>{check && <SensorAlert />}</View>
        <Timer />
   
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
              //style={styles.backgroundImage}
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

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Instructions</Text>
      </TouchableHighlight>
        
        </View>
        {/* <View style={styles.NavBarDivider} /> */}
        <View style={styles.wrapper}>
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
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
    marginVertical: 4,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
    textAlign:'center'
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
  wrapper: {
    height:650,
    backgroundColor:'#ffffff', 
  },
  slide1: {
    height:'100%',
    //paddingHorizontal:'2%',
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
  slide1: {
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
