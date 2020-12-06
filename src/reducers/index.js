import { combineReducers } from 'redux';
import bleReducer from './BleReducer';
import DataReducer from './DataReducer';
import SyncReducer from './SyncReducer';

export default combineReducers({
    BLE: bleReducer,
    DATA: DataReducer,
    UNSYNCED: SyncReducer
});