import React, {useState} from 'react';
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

import Plot from '../components/RTPlot';

var check = true;

const RealTimeScreen = ({navigation}, props) => {
  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
       <KeyboardAvoidingScrollView>
         <Header openDrawer={navigation.openDrawer} />
         <Text style={styles.title}>Real-Time Data</Text>
        <RTTimer></RTTimer>
        <View style={styles.NavBarDivider}/>
        <RTData></RTData>
        {/* <View style={styles.NavBarDivider} /> */}
        <Plot></Plot>
        </KeyboardAvoidingScrollView>
    </View>
  );
};

export default RealTimeScreen;

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
});
