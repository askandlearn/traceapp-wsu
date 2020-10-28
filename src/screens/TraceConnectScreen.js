import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HealthDashboard from './HealthDashboardScreen';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const TraceConnectScreen = ({navigation}) => {
  const saveChanges = () => {
    alert('Device Connected!');
  };

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <KeyboardAvoidingScrollView>
      <Header openDrawer={navigation.openDrawer} />
      <Image
        style={styles.backgroundImage}
        source={require('../images/TraceBio-Black.png')}
      />
      <Text style={styles.title}>Connect Your TRACE Device</Text>
      <Image
        style={styles.deviceImage}
        source={require('../images/Trace-3DTransparent.png')}
      />
      <TouchableOpacity title="Connect" onPress={null} style={styles.button}>
        <Text style={styles.buttonText} onPress={saveChanges}>
          CONNECT
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginBottom: 70,
    width: 150,
    height: 150,
    //resizeMode: 'stretch',
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
