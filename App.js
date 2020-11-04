/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Tracebio background color hex:#242852

import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';

//Theme
import {lightTheme} from './src/themes/light';
import {AuthContext} from './src/contexts/AuthContext';
import {UserContext} from './src/contexts/UserContext';
import {useAuth} from './src/hooks/useAuth';
import {SplashScreen} from './src/screens/SplashScreen';

const RootStack = createStackNavigator();
// const AuthStack = createStackNavigator();  //not needed

export default function () {
  const {auth, state} = useAuth();

  function renderScreens() {
    //return splash loading is true
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }

    return true ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  //For debuggin purpose
  // console.log('State.user',state.user);

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
