import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';

import Header from '../components/Header-Component';
import Timer from '../components/HRVTimer';
import Animate from '../components/HRVSurvey';
import SensorAlert from '../components/ConnectToSensorAlert';
import Swiper from 'react-native-swiper';
import Plot from '../components/Plot';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

var check = false;

const HRVScreen = ({navigation}, props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheck = (checkedId) => {
    this.setState({checkedId});
  };

  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <Text style={styles.title}>Heart Rate Variability (HRV)</Text>
      <ScrollView style={styles.container}>
        <View style={styles.container}>{check && <SensorAlert />}</View>
        <Timer />
        <View style={styles.NavBarDivider} />
        <Swiper
          style={styles.wrapper}
          showButtons
          loop={false}
          autoplay={false}>
          <View testID="Hello" style={styles.slide1}>
            <Text style={styles.slide1Text}>
              Welcome to the Heart Rate Variability screen. This helps Trace
              analyze important data regarding your heart rate dynamics.{'\n'}{' '}
            </Text>

            <Text style={styles.note}>
              NOTE: Before begining a recording session, make sure you are
              comfortably sitting up straight. Once the session begins, relax
              and breathe deeply. You may begin and end the test whenever you
              are ready, but make sure you run the rest for at least a few
              minutes!
            </Text>
          </View>
          <View testID="Beautiful" style={styles.slide2}>
            <Text style={styles.steps}>
              1. Situate yourself into a comfortable sitting position. Make sure
              your back is straight.{'\n'}
              {'\n'}2. When you are ready, press the 'Start' button on the timer
              above.
            </Text>
          </View>

          <View testID="Simple" style={styles.slide3}>
            <Text style={styles.steps}>
              3.Try to stay still and breate deeply.{'\n'}
              {'\n'}
              4.When you are ready to conclude the session, press 'Stop'.
            </Text>
          </View>
          <View testID="Slide4" style={styles.slide3}>
            <Text style={styles.steps}>
              5. Now, fill out the survey. {'\n'}
            </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClode={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Animate />
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Take Survey</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
        <View style={styles.NavBarDivider} />
        <Plot />
      </ScrollView>
    </View>
  );
};

export default HRVScreen;

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
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 30,
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
    // flex:1,
    height: 300,
    //backgroundColor: '#9DD6EB'

    //opacity:0.4,
    backgroundColor: '#ffffff',
  },
  slide1: {
    //flex: 1,
    height: '80%',
    //paddingVertical:'10%',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 20,

    //textAlign:'center',
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
});
