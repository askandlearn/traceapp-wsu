import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//redux functions
import {disconnectDevice, startScan, stopScan} from '../actions';
import {connect} from 'react-redux';


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
          <Icon name='arrow-left-circle' size={30} paddingVertical={50} style={{color:'#242852'}}></Icon>
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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop:15,
   marginBottom:60,
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
    marginVertical: '5%',
    padding: 10,
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
    borderColor: 'black',
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
    borderColor: 'black',
    backgroundColor: 'green'
  },
});

export default connect(mapStateToProps,mapDispatchToProps) (TraceConnectScreen);
