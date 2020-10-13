import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import SensorsComponent from '../components/SensorsComponent';
import HealthDashboard from './HealthDashboardScreen';

const TraceConnectScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <ScrollView>
        <Text style={styles.title}>Connect Your TRACE Device</Text>
        <Image
          style={styles.deviceImage}
          source={require('../images/Trace-3D.png')}
        />
        <SensorsComponent />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7b7b7',
    alignItems: 'center',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  deviceImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
    width: '55%',
    height: '50%',
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
