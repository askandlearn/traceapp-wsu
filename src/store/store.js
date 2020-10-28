import {createStore, combineReducers, applyMiddleware} from 'redux';
import bleReducer from '../reducers/BleReducer';
import thunk from 'redux-thunk';
import {BleManager, BleError} from 'react-native-ble-plx';

const rootReducer = combineReducers({
  ble: bleReducer,
});

const DeviceManager = new BleManager();
const configureStore = () =>
  createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(DeviceManager)),
  );

export default configureStore;
