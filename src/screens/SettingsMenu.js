import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

//redux
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  isConnected: state.BLE['isConnected']
})

const SettingsMenu = (props) => {
  var bgColor = '#DCE3F4';


  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{backgroundColor: '#f1f1f2', flex: 1}}>
        <Header openDrawer={props.navigation.openDrawer} />
        <Text style={styles.title}>Settings</Text>
      <KeyboardAvoidingScrollView style={styles.bodyMain}>
        
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop: 15}} />
            <SettingsList.Item
              title="Change Password"
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => props.navigation.navigate('ChangePassword')}
            />
            <SettingsList.Item
              title="Connect TRACE Sensor"
              titleInfo={props.isConnected ? 'Connected':'Disconnected'}
              titleInfoStyle={{color: props.isConnected ? 'green':'red'}}
              onPress={() => props.navigation.navigate('TraceConnect')}
            />
            <SettingsList.Item title="Sync My Data" onPress={() => props.navigation.navigate('SyncData')} />
          </SettingsList>
        
      </KeyboardAvoidingScrollView>
    </View>
  );

  //this.setState({switchValue: value});
};

const styles = StyleSheet.create({
  bodyMain:{
    marginTop:25,
    paddingTop:30
  },
  container: {
    backgroundColor: '#f1f1f2', 
    flex: 1,
    ...Platform.select({
      ios: {marginTop: 10},
    }),
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
    //marginVertical: 4,
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 37,
    //paddingBottom: ,
    //paddingLeft:15,
    marginTop:25,
    paddingTop:65,
   
    //textAlign:'center',
    shadowColor: '#000000',
    shadowOffset: {width: .5, height: 1},
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
    ...Platform.select({
      ios: {
        fontFamily: 
        //'CourierNewPS-BoldMT'
        'AppleSDGothicNeo-Bold'
      },
    }),
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
});

export default connect(mapStateToProps, null) (SettingsMenu);
