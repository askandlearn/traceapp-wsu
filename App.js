import {createAppContainer, Image} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { ActivityIndicator, StyleSheet, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';


const Root = createStackNavigator(
{
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  
  //needs to redirect to home page

  Profile: ProfileScreen
},
{
  //Set the Welcome Page as the first page of the app
  initialRouteName: 'Welcome',
  defaultNavigationOptions:{
  //Title shows on the header of the app
  title: 'Trace',
  //(
//     <Image source={require('./src/images/Trace-3D.png')}/>
// ),
    headerStyle: {
      backgroundColor: '#202020'
    },
    headerTintColor: '#fff'
  }
});

export default createAppContainer(Root)
