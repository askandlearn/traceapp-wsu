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

import { AuthStackNavigator } from './src/navigators/AuthStackNavigator';
import { MainStackNavigator } from './src/navigators/MainStackNavigator';

//Theme
import {lightTheme} from './src/themes/light'
import { AuthContext } from './src/contexts/AuthContext';
import { useAuth } from './src/hooks/useAuth';

const RootStack = createStackNavigator();
// const AuthStack = createStackNavigator();  //not needed

export default function() {

  const {auth, state} = useAuth();
  //For debuggin purpose
  console.log(state.user);

  return(
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator screenOptions={{
          headerShown: false,
        }}>
          {state.user ? (
            <RootStack.Screen
              name={'MainStack'}
              component={MainStackNavigator}
            /> ): (
            <RootStack.Screen 
              name={'AuthStack'} 
              component={AuthStackNavigator}
            />
            )}
            {/* <RootStack.Screen 
              name={'AuthStack'} 
              component={AuthStackNavigator}
            /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}