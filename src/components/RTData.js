import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
  metrics: state.DATA['metrics'],//[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
  currTest: state.BLE['currTest']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: (timeout, label) => dispatch(updateMetric(timeout, label)),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

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
  const [isPPG, setPPG] = useState(0);
  const [isDIF, setDIF] = useState(0);
  const [isACC, setACC] = useState(0);

  //Get the PNN50 and HRV values
  //The rest of the values are assigned to and displayed directly in each field
  useEffect(() => {
   if(props.currTest==='RT')
    {
      setPN(props.pnn50)
      setHRV(props.hrv)
    }
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
        <Icon name="question-circle" size={18} color="#ff2222" />
        <Text style={{fontSize: 15, }}>
          {' '}
          Click on any of the values below for details
        </Text>
      </View>

      {/* FIRST ROW */}
      <View
        style={styles.row}>
        <Text style={[styles.valueTitle,{}]}>  HR (bpm)</Text>
        <Text style={styles.valueTitle}>   IBI (ms)</Text>
        <Text style={styles.valueTitle}> HRV (ms)</Text>
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
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[1]:0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(2);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[2]:0}</Text>
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
        <Text style={styles.valueTitle}>    pNN50</Text>
        <Text style={styles.valueTitle}>Skin Temp</Text>
        <Text style={styles.valueTitle}>    PAMP</Text>
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
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[8]:0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(6);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[3]:0}</Text>
        </TouchableOpacity>
      </View>

      {/* THIRD ROW */}
      <View
        style={styles.row}>
        <Text style={styles.valueTitle}>     DAMP</Text>
        <Text style={styles.valueTitle}>      PPG</Text>
        <Text style={styles.valueTitle}>       DIF</Text>
      </View>
      <View
        style={styles.row}>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(7);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[4]:0}</Text>
        </TouchableOpacity> 
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(10);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[5]:0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(9);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>0</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.row}>
        <Text style={styles.valueTitle}>    ACC_X</Text>
      </View>
      <View
        style={styles.row}>
        <TouchableOpacity
          style={styles.valueButton}
          onPress={() => {
            setIsBiometric(10);
            setModalVisible(true);
          }}>
          <Text style={styles.valueText}>{props.currTest==='RT'?props.metrics[9]:0}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
          {/* Assign each biometric to its corresponding field */}
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
                ? 'PPG'
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
                ? isPPG
                : isBiometric == 9
                ? isDIF
                : props.metrics[9]}
              {'\n'}
            </Text>
            <Text>
              {/* Display information about each biometric value  */}
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
                ? 'Differential Amplitude (integer). Indicates the strength of heart contractions.'
                : isBiometric == 8
                ? 'PPG is also known as the photoplethsymogram.'
                : isBiometric == 9
                ? 'Signal to the change of the heart rate.'
                : 'Accelerometer signal indicating movement.'}
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
    paddingHorizontal: 8,
  },
  valueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginBottom: 50,
    borderBottomWidth: 1,
    width: 75,
    height: 30,
    borderColor: 'rgba(0,0,0,0.2)',
    elevation: 1,
  },
  valueText: {
    color: '#000000',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:'60%'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
  }
});
