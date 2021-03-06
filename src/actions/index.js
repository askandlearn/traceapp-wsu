/**
 * 
 * @fileoverview This file defines and contains all the logic for the bluetooth connection and communication. 
 * 
 *
 * 
 * @author Trace Team Fall 2020.
 */
 
import AsyncStorage from '@react-native-community/async-storage';
import { batch } from 'react-redux';
import atob from '../utils/atob';
import { 
    changeStatus, 
    connectedDevice,
    deviceDisconnected,
    updatedMetrics,
    updatedPNN50,
    updatedHRV,
    addRecording,  
    setBusy,
    setCurrentTest,
    removeCurrentTest,
    addSync,
    removeSync} from './actionCreators';

var RNFS = require('react-native-fs');

//==========================================CONSTANTS=================================================
/**
 * Uuid for custom service we need to monitor to
 * @type {string}
 */
const serviceUUID = '0000f80d-0000-1000-8000-00805f9b34fb' 
// For Android const deviceID = 'AB:89:67:45:11:FF'

/**
 * Has default value for format. Is overridden when a device is connected
 * 
 * @type {string}
 * @default {'A0524966-65F3-A409-C6D1-20ED628ED43A'}
 * @default {'AB:89:67:45:11:FF'}
 */
let deviceID = Platform.OS === 'ios' ? 'A0524966-65F3-A409-C6D1-20ED628ED43A':'AB:89:67:45:11:FF'


/**
 * Transaction id for monitoring data
 * @type {string}
 */
const transactionID = 'monitor_metrics' 


/**
 * Array containing headers for the metrics
 * @type {string[]}
 */
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
                dispatch(onDisconnect())
                dispatch(scan());
            }
            else{
                // dispatch(changeStatus('Bluetooth is not on'))
                alert('Bluetooth is not on')
                dispatch(stopScan())
            }
        }, true);

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
                alert(error.message);
                dispatch(stopScan())
            }
            if(device && device.name === 'TRACE'){
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
            // dispatch(changeStatus("Discovering"));
            let characteristics = device.discoverAllServicesAndCharacteristics()
            // console.log("characteristics:", characteristics); //debugging purposes
            return characteristics;
        }).then((device) => {
            // dispatch(changeStatus("Getting services"));
            // console.log('device',device); //debugging purposes
            dispatch(connectedDevice(device))
            dispatch(changeStatus('Connected'))
            return device
        }, (error) => {
            // dispatch(changeStatus(error.message))
            console.log("SCAN", error.message);
        })
    }
}
/**
 * Get metrics of a connected device
 *
 * @param {number=} timeout a timeout
 * @param {string} [label=NONE] test label that is calling the function
 * @return {void} monitors until stopTransaction() is called
 */
export const updateMetric = (timeout, label = 'NONE') => {
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
        var path = RNFS.DocumentDirectoryPath + '/' + filename; //this path will be passed to write file function
        // var path = RNFS.DocumentDirectoryPath + '/test.txt';    //testing purposes
        // console.log('path:',path);   //debugging purposes
        //set deviceID, default ID is the prototype we are working with
        //set variable to add as a current recording
        const recording = {
            start_time: curDate.toISOString(), 
            label: label, 
            file: filename
        }
        deviceID = state.BLE.connectedDevice.id ? state.BLE.connectedDevice.id : deviceID
        DeviceManager.isDeviceConnected(deviceID).then(val => {
            if(val){
                // dispatch(changeStatus('Returning services'))
                return DeviceManager.servicesForDevice(deviceID)
            }else{
                // dispatch(changeStatus('Device is not connected'))
                alert('Device is not connected')
                
            }
        }).then(services => {
            // console.log('services',services); //debugging purposes
            // dispatch(changeStatus('Getting custom characteristics'))
            return DeviceManager.characteristicsForDevice(deviceID,serviceUUID)
        }).then(characteristics => {
            // console.log('characteristics',characteristics);   //debugging purposes

            console.log('Monitoring...')
            dispatch(setBusy(true))
            dispatch(setCurrentTest(label))
            //save the text file name
            dispatch(addRecording(recording))

            var init = 0    //will be set on first read in
            var totalT = 0  //to measure total time passed, resets once its >= 0.500
            var prevDispatch = 0    //used for comparison
            
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
                    //Convert from base 64 to byte array
                    //Taken from Dr. Amar Basu parsing function in traceapp-cordova
                    var binary_string = atob(characteristics.value);
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
                    var deltaT = parseFloat(curTime.toFixed(3) - values_p.time_p.toFixed(3));


                    // =========================================================

                    if(init === 0){
                        init = parseFloat(curTime.toFixed(3))
                    }

                    totalT = parseFloat(curTime.toFixed(3) - init.toFixed(3))
                    console.log('totalT',totalT.toFixed(3)) 
                    // ===========================================================
                    
                    //copy values
                    var digOutP_cpy = values_p.digOut_p
                    var digOut_cpy = digOut
                    // Do these updates only at the beginning of each beat

                    //hrv and pnn
                    var hrv
                    var pnn50
                    if (values_p.digOut_p == 0 && digOut == 1) {
                        console.log(parseFloat((totalT - prevDispatch).toFixed(3)))
                        hrv = ibi - values_p.ibi_p;
                        values_p.ibi_p = ibi;

                        // manage the hrv fifo and calculate pnn50
                        values_p.hrv_fifo.push(hrv);
                        if (values_p.hrv_fifo.length > 100) {
                            values_p.hrv_fifo.shift();
                        }
                        const reducer = (accumulator, currentValue) => accumulator + (currentValue >=50);
                        pnn50 = values_p.hrv_fifo.reduce(reducer, 0)/values_p.hrv_fifo.length;
                        //   console.log('pnn50',pnn50.toFixed(3))
                        // 1) dispatch stats every 0.500 ms and hrv and pnn at the change of a heartbeat
                        
                            dispatch(updatedHRV(hrv))
                        dispatch(updatedPNN50(pnn50.toFixed(3)))
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
                    accelX
                    ];
                    // console.log('stats',stats)
                    if (parseFloat((totalT - prevDispatch).toFixed(3)) >= 0.500 ){
                        console.log('dispatched')
                        prevDispatch = totalT.toFixed(3)   //update prevDispatch to current total time
                        // 1) dispatch stats every 0.500 ms and hrv and pnn at the change of a heartbeat
                       
                            dispatch(updatedMetrics(stats))
                       

                        // 2) alternative to dispatching the states, downside to this is that the graph changes aren't as remarkeably fast
                        // if(hrv && pnn50){
                        //     batch(() => {
                        //         dispatch(updatedMetrics(stats))
                        //         dispatch(updatedHRV(hrv))
                        //         dispatch(updatedPNN50(pnn50.toFixed(3)))
                        //     })
                        // }
                        // else{
                        //     dispatch(updatedMetrics(stats))
                        // }
                    }

                    //write to a text file
                    writeToFile(path, stats)
                }
            }, transactionID)   //transction id is optional. using it because makes it very easy to cancel with an id

            // Cancel after specified amount of time
            // run only if timeout is specified then run timeout ==> this is purely for the ast page which the time is 3 minutes (180000 milliseconds)
            if(timeout){
                setTimeout(() => dispatch(stopTransaction(transactionID)), timeout)
            }
        }, (err) => {
            console.log('UPDATE', err.message)
        })
    }
}
/**
 * Cancels any given transction with an id
 * 
 * @default {'monitor_metrics'}
 */
export const stopTransaction = (ID = 'monitor_metrics') => {
    return (dispatch, getState, DeviceManager) => {

        DeviceManager.cancelTransaction(ID)
        dispatch(setBusy(false))    //device is not busy anymore
        dispatch(removeCurrentTest())
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

            //stop any ongoing test
            dispatch(stopTransaction(transactionID))
            DeviceManager.onStateChange((state) => {
                if (state === 'PoweredOn') {
                    console.log('Attempting to reconnect')
                    dispatch(scan());
                    if(!err){
                        dispatch(stopScan())
                    }
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
//disconnect device
export const disconnectDevice = () => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.cancelDeviceConnection(deviceID).then(() => {
            DeviceManager.stopDeviceScan(); //stops the device disconnect listener
        }).catch(err => {
            console.log('disconnectDevice',err.message)
        })
        dispatch(deviceDisconnected()) //updates status and isConnected. 
    }
}

//stop scan
export const stopScan = () => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.stopDeviceScan()
        dispatch(changeStatus('disconnected')) //updates status and isConnected. 
    }
}

//==============================================HELPER FUNCTIONS=======================================
//helper function for reading 
let values_p = {
    time_p: 0, // Previous time value acquired from BLE sensor
    ibi_p: 0, // Previous value of interbeat interval acquired from BLE sensor
    digOut_p: 0, // Previous value of digital Out
    hrv_fifo: [], // HRV-fifo, length 100, used to calculate pnn50
    deltaT_p: 0 //to calculate total change in time
}
//reset will be called before on each time monitor is called
const reset = () => {
    values_p = {
        time_p: 0, // Previous time value acquired from BLE sensor
        ibi_p: 0, // Previous value of interbeat interval acquired from BLE sensor
        digOut_p: 0, // Previous value of digital Out
        hrv_fifo: [], // HRV-fifo, length 100, used to calculate pnn50
        deltaT_p: 0
    }
}

//reference: https://github.com/itinance/react-native-fs#Examples
/**
 * Write/Append to text file
 *
 * @param {string} path absolute path to a text file
 * @param {string[]} metrics array containing the metrics
 * @return {void} writes/appends to text file
 */
const writeToFile = (path,metrics) => {
    RNFS.exists(path).then((exists) => {
        if(exists){
          RNFS.write(path,metrics.toString() + '\n',-1,'utf8').then(success => {
            // console.log('FILE APPENDED')
          }).catch(err => {
            console.log(err.message)
          })
        }
        else{
          RNFS.writeFile(path, headers.toString(), 'utf8').then((success) => {
            // console.log("FILE WRITTEN")
          }).catch((err) => {
            console.log(err.message);
          })
        }
    }).catch(err => {
        console.log('WRITE',err.message)
    })
}
//=====================================================END=============================================