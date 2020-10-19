//To-do: Check if can autoplay on time start
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
//import modal from 'react-native-modal';
import Timer from '../components/Timer';
import Animate from '../components/ASTSurvey';
import Swiper from 'react-native-swiper';
import SensorAlert from '../components/ConnectToSensorAlert';

import Plot from '../components/ASTPlot';

var check= false;

const ASTScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

 
  handleCheck = (checkedId) => {
    this.setState({checkedId})
  }
 
  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <Text style={styles.title}>Active StandUp Test (AST)</Text>
      <ScrollView >
        <View style={styles.container}>{check && <SensorAlert></SensorAlert>}</View>
          <Timer></Timer>
          <View style={styles.NavBarDivider} />
          <Swiper style={styles.wrapper} showsButtons loop={false} autoplay={false}>
            
            <View testID="Hello" style={styles.slide1}>
              <Text style={styles.slide1Text}>Welcome to the Active StandUp Test. This test will provide TRACE with
            important data regarding your blood flow dynamics.{"\n"}</Text>
            
            <Text styles={styles.note}>NOTE: While the test is being conducted, your TRACE device will
            continue to run analytics. After the 3 minute mark, please make sure
            to stand still to ensure your TRACE device performs accurate
            diagnostics.</Text>
            </View>
            <View testID="Beautiful" style={styles.slide2}>
              <Text style={styles.steps}>1. To begin, lie flat on your back. {"\n"}
              2. Start the timer. {"\n"}
              </Text>
              <Image style={styles.backgroundImage}
              source={require('../images/figures/lyingfigure.png')}></Image>    
            </View>
            <View testID="Simple" style={styles.slide3}>
              <Text style={styles.steps}>3. After the 3-minute timer is done, stand back up. {"\n"}</Text>
              <Image style={{width:50, height:170, marginBottom: 60}}
              source={require('../images/figures/standingfigure.png')}></Image> 
            </View>
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
        </Swiper>

        <View style={styles.NavBarDivider} />
        <Plot></Plot>
      </ScrollView>
    </View>
  );
};

export default ASTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent:'center',

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
    paddingBottom: 10,
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
   // flex:1,
    height:300,
    //backgroundColor: '#9DD6EB'
    
    //opacity:0.4,
    backgroundColor:'#ffffff',
    
  },
  slide1: {
    //flex: 1,
    height:'80%',
    //paddingVertical:'10%',
    paddingHorizontal:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 20,
  
    
    //textAlign:'center',
  },
  slide2: {
   // flex: 1,
    height:'80%',
    //justifyContent: 'center',
    paddingVertical:'10%',
    paddingHorizontal:'10%',
    alignItems: 'center',
   
    //backgroundColor: '#97CAE5'
  },
  slide3: {
   // flex: 1,
    height:'80%',
    //justifyContent: 'center',
    paddingVertical:'10%',
    paddingHorizontal:'5%',
    alignItems: 'center',
   
    //backgroundColor: '#92BBD9'
  },
  slide1Text:{
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  note:{
    color: '#000000',
    fontSize: 10,
   // marginVertical:50,
  },
  steps:{
    color: '#000000',
    fontSize: 15,
  },
  centeredView: {
    height:'90%',
    justifyContent: "center",
    alignItems: "center",
    marginVertical:'10%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
