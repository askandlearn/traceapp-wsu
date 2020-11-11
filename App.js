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
import {useDevice} from './src/hooks/useDevice';
import {SplashScreen} from './src/screens/SplashScreen';
import {DeviceContext} from './src/contexts/DeviceContext';

//redux and its helper libraries
//reference for implementing redux: https://itnext.io/using-a-raspberry-pi-to-control-leds-part-iii-react-native-app-29ee3f4afb8c
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/index';

//bleManager
import { 
  BleManager,
  BleError 
} from 'react-native-ble-plx';

const RootStack = createStackNavigator();
// const AuthStack = createStackNavigator();  //not needed
const DeviceManager = new BleManager();

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(DeviceManager)));


export default function () {
  const {auth, state} = useAuth();
  const {actions} = useDevice();

  function renderScreens() {
    //return splash loading is true
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }

    return true ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <Provider store={store}>
              <MainStackNavigator />
            </Provider>
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
