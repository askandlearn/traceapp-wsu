/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider, createStore} from 'react-redux';
import {React} from 'react';

import configureStore from './src/store/store';

const store = configureStore;

const deviceData = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => App);
