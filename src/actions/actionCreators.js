/**
 * 
 * @fileoverview This file contains all the action creators to dispatch a case for any one of the reducers we have in our reducers folder. 
 * All cases must be covered. Each case should have an associated 
 * 
 *
 * 
 * @author Trace Team Fall 2020.
 */
 


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
 * @returns {state} currRecording: currRecording
 */
export const addRecording = (recording) => ({
    type:'ADD_RECORDING',
    newRecording: recording
})
/**
 * Sets currRecording to empty string
 * Called in Modal-Component.js
 * 
 * @returns {state} currRecording: ''
 */
export const removeRecording = () => ({
    type:'REMOVE_RECORDING'
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
/**
 * Adds unsynced file to unsynced state
 * Called in stopTransaction()
 * 
 * @returns {state} unsynced: {user, files:[...files,newFile]}
 */
export const addSync = (user, file, info) => ({
    type: 'ADD_SYNC',
    user: user,
    file: file,
    info: info
})
/**
 * Remove unsynced file
 * 
 * 
 * @returns {state} unsynced: {user, files:[files-1]}
 */
export const removeSync = () => ({
    type: 'REMOVE_SYNC'
})

/**
 * Set current test
 * 
 * 
 * @returns {state} currTest: ;abe
 */
export const setCurrentTest = (label) => ({
    type: 'SET_CURRTEST',
    label: label
})

/**
 * Remove current test
 * 
 * 
 * @returns {state} removeCURRTest
 */
export const removeCurrentTest = () => ({
    type: 'REMOVE_CURRTEST'
})