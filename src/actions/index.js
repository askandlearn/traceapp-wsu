import { Device } from "react-native-ble-plx";

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
})

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
            endTime = new Date()
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
            if(seconds > 5){
                dispatch(changeStatus("Timed out"));
                alert('Unable to connect...')
                dispatch(changeStatus("Changing is connected to true"))
                dispatch(connectAction())
                DeviceManager.stopDeviceScan();
            }
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
                //console.log("Setting notifications")
                dispatch(changeStatus("Setting notifications"));
                // var service = DeviceManager.servicesForDevice(device.id);
                // return service; //device object
              })
              .then((device) => {
                //this.setState({"status":"listening..."});
                //console.log("listening")
                dispatch(changeStatus("Listening"));
                dispatch(connectedDevice(device))
                //dispatch(NavigationActions.navigate({routeName:'ColorPicker'}));
                //this.props.navigation.navigate('ColorPicker');
                //this.device = device;
                return device;
              }, (error) => {
                console.log(this._logError("SCAN", error));
                //return null;
              })
    }
}


export const updateMetric = (newMetric) => {
    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        console.log("thunk update metric: ", state.BLE.connectedDevice);
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