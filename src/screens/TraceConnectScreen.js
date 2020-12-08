import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import Header from '../components/Header-Component';
import { Loading } from '../components/Loading-Component';
import { sleep } from '../utils/sleep';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//redux functions
import {disconnectDevice, startScan, stopScan} from '../actions';
import {connect} from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
    status: state.BLE['status']
  };
}

const mapDispatchToProps = dispatch => ({
  startScan: () => dispatch(startScan()),
  disconnectDevice: () => dispatch(disconnectDevice()),
  stopScan: () => dispatch(stopScan())
})


const TraceConnectScreen = props => {

  const [loading, setLoading] = useState(false)

  const onConnect = () => {
    if(props.isConnected){
      props.disconnectDevice();
    }
    else{
      if(props.status === 'Scanning'){
        console.log('Stopping scan..')
        props.stopScan();
      }
      else{
        props.startScan();
      }
    }
  }

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name='arrow-left-circle' size={30} paddingVertical={50}></Icon>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Connect Your TRACE Device</Text>
      <TouchableOpacity
        title="On Connect"
        style={styles.button}
        onPress={onConnect}>
        <Text style={styles.buttonText}>{props.isConnected ? 'Disconnect' : props.status === 'Scanning' || props.status === 'Connecting'  ? 'Stop Scan' : 'Start Scan'}</Text>
      </TouchableOpacity>
      <Text>Connection status: {props.status}</Text>
      <View style={[styles.bluetooth]}>
        <Image source={require('../images/Trace-3DTransparent.png')} style={styles.deviceImage}/>
      </View>
      <View style={[styles.blinker, {backgroundColor: props.isConnected ? 'green' : 'red'}]}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 30,
    textAlign: 'center'
  },
  button: {
    // alignSelf: 'center',
    width: '60%',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bluetooth:{
    marginTop: 80,
    borderWidth: 0,
    padding: 5,
    width: 150,
    height: 150,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    borderColor: 'black',
    // borderWidth: 1
    
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deviceImage: {
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  blinker:{
    marginTop: 40,
    borderWidth: 0,
    padding: 5,
    width: 20,
    height: 20,
    borderRadius: 50,
    alignContent: 'center',
    // backgroundColor: 'gray',
    borderColor: 'black',
    // borderWidth: 1
    backgroundColor: 'green'
  },
});

export default connect(mapStateToProps,mapDispatchToProps) (TraceConnectScreen);
