export const connectedDevice = (device) => ({
    type: "CONNECT",
    connectedDevice: device,
    isConnected: true
});

export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});

//for testing purposes
export const connectAction = () => ({
    type: "CHANGE_CONNECT",
    isConnected: true
});

const serviceUUID = '0000f80d-0000-1000-8000-00805f9b34fb'
const deviceID = 'AB:89:67:45:11:FF'

//some thunks to control the BLE Device

export const startScan = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        console.log("thunk startScan: ", DeviceManager);
        DeviceManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                dispatch(scan());
                // subscription.remove();
            }
        }, true);
      };
}

export const scan = () => {
    return (dispatch, getState, DeviceManager) => {
        let startTime = new Date()
        //console.log("thunk Scan: ", DeviceManager);
        DeviceManager.startDeviceScan(null, null, (error, device) => {
            //this.setState({"status":"Scanning..."});
           // console.log("scanning...");
           dispatch(changeStatus("Scanning"));

            //timeout
            let endTime = new Date()
            var timeDiff = endTime - startTime; //in ms
            timeDiff /= 1000

            //get seconds
            var seconds = Math.round(timeDiff)

            if (error) {
                console.log(error);
            }
            if(device.name === 'TRACE'){
                dispatch(connectDevice(device));
            }

            // timeout if not found withing 5 seconds
            // this is not working at the moment. leave commented out until i can fix 
            // if(seconds > 5){
            //     dispatch(changeStatus("Timed out"));
            //     alert('Unable to connect...')
            //     dispatch(changeStatus("Changing is connected to true"))
            //     dispatch(connectAction())
            //     DeviceManager.stopDeviceScan();
            // }
        });
    }
}

export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
        //console.log('thunk connectDevice',device['BLE']);
        //this.setState({"status":"Connecting..."});
           // console.log("Connecting")
           dispatch(changeStatus("Connecting"));
           DeviceManager.stopDeviceScan()
           // this.device = device['BLE'];
            device.connect()
              .then((device) => {
                //this.setState({"status":"Discovering..."});
                //console.log("Discovering")
                dispatch(changeStatus("Discovering"));
                let characteristics = device.discoverAllServicesAndCharacteristics()
                console.log("characteristics:", characteristics);
                return characteristics;
              })
              .then((device) => {
               // this.setState({"status":"Setting notifications..."});
                //console.log("Setting notifications"
                dispatch(changeStatus("Getting services"));
                console.log('device',device)
                dispatch(connectedDevice(device))
                return device
                // var service = DeviceManager.servicesForDevice(device.id);
                // return service; //device object
              }, (error) => {
                console.log("SCAN", error.message);
                //return null;
              })
    }
}

//get metric 
export const updateMetric = (newMetric) => {
    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        console.log("thunk update metric: ", state.BLE.connectedDevice);
        state.BLE.connectedDevice.isConnected().then(val => {
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
            
            var subscription = characteristics[0].monitor((err, characteristics)=>{
                if(err){
                    console.log(err.message)
                    return
                }
                if(characteristics.isNotifying){
                    console.log(characteristics.value)
                }
            })
            subscription.remove()
        }, (err) => {
            console.log('UPDATE', err.message)
        })
        // try {
        //     // this.info("Updating Device")
        //     let base64 = Base64.btoa(unescape(encodeURIComponent(newcolor)));
        //     let LEDResponse = state.BLEs.connectedDevice.writeCharacteristicWithResponseForService("00010000-89BD-43C8-9231-40F6E305F96D", "00010001-89BD-43C8-9231-40F6E305F96D", base64 )
        //     dispatch(changeStatus("Changing Color"));
        //     dispatch(changedColor(newcolor));
        //     return true;
        //   } catch(error){
        //     console.log("update Error:", error)
        //     return false;
        //   }
    }
}