import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {createAction} from '../utils/createAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {sleep} from '../utils/sleep';
import {BleManager, Characteristic} from 'react-native-ble-plx';

export function useDevice() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_DEVICE':
          return {
            ...state,
            isConnected: true,
            device: {...action.payload},
          };
        //break;
        case 'DISCONNECT_DEVICE':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_CONNECTED':
          return{
            ...state,
            isConnected: {...action.payload}
          }
        default:
          return {
            ...state,
            user: undefined,
          };
      }
    },
    {
      device: undefined,
      isConnected: false,
    },
  );

  const actions = React.useMemo(
    () => ({
      connect: async () => {
        if (Platform.OS === 'ios') {
          manager.onStateChange(async (state) => {
            if (state === 'PoweredOn') {
              var device = await scanAndConnect();
              dispatch(createAction('SET_DEVICE', device));
            }
          });
        } else {
          var device = await scanAndConnect();
          dispatch(createAction('SET_DEVICE', device));
        }
      },
      getInfo: () => {
        console.log('Reading info....');
      },
      isConnected: () => {
        console.log('Checking if it is connected....');
        return state.isConnected;
      },
      setConnected: () => {
        dispatch(createAction('SET_CONNECTED',true))
      }
    }),
    [],
  );

  const manager = new BleManager();


  const scanAndConnect = async () => {
    let startTime = new Date()
    manager.startDeviceScan(null, null, (error, device) => {
      console.log('Scanning for TRACE device');
      
      //timeout
      endTime = new Date()
      var timeDiff = endTime - startTime; //in ms
      timeDiff /= 1000

      //get seconds
      var seconds = Math.round(timeDiff)

      if (error) {
        console.log(error.message);
        return;
      }
      
      if (device.name === 'TRACE') {
        console.log('Connecting to TRACE Sensor');
        manager.stopDeviceScan();
        // eslint-disable-next-line prettier/prettier
        return device.connect();
      }
      //if not found within 
      if(seconds > 5){
        console.log('Unabe to connect within 5 seconds...')
        alert('Unable to connect...')
        manager.stopDeviceScan();
      }
    });
  };

  return {actions};
}

