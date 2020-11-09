import React, {useContext, useState} from 'react';
import {render} from 'react-dom';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import SensorsComponent from '../components/SensorsComponent';
import HealthDashboard from './HealthDashboardScreen';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {BleManager} from 'react-native-ble-plx';
import {DeviceContext} from '../contexts/DeviceContext';

const TraceConnectScreen = ({navigation}) => {
  const {connect} = useContext(DeviceContext);

  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <ScrollView>
        <Text style={styles.title}>Connect Your TRACE Device</Text>
        <TouchableOpacity
          title="Save Changes"
          style={styles.button}
          onPress={connect}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  deviceImage: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '55%',
    height: '20%',
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
    //alignSelf: 'center',
    //width: '60%',
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
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default TraceConnectScreen;
