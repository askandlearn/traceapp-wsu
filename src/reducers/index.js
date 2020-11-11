import { combineReducers } from 'redux';
import bleReducer from './bleReducer';

export default combineReducers({
    BLE: bleReducer,
});