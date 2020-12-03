
const initialState = {
  status: 'disconnected',
  connectedDevice: {},
  isConnected: false,
  busy: false,
  recordings: []  //string array to hold recordings
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
        recordings: [...state.recordings,action.newRecording] //deep copy of the array, new value is added at the ended of the array
      }
    default:
      return state;
  }
};

export default bleReducer;
