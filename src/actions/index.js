import parseData from "../utils/parseData";

export const connectedDevice = (device) => ({
    type: "CONNECT",
    connectedDevice: device,
    isConnected: true
});

export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});

export const deviceDisconnected = () => ({
    type: "DISCONNECTED",
    isConnected: false,
    status: 'Disconnected',
    connectDevice: undefined
})


const serviceUUID = '0000f80d-0000-1000-8000-00805f9b34fb'
const deviceID = 'AB:89:67:45:11:FF'

//transaction id for monitoring data
const transactionID = 'monitor_metrics'

//some thunks to control the BLE Device

export const startScan = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        console.log("thunk startScan: ", DeviceManager);
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                dispatch(scan());
            }
        }, true);

        dispatch(onDisconnect())
      };
}

export const scan = () => {
    return (dispatch, getState, DeviceManager) => {
        //console.log("thunk Scan: ", DeviceManager);

        DeviceManager.startDeviceScan(null, null, (error, device) => {
           dispatch(changeStatus("Scanning"));
            if (error) {
                console.log(error);
            }
            if(device.name === 'TRACE'){
                dispatch(connectDevice(device));
            }
        });

        // setTimeout(() => {
        //     DeviceManager.stopDeviceScan()
        //     dispatch(changeStatus('Timed out'))
        // }, 25000)
    }
}

export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
        dispatch(changeStatus("Connecting"));
        DeviceManager.stopDeviceScan()
        device.connect().then((device) => {
            dispatch(changeStatus("Discovering"));
            let characteristics = device.discoverAllServicesAndCharacteristics()
            console.log("characteristics:", characteristics);
            return characteristics;
        }).then((device) => {
            dispatch(changeStatus("Getting services"));
            console.log('device',device)
            dispatch(connectedDevice(device))
            return device
        }, (error) => {
            console.log("SCAN", error.message);
        })
    }
}

//get metric 
export const updateMetric = () => {
    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        // var device = state.BLE.connectedDevice
        console.log("thunk update metric: ", state);
        
        DeviceManager.isDeviceConnected(deviceID).then(val => {
            if(val){
                dispatch(changeStatus('Returning services'))
                return DeviceManager.servicesForDevice(deviceID)
            }else{
                dispatch(changeStatus('Device is not connected'))
                
            }
        }).then(services => {
            console.log('services',services)
            dispatch(changeStatus('Getting characteristics'))
            return DeviceManager.characteristicsForDevice(deviceID,serviceUUID)
        }).then(characteristics => {
            console.log('characteristics',characteristics)
            
            const subscription = characteristics[0].monitor((err, characteristics)=>{
                if(err){
                    console.log(err.message)
                    return
                }
                if(characteristics.isNotifying){
                    // Parse the BLE data packet
                    // assuming heart rate measurement is Uint8 format, real code should check the flags
                    // See the characteristic specs http://goo.gl/N7S5ZS
                    // our format will be 19 bytes total
                    // [flags, bpm, skin temp msb, AccelX, ibi lsb, ibi msb,
                    // PAMP lsb, PAMP msb, DAMP lsb, DAMP msb,
                    // ppg lsb, ppg msb, diff lsb, diff msb, digital out,
                    // time lsb to msb in ticks (4 bytes) ]
                    parseData(characteristics.value)
                }
            }, transactionID)

            // Cancel after specified amount of time
            setTimeout(() => DeviceManager.cancelTransaction(transactionID),5000)
        }, (err) => {
            console.log('UPDATE', err.message)
        })
    }
}

//cancel data getting
export const stopMetric = () => {
    return (dispatch, getState, DeviceManager) => {
    
    }
}

//on disconnect
export const onDisconnect = () => {
    return (dispatch, getState, DeviceManager) => {
        console.log('Disconnect listener...')
        DeviceManager.onDeviceDisconnected(deviceID, (err,disconnectDevice) => {
            console.log('Connection lost')
            dispatch(deviceDisconnected())

            DeviceManager.onStateChange((state) => {
                if (state === 'PoweredOn') {
                    console.log('Attempting to reconnect')
                    dispatch(scan());
                    setTimeout(() => {
                        DeviceManager.stopDeviceScan()
                        console.log('Timed out. Try connecting from connect screen')
                    }, 5000)

                }
                else{
                    console.log('Bluetooth is not on')

                }
            }, true)
        })
    }
}