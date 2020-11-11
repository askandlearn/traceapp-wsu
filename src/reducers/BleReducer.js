
const initialState = {
  metrics: undefined,
  status: 'disconnected',
  connectedDeviece: {},
  isConnected: false
};

const bleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT':
      console.log('Connecting...')
      return {
        metrics: state.metrics,
        status: action.status,
        connectedDevice: action.connectedDevice,
        isConnected: action.isConnected
      };
    case 'CHANGE_STATUS':
      console.log('change status:', action.status);
      return {
        metrics:state.metrics,
        status:action.status,
        connectedDevice:action.connectedDevice,
        isConnected: action.isConnected
      };
    case 'UPDATE_METRIC':
      return{
        metrics: action.metric,
        status:action.status,
        connectedDevice: state.connectedDeviece,
        isConnected: state.isConnected
      }
    case 'CHANGE_CONNECT':  //for testing purposes
      return{
        ...state,
        isConnected: action.isConnected
      }
    default:
      return state;
  }
};

export default bleReducer;
