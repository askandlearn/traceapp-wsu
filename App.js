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

//redux and its helper libraries
//reference for implementing redux: https://itnext.io/using-a-raspberry-pi-to-control-leds-part-iii-react-native-app-29ee3f4afb8c
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers/index';

//bleManager
import { BleManager} from 'react-native-ble-plx';
import AsyncStorage from '@react-native-community/async-storage';

//Navigator
const RootStack = createStackNavigator();


//Redux Configurations
//Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'UNSYNCED',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'BLE',
    'DATA'
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
//MIddleware
const DeviceManager = new BleManager();
const store = createStore(persistedReducer, applyMiddleware(thunk.withExtraArgument(DeviceManager)));
const persistor = persistStore(store)
//End Redux 


export default function () {
  const {auth, state} = useAuth();

  function renderScreens() {
    //return splash loading is true
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }

    return (state.user)? (

      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <MainStackNavigator />
              </PersistGate>
            </Provider>
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }


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
