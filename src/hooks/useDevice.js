import React, { useState } from 'react';
import {Alert} from 'react-native';
import { createAction } from '../utils/createAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { sleep } from '../utils/sleep';

export function useDevice(){
    
    const [state, dispatch] = React.useReducer((state, action) => {
        switch(action.type){
            case 'SET_DEVICE':
                return{
                    ...state,
                    isConnected: true,
                    device: {...action.payload}
                }
                //break;
            case 'DISCONNECT_DEVICE':
                return{
                    ...state,
                    user: undefined
                }
            default:
                return{
                    ...state,
                    user: undefined
                };
        }
    }, {
        device: undefined,
        isConnected: false
    });
    
    const actions = React.useMemo(() => ({
        connect: () => {
            console.log('Connecting device...')
        },
        getInfo: () => {
            console.log('Reading info....')
        },
        isConnected: () => {
            console.log('Checking if it is connected....')
            return state.isConnected
        }
    }), []);

    return {actions};
}