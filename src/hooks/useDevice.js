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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const manager = new BleManager();

  const scanAndConnect = async () => {
    manager.startDeviceScan(null, null, (error, device) => {
      console.log('Scanning for TRACE device');
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
    });
  };

  return {actions};
}

