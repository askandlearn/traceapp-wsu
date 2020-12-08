/**
 * 
 * @fileoverview This file contains logic for google-sign in and registration. 
 * It is a child component of both the LoginScreen and SignUpScreen
 * 
 *
 * @todo Implment functionality
 * @author Trace Team Fall 2020.
 */

import React from 'react';
import {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

//Reference: https://medium.com/@monthlyschnitzel/hi-6d328bbd550f
//Documentation: https://github.com/react-native-google-signin/google-signin
//Video: https://www.youtube.com/watch?v=TlVNKiH7P88&ab_channel=AVDojo

//console.cloud.google.com
//email: tracebiowayne@gmail.com
//pass: fall2020

const GoogleComponent = ({height, width, text}) => {
  [userGoogleInfo, setUserGoogleInfo] = React.useState({});

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '56620583036-uat4lneni55u4q8u0hrr8k5djal0a6am.apps.googleusercontent.com',
      iosClientId:
        '56620583036-f2pg09eh8doim3pmkt5rpe5776bi684t.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUserGoogleInfo(userInfo);
    } catch (error) {
      console.log(error);
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the Login flow');
      } else if (error === statusCodes.IN_PROGRESS) {
        console.log('Signing in...');
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error has happened');
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, {width: width, height: height}]}
      onPress={() => signIn()}>
      <GoogleSigninButton
        style={styles.googleIcon}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
      />
      <View style={styles.textBox}>
        <Text style={styles.googleText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    // alignItems: 'center',
    flexDirection: 'row',
    width: 340,
    height: 48,
    backgroundColor: '#4285F4',
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'center',
    // justifyContent: 'center'
  },
  googleIcon: {},
  googleText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
});

export default GoogleComponent;
