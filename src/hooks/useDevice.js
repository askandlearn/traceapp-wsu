import React, { useState } from 'react';
import {Alert} from 'react-native';
import { createAction } from '../utils/createAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { sleep } from '../utils/sleep';

export function useAuth(){
    
    const [deviceObject, setDeviceObject] = useState()
    
    const auth = React.useMemo(() => ({
        connect: () => {

        }
    }), []);

    return {auth, state};
}