
const initialState = {
  metrics: new Array(11).fill(0),
  status: 'disconnected',
  connectedDevice: {},
  isConnected: false,
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
    case 'UPDATE_METRIC':
      return{
        ...state,
        metrics: action.metrics
      }
    case 'DISCONNECTED':
      return{
        ...state,
        status: action.status,
        connectedDevice: action.connectedDevice,
        isConnected: action.isConnected
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
