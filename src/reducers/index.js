import { combineReducers } from 'redux';
import bleReducer from './BleReducer';
import DataReducer from './DataReducer';

export default combineReducers({
    BLE: bleReducer,
    DATA: DataReducer
});