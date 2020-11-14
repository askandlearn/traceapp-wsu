
const initialState = {
  metrics: [],
  status: 'disconnected',
  connectedDeviece: {},
  isConnected: false
};

const bleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT':
      // console.log('Connecting...')
      return {
        metrics: state.metrics,
        status: action.status,
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
    default:
      return state;
  }
};

export default bleReducer;
