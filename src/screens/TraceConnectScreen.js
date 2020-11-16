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
import SensorsComponent from '../components/SensorsComponent';
import HealthDashboard from './HealthDashboardScreen';
import { Loading } from '../components/Loading-Component';
import { sleep } from '../utils/sleep';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//redux functions
import {startScan} from '../actions';
import {connect} from 'react-redux';

function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
    status: state.BLE['status']
  };
}

const mapDispatchToProps = dispatch => ({
  startScan: () => dispatch(startScan())
})


const TraceConnectScreen = props => {

  const [loading, setLoading] = useState(false)

  const onConnect = () => {
    props.startScan();
  }

  return (
    <View style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <Text style={styles.title}>Connect Your TRACE Device</Text>
      <TouchableOpacity
        title="On Connect"
        style={styles.button}
        onPress={onConnect}>
        <Text style={styles.buttonText}>Connect</Text>
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
    
  }
});

export default connect(mapStateToProps,mapDispatchToProps) (TraceConnectScreen);
