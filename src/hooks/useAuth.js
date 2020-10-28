import React from 'react';
import {Alert} from 'react-native';
import { createAction } from '../utils/createAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { sleep } from '../utils/sleep';

export function useAuth(){
    
    const [state, dispatch] = React.useReducer((state, action) => {
        switch(action.type){
            case 'SET_USER':
                return{
                    ...state,
                    loading: false,
                    user: {...action.payload}
                }
                //break;
            case 'REMOVE_USER':
                return{
                    ...state,
                    user: undefined
                }
                // break;
            case 'SET_LOADING':
                return{
                    ...state,
                    loading: action.payload
                }
            default:
                return{
                    ...state,
                    user: undefined
                };
        }
    }, {
        user: undefined,
        loading: true
    });
    
    const auth = React.useMemo(() => ({
    login: async (email,password) => {
        const STATUS_CODES = [200,204];
        const url = 'http://192.168.1.189/PHP-API/user_registration.php';
        //there is a timout parameter set for 2 sec
        //reference: https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68
        const results = await axios.post(url, {
            type: 'signin',
            email: email,
            password: password,
        }, {
            timeout: 2000
        }).then(res => res.data).catch(err => {
            console.log(err.code)
            console.log(err.message)
        })
        console.log(results)
        //make user js structure
        const user = {
            email: results[1],
            name: results[3] +' ' + results[4],
            birthdate: results[5],
            address: results[6],
            gender: results[7],
            height: results[8],
            weight: results[9]
        }
        // console.log(user);
        //if anything other than success code
        if(parseInt(results[0]) != STATUS_CODES[0]){
            console.log('NULL Dispatch')
            dispatch(createAction(null, user));
            Alert('Unable to sign in')
        }
        else{
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            console.log('Dispatching')
            dispatch(createAction('SET_USER', user));
        }
    },
    logout: async () => {
        console.log('Logout')
        await AsyncStorage.removeItem('@user');
        dispatch(createAction('REMOVE_USER'));
    },
    /*register: async (firstName,lastName,birthdate,email,password,navigate) => {*/
    register: async (email, password, firstName, lastName, birthdate, navigate) => {
        console.log('Register')
        const SUCCESS_MESSAGE = 'User Registered Successfully!';
        const url = 'http://192.168.1.189/PHP-API/user_registration.php';
        const result = await axios.post(url, {
            type: 'signup',
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate,

        }).then(res => res.data).catch(err => {
            console.log('Error: ' + err.message)
        })

        Alert.alert(result);
        //console.log(result)
        if (result === SUCCESS_MESSAGE) {
            // props.navigation.navigate('Login');
            console.log('Navigate to login')
            navigate('Login')
        }
    },
    update: async (email, address, height, weight ) => {
        console.log('In update...');
        const STATUS_CODES = [200,204];
        const url = 'http://192.168.1.189/PHP-API/update.php';
        // there is a timout parameter set for 2 sec
        // reference: https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68
        const results = await axios.post(url, {
            email: email,
            address: address,
            height: height,
            weight: weight
        }, {
            timeout: 2000
        }).then(res => res.data).catch(err => {
            console.log(err.code)
            console.log(err.message)
        })
        console.log(results)
        const user = {
            email: results[1],
            name: results[3] +' ' + results[4],
            birthdate: results[5],
            address: results[6],
            gender: results[7],
            height: results[8],
            weight: results[9]
        }
        // console.log(user);
        //if anything other than success code
        if(parseInt(results[0]) != STATUS_CODES[0]){
            console.log('Unable to retrieve info')
        }
        else{
            //update local storage
            await AsyncStorage.setItem('@user', JSON.stringify(user));
        }

    }
}), []);

    // console.log(state.user);
    // get the @user from async storage. for session purposes
    React.useEffect(() => {
        sleep(1000).then(() => {
            AsyncStorage.getItem('@user').then(user => {
                //console.log('user', user);
                if(user){
                    dispatch(createAction('SET_USER', JSON.parse(user)))
                }
                else{
                    // console.log('Loading: user is null')
                    dispatch(createAction('SET_LOADING', false))
                }
            })
        })
    })
    return {auth, state};
}