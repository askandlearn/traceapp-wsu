import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Header from '../components/Header-Component';
import HealthDashboard from './HealthDashboardScreen';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const HomeScreen = ({navigation}) => {
  const [stats, setStats] = useState('week');
  const [status, setStatus] = useState('true');
  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <KeyboardAvoidingScrollView>
      <Header openDrawer={navigation.openDrawer} />
      <HealthDashboard />
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    //alignItems: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
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
  buttonRow: {
    flexDirection: 'row',
  },
  chartRow: {
    width: '100%',
  },
  chart: {
    flex: 1,
    height: 300,
    width: '80%',
  },
  hidden: {
    display: 'none',
  },
  calendar: {
    flex: 1,
  },
  colorKey: {
    flex: 1,
    alignSelf: 'center',
    margin: 0,
    paddingTop: 20,
    paddingBottom: 40,
  },
  colorKeyRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    //alignItems: 'left',
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

export default HomeScreen;
