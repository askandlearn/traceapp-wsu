import atob from '../utils/atob';

var RNFS = require('react-native-fs');

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
    connectDevice: undefined
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
//====================================================END=============================================

//==========================================CONSTANTS=================================================
// device constants
const serviceUUID = '0000f80d-0000-1000-8000-00805f9b34fb' 
const deviceID = 'AB:89:67:45:11:FF'

//transaction id for monitoring data
const transactionID = 'monitor_metrics'

//headers to write into text file
const headers = [
    "Time",
    "HR",
    "IBI",
    "PAMP",
    "DAMP",
    "PPG",
    "DIF",
    "DIG",
    "ST",
    "AccX\n"
]

//=====================================================END=============================================


//=================================================THUNKS==============================================
/**
 * IF bluetooth is on, dispatch scan()
 * Called from Trace connect screen ONLY
 */
export const startScan = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        //console.log("thunk startScan: ", DeviceManager);
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                dispatch(scan());
            }
            else{
                dispatch(changeStatus('Bluetooth is not on'))
            }
        }, true);

        dispatch(onDisconnect())
      };
}
/**
 * If TRACE device, dispatch connectDevice()
 * Called from startScan() and onDisconnect()
 */
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
/**
 * Connects device and gets all the services and characteristics
 * Dispatches connectedDevice() action creator
 */
export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
        dispatch(changeStatus("Connecting"));
        DeviceManager.stopDeviceScan()
        device.connect().then((device) => {
            dispatch(changeStatus("Discovering"));
            let characteristics = device.discoverAllServicesAndCharacteristics()
            //console.log("characteristics:", characteristics); //debugging purposes
            return characteristics;
        }).then((device) => {
            dispatch(changeStatus("Getting services"));
            //console.log('device',device); //debugging purposes
            dispatch(connectedDevice(device))
            dispatch(changeStatus('Connected'))
            return device
        }, (error) => {
            dispatch(changeStatus(error.message))
            console.log("SCAN", error.message);
        })
    }
}
/**
 * Get metrics
 */
export const updateMetric = () => {
    return (dispatch, getState, DeviceManager) => {

        //reset previous values from last call
        reset();

        //get current state
        const state = getState();
        //console.log("thunk update metric: ", state);  //debugging purposes

        //create file name
        //e.g. Trace-20201114-045303.txt
        var curDate = new Date();
        var filename = "Trace-".concat(
            curDate.getFullYear().toString(),
            (curDate.getMonth() + 1).toString().padStart(2, "0"),
            curDate.getDate().toString().padStart(2, "0"),
            "-",
            curDate.getHours().toString().padStart(2, "0"),
            curDate.getMinutes().toString().padStart(2, "0"),
            curDate.getSeconds().toString().padStart(2, "0"),
            ".txt"
          );
        // console.log('filename',filename);    //debugging purposes

        // var path = RNFS.DocumentDirectoryPath + '/' + filename;
        var path = RNFS.DocumentDirectoryPath + '/test.txt';    //testing purposes

        // console.log('path:',path);   //debugging purposes
        
        DeviceManager.isDeviceConnected(deviceID).then(val => {
            if(val){
                dispatch(changeStatus('Returning services'))
                return DeviceManager.servicesForDevice(deviceID)
            }else{
                dispatch(changeStatus('Device is not connected'))
                
            }
        }).then(services => {
            //console.log('services',services); //debugging purposes
            dispatch(changeStatus('Getting custom characteristics'))
            return DeviceManager.characteristicsForDevice(deviceID,serviceUUID)
        }).then(characteristics => {
            //console.log('characteristics',characteristics);   //debugging purposes
            
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
                    const metrics = parseData(characteristics.value)
                    dispatch(updatedMetrics(metrics))
                    //write to a text file
                    writeToFile(path, metrics)
                }
            }, transactionID)

            // Cancel after specified amount of time
            // setTimeout(() => DeviceManager.cancelTransaction(transactionID),5000)
        }, (err) => {
            console.log('UPDATE', err.message)
        })
    }
}
/**
 * Cancels any given transction with an id
 */
export const stopTransaction = (ID) => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.cancelTransaction(ID)
    }
}

//on disconnect.
//this is a listener function that will run in the background once the user connects to the device from the connect device screen
//onDisconnect, it will attempt to reconnect once for five seconds... if unsuccessful, user will be prompted to reconnect again
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
                    // setTimeout(() => {
                    //     DeviceManager.stopDeviceScan()
                    //     // console.log('Timed out. Try connecting from connect screen')
                    // }, 50000)
                }
                else{
                    console.log('Bluetooth is not on')

                }
            }, true)
        })
    }
}
//=====================================================END=============================================

//==============================================HELPER FUNCTIONS=======================================
//helper function for reading 
let values_p = {
    time_p: 0, // Previous time value acquired from BLE sensor
    ibi_p: 0, // Previous value of interbeat interval acquired from BLE sensor
    digOut_p: 0, // Previous value of digital Out
    hrv_fifo: [], // HRV-fifo, length 100, used to calculate pnn50
}
//reset will be called before on each time monitor is called
const reset = () => {
    values_p = {
        time_p: 0, // Previous time value acquired from BLE sensor
        ibi_p: 0, // Previous value of interbeat interval acquired from BLE sensor
        digOut_p: 0, // Previous value of digital Out
        hrv_fifo: [], // HRV-fifo, length 100, used to calculate pnn50
    }
}


const parseData = (base64) => {
    //Convert from base 64 to byte array
    var binary_string = atob(base64);
    var len = binary_string.length;
    var data = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        data[i] = binary_string.charCodeAt(i);
    }

    var vcnlCurrent  = data[0];
    var bpm = data[1];
    var skinTemp  = data[2];
    if (data[2] & 0x80) {
      skinTemp = -((~skinTemp & 0xff) + 1);
    } // Two's complement
    skinTemp = 25 + skinTemp/4;
    var accelX = data[3];
    if (data[3] & 0x80) {
      accelX = -((~accelX & 0xff) + 1);
    } // Two's complement
    var ibi  = (data[5] << 8) + data[4];
    var pamp  = (data[7] << 8) + data[6];
    var damp  = (data[9] << 8) + data[8]; // data[8];
    var ppg  = (data[11] << 8) + data[10];
    var dif ;
    if (data[13] & 0x80) {
      dif = -((~dif & 0xff) + 1);
    } // Two's complement
    var digOut  = data[14];
    var curTime  =
        ((data[18] << 24) + (data[17] << 16) + (data[16] << 8) + data[15]) *
        9.846e-6;
    var deltaT = curTime - values_p.time_p;

    // Do these updates only at the beginning of each beat
    if (values_p.digOut_p == 0 && digOut == 1) {
      var hrv = ibi - values_p.ibi_p;
      values_p.ibi_p = ibi;

      // manage the hrv fifo and calculate pnn50
      values_p.hrv_fifo.push(hrv);
      if (values_p.hrv_fifo.length > 100) {
        values_p.hrv_fifo.shift();
      }
      const reducer = (accumulator, currentValue) => accumulator + (currentValue >=50);
      var pnn50 = values_p.hrv_fifo.reduce(reducer, 0)/values_p.hrv_fifo.length;
    //   console.log('pnn50',pnn50.toFixed(3))
    }

    values_p.time_p = curTime
    values_p.digOut_p = digOut
    // Log the data
    var stats = [
      curTime.toFixed(3),
      bpm,
      ibi,
      pamp,
      damp,
      ppg,
      dif,
      digOut,
      skinTemp,
      accelX,
      "\n",
    ];
    console.log('stats',stats)
    return stats
}

const writeToFile = (path,metrics) => {
    RNFS.exists(path).then((exists) => {
        if(exists){
          RNFS.write(path,metrics.toString(),-1,'utf8').then(success => {
            console.log('FILE APPENDED')
          }).catch(err => {
            console.log(err.message)
          })
        }
        else{
          RNFS.writeFile(path, headers.toString(), 'utf8').then((success) => {
            console.log("FILE WRITTEN")
          }).catch((err) => {
            console.log(err.message);
          })
        }
    }).catch(err => {
        console.log('WRITE',err.message)
    })
}
//=====================================================END=============================================