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
import {disconnectDevice, startScan} from '../actions';
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
  disconnectDevice: () => dispatch(disconnectDevice())
})


const TraceConnectScreen = props => {

  const [loading, setLoading] = useState(false)

  const onConnect = () => {
    if(props.isConnected){
      props.disconnectDevice();
    }
    else{
      props.startScan();
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
        <Text style={styles.buttonText}>{props.isConnected ? 'Disconnect' : 'Start Scan'}</Text>
      </TouchableOpacity>
      <Text>Connection status: {props.status}</Text>
      <View style={[styles.bluetooth, {backgroundColor: props.isConnected ? '#ff0000':'gray'}]}>
        <Icon style={{alignSelf:'center'}} name="bluetooth" size={50} color='white'/>
        {/* <Pulse/> */}
      </View>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
    
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default connect(mapStateToProps,mapDispatchToProps) (TraceConnectScreen);
