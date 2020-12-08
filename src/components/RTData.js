import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

import {stopTransaction, updateMetric } from '../actions';
//redux functions
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  pnn50: state.DATA['pnn50'],
  hrv: state.DATA['hrv'],
  connectedDevice: state.BLE['connectedDevice'],
  metrics: state.DATA['metrics'] //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})



//const screenWidth = Dimensions.get("window").width;
//props.data [0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
const RTData = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBiometric, setIsBiometric] = useState(1);
  const [isTimerOn, setTimerOn] = useState(false);
   const [isHR, setHR] = useState(0);
   const [isHRV, setHRV] = useState(props.hrv);
  const [isIBI, setIBI] = useState(0);
   const [isPN, setPN] = useState(props.pnn50);
  const [isSkinTemp, setSkinTemp] = useState(0);
  const [isPAMP, setPAMP] = useState(0);
  const [isDAMP, setDAMP] = useState(0);
  const [isCBF, setCBF] = useState(0);
  const [isDIF, setDIF] = useState(0);
  const [isACC, setACC] = useState(0);

  useEffect(() => {
   
    setPN(props.pnn50)
    setHRV(props.hrv)
  },[props.hrv,props.pnn50])

  return (
    <View style={styles.valueContainer}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          marginTop:40,
          marginHorizontal: '10%',
        }}>
        {/* <Text style={{ fontWeight:'bold'}}>Note:</Text> */}
        <Icon name="question-circle" size={18} color="#ff2222" />
        <Text style={{fontSize: 15, }}>
          {' '}
          Click on any of the values below for details
        </Text>
      </View>

      {/* FIRST ROW */}
      <View
        style={styles.row}>
        <Text style={[styles.valueTitle,{}]}> HR (bpm)</Text>
        <Text style={styles.valueTitle}> IBI (ms)</Text>
        <Text style={styles.valueTitle}>HRV (ms)</Text>
      </View>

      <View
        style={styles.row}>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(1);
            setModalVisible(true);
            setTimerOn(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(2);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(3);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{isHRV}</Text>
        </TouchableOpacity>
      </View>
      {/* SECOND ROW */}
      <View
        style={styles.row}>
        <Text style={styles.valueTitle}>   pNN50</Text>
        <Text style={styles.valueTitle}>Skin Temp</Text>
        <Text style={styles.valueTitle}>   PAMP</Text>
      </View>
      <View
        style={styles.row}>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(4);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{isPN}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(5);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[8]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(6);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[3]}</Text>
        </TouchableOpacity>
      </View>

      {/* THIRD ROW */}
      <View
        style={styles.row}>
        <Text style={styles.valueTitle}>    DAMP</Text>
        <Text style={styles.valueTitle}>       DIF</Text>
        <Text style={styles.valueTitle}>  ACC_X</Text>
      </View>
      <View
        style={styles.row}>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(7);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[4]}</Text>
        </TouchableOpacity> 
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(9);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(10);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.metrics[9]}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>
              {isBiometric == 1
                ? 'HR (bpm)'
                : isBiometric == 2
                ? 'IBI (ms)'
                : isBiometric == 3
                ? 'HRV (ms)'
                : isBiometric == 4
                ? 'pNN50'
                : isBiometric == 5
                ? 'Skin Temperature'
                : isBiometric == 6
                ? 'PAMP'
                : isBiometric == 7
                ? 'DAMP'
                : isBiometric == 8
                ? 'CBF'
                : isBiometric == 9
                ? 'DIF'
                : 'ACC_X'}
              {'\n'}
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {isBiometric == 1
                ? props.metrics[1]
                : isBiometric == 2
                ? props.metrics[2]
                : isBiometric == 3
                ? isHRV
                : isBiometric == 4
                ? isPN
                : isBiometric == 5
                ?props.metrics[8]
                : isBiometric == 6
                ? props.metrics[3]
                : isBiometric == 7
                ? props.metrics[4]
                : isBiometric == 8
                ? isCBF
                : isBiometric == 9
                ? isDIF
                : props.metrics[9]}
              {'\n'}
            </Text>
            <Text>
              {/* I am {props.name}, and this is  */}
              {isBiometric == 1
                ? 'HR refers to your Heat Rate and is measured in beats per minute. \n\nThe resting Heart Rate of an avergae adult ranges from 60-100 bpm.'
                : isBiometric == 2
                ? 'IBI refers to the Interbeat Interval, which is the time interval between the individual beats of your heart, and is measured in milliseconds.'
                : isBiometric == 3
                ? 'HRV refers to the Heart Rate Variability, which is the variation in time between each heartbeat, and is measured in milliseconds. \n\nThe average HRV is around 59 ms.'
                : isBiometric == 4
                ? 'PNN50 refers to the proportion of NN50 divided by the total number of NN (R-R) intervals. NN50 is the number of times successive heartbeat intervals exceed 50ms.'
                : isBiometric == 5
                ? 'Skin Temp refers to the temperature of the outermost surface of the body. \n\nNormal human skin temperature ranges between 92.3 and 98.4 °F (33.5 and 36.9 °C).'
                : isBiometric == 6
                ? 'Pulse amplitude of systole (integer). Indicates the volume of blood flow.'
                : isBiometric == 7
                ? 'Differential amplitude (integer). Indicates the strength of heart contractions.'
                : isBiometric == 8
                ? 'CBF refers to the Coronary Blood Flow.'
                : isBiometric == 9
                ? 'Value9'
                : 'Accelerometer signal indicating movement.'}

              {/* {isBiometric==1? "Value1":  isBiometric==2? "Value2":
                isBiometric==3? "Value3":
                isBiometric==4? "Value4":
                isBiometric==5? "Value5":
                isBiometric==6? "Value6":
                isBiometric==7? "Value7":
                isBiometric==8? "Value8":
                isBiometric==9? "Value9": "null"} */}
            </Text>
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (RTData)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
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
    width: 85,
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
    marginBottom: 60,
    //borderRadius: 20,

    borderBottomWidth: 1,
    width: 75,
    height: 30,
    borderColor: 'rgba(0,0,0,0.2)',
    // backgroundColor:'rgba(255,255,255,0.7)',
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    elevation: 1,
  },
  valueText: {
    color: '#000000',
    fontSize: 18,
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
    width: '50%',
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
  row:{
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    //marginVertical:'2%'
  }
});
