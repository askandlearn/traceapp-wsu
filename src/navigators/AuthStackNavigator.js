/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';



const AuthStack = createStackNavigator();
const WelcomeStack = createStackNavigator();

export function AuthStackNavigator() {
  return(
      <AuthStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <AuthStack.Screen name={'WelcomeStack'}>
            {() => (
                <WelcomeStack.Navigator mode='card' screenOptions={{headerShown: false}}>
                    <WelcomeStack.Screen name={'Welcome'} component={WelcomeScreen}/>
                </WelcomeStack.Navigator>
            )}
        </AuthStack.Screen>
        <AuthStack.Screen name={'Login'} component={LoginScreen}/>
        <AuthStack.Screen name={'SignUp'} component={SignUpScreen}/>
      </AuthStack.Navigator>
  )
}