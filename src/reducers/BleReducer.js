
const initialState = {
  status: 'disconnected',
  connectedDevice: {},
  isConnected: false,
  busy: false,
  currRecording: {start_time: '', label: '', file: ''},  //string to hold current recording
  currTest:''
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
        currRecording: action.newRecording
      }
    case 'REMOVE_RECORDING':
      return{
        ...state,
        currRecording: ''
      }
      case 'SET_CURRTEST':
        return{
          ...state,
          currTest:action.label
        }
      case 'REMOVE_CURRTEST':
        return{
          ...state,
          currTest: ''
        }
    default:
      return state;
  }
};

export default bleReducer;
