import {DISCONNECT, UPDATE_BIOMETRIC} from '../actions/types';

const initialState = {
  status: 'disconnected',
  connectedDeviece: {},
};

const bleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        bpm: action.newBpm,
        connectedDeviece: state.connectedDeviece,
        status: action.status,
      };
    case 'CONNECTED_DEVICE':
      console.log('Reducer connected device', action);
      return {
        bpm: state.bpm,
        connctedDevice: action.connectedDevice,
        status: action.status,
      };
    case 'CHANGE_STATUS':
      console.log('change status:', action.status);
      return {
        bpm: state.bpm,
        connectedDevice: action.connectedDevice,
        status: action.status,
      };
    default:
      return state;
  }
};

export default bleReducer;
