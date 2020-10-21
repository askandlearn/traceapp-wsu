import React from 'react';
import {Alert} from 'react-native';
import { createAction } from '../utils/createAction';
import axios from 'axios';

export function useAuth(){
    
    const [state, dispatch] = React.useReducer((state, action) => {
        switch(action.type){
            case 'SET_USER':
                return{
                    ...state,
                    user: {...action.payload}
                }
                break;
            case 'REMOVE_USER':
                return{
                    ...state,
                    user: undefined
                }
                break;
            default:
                return{
                    ...state,
                    user: undefined
                }
        }
    }, {
        user: undefined
    });
    
    const auth = React.useMemo(() => ({
    login: async (email,password) => {
        const STATUS_CODES = [200,204];
        const url = 'http://192.168.7.97/PHP-API/user_registration.php';
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
        //make user js structure
        const user = {
            email: results[4],
            name: results[1] +' ' + results[2],
            dob: results[3]
        }
        // console.log(user);
        //if anything other than success code
        if(parseInt(results[0]) != STATUS_CODES[0]){
            console.log('NULL Dispatch')
            dispatch(createAction(null, user));
        }
        else{
            console.log('Dispatching')
            dispatch(createAction('SET_USER', user));
        }
    },
    logout: () => {
        console.log('Logout')
        dispatch(createAction('REMOVE_USER'));
    },
    register: async (first,last,date,email,password,navigate) => {
        console.log('Register')
        const SUCCESS_MESSAGE = 'User Registered Successfully!';
        const url = 'http://192.168.7.97/PHP-API/user_registration.php';
        const result = await axios.post(url, {
            type: 'signup',
            firstName: first,
            lastName: last,
            date: date,
            email: email,
            password: password,
        }).then(res => res.data).catch(err => {
            console.log('Error: ' + err.message)
        })

        Alert.alert(result);
        if (result === SUCCESS_MESSAGE) {
            // props.navigation.navigate('Login');
            console.log('Navigate to login')
            navigate('Login')
        }

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //     type: 'signup',
        //     firstName: first,
        //     lastName: last,
        //     date: date,
        //     email: email,
        //     password: password,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //     //Showing response message coming from server after inserting records
        //     Alert.alert(responseJson);
        //     if (responseJson === SUCCESS_MESSAGE) {
        //         // props.navigation.navigate('Login');
        //         console.log('Navigate to login')
        //         navigate('Login')
        //     }
        //     })
        //     .catch((err) => {
        //     console.error(err);
        //     });
        // }
    }
}), []);

    // console.log(state.user);

    return {auth, state};
}