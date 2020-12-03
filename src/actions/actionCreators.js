//======================================== ACTION CREATORS ======================================
/**
 * Returns an updated state value
 * Called in connectDevice()
 * 
 * @returns {state} connectedDevice: device, isConnected: true
 */
export const connectedDevice = (device) => ({
    type: "CONNECT",
    connectedDevice: device,
    isConnected: true
});
/**
 * Returns an updated state value
 * 
 * @returns {state} status: newStatus
 */
export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});
/**
 * Returns an updated state value
 * Called in onDisconnect() 
 * 
 * @returns {state} status: newStatus
 */
export const deviceDisconnected = () => ({
    type: "DISCONNECTED",
    isConnected: false,
    status: 'Disconnected',
    connectedDevice: {}
})
/**
 * Returns an updated state value
 * Called in updateMetrics()
 * 
 * @returns {state} metrics: [metrics]
 */
export const updatedMetrics = (metrics) => ({
    type: 'UPDATE_METRIC',
    metrics: metrics
})
/**
 * Returns an updated state value for DataReducer
 * Called in updateMetrics()
 * 
 * @returns {state} pnn50: newValue
 */
export const updatedPNN50 = (value) => ({
    type:'UPDATE_PNN50',
    pnn50: value
})
/**
 * Returns an updated state value for DataReducer
 * Called in updateMetrics()
 * 
 * @returns {state} hrv: newValue
 */
export const updatedHRV = (value) => ({
    type:'UPDATE_HRV',
    hrv: value
})
/**
 * Returns an updated state value for BleReducer
 * Called in updateMetrics()
 * 
 * @returns {state} records: [..., newRecording]
 */
export const addRecording = (recording) => ({
    type:'ADD_RECORDING',
    newRecording: recording
})
/**
 * Returns an updated state value for BleReducer
 * Called in updateMetrics()
 * 
 * @returns {state} busy: [..., busy]
 */
export const setBusy = (val) => ({
    type: 'SET_BUSY',
    busy: val
})