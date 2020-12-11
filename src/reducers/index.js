/**
 * 
 * @fileoverview This file contains all the reducers and exports it for use in the App.js
 * @todo 
 * @author Trace Team Fall 2020.
 */

import { combineReducers } from 'redux';
import bleReducer from './BleReducer';
import DataReducer from './DataReducer';
import SyncReducer from './SyncReducer';

export default combineReducers({
    BLE: bleReducer,
    DATA: DataReducer,
    UNSYNCED: SyncReducer
});