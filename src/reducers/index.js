import { combineReducers } from 'redux';
import bleReducer from './BleReducer';

export default combineReducers({
    BLE: bleReducer,
});