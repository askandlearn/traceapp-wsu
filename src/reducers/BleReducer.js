
const initialState = {
  status: 'disconnected',
  connectedDevice: {},
  isConnected: false,
  busy: false,
  recordings: {user: undefined, recordings: []}
}

const bleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT':
      // console.log('Connecting...')
      return {
        ...state,
        connectedDevice: action.connectedDevice,
        isConnected: action.isConnected
      };
    case 'CHANGE_STATUS':
      console.log('change status:', action.status);
      return {
        ...state,
        status: action.status
      };
    case 'DISCONNECTED':
      return{
        ...state,
        status: action.status,
        connectedDevice: action.connectedDevice,
        isConnected: action.isConnected
      };
    case 'SET_BUSY':
      return{
        ...state,
        busy: action.busy
      }
    case 'ADD_RECORDING':
      return{
        ...state,
        recordings: {user: action.user, recordings:[...state.recordings.recordings,action.newRecording]}
      }
    default:
      return state;
  }
};

export default bleReducer;
