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
            case 'REMOVE_USER':
                return{
                    ...state,
                    user: undefined,
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
    /**************************************************
                         LOGIN
    ***************************************************/
    const auth = React.useMemo(() => ({
    login: async (username,password) => {
        const STATUS_CODES = [200,400];
        const url = 'http://134.209.76.190:8000/api-token-auth/';
        const config = {
            headers: {'Content-Type':'application/json'},
            timeout: 2000
        }

        //there is a timout parameter set for 2 sec
        //reference: https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68
        const response = await axios.post(url, {
            username: username,
            password: password,
        }, config).catch(err => {
            console.log(err.code)
            console.log(err.message)
        })
        // console.log(response)

        if(response.status == STATUS_CODES[0]){
            console.log('OK')
            console.log('Token ', response.data.token)
            token = response.data.token

            //get user info 
            const data = await axios.get('http://134.209.76.190:8000/api/User',{
                headers: {'Authorization':`Token ${token}`},
                timeout: 2000   //two seconds timeout
            }).then(res => {
                if(res.status == STATUS_CODES[0]){
                    return res.data
                }
                else{
                    throw 'Unable to fetch user info'
                }
            }).catch(err => {
                console.log(err.code)
                console.log(err.message)
            })
            
            const results = data.results[0]
            console.log(results)
            const user = {
                token: token,
                email: results.email,
                name: results.first_name + ' ' + results.last_name,
                birthdate: results.profile.birthdate,
                gender: results.profile.sex,
                zip: results.profile.zip,
                height: null,   //will remove if not needed
                weight: null,   //will remove if not needed
            }

            console.log('Setting user using async...')
            await AsyncStorage.setItem('@user', JSON.stringify(user))
            console.log('Dispatching action....')
            dispatch(createAction('SET_USER', user)) //set user object 

        }  //if 200
        else{
            console.log('NULL dispatch....')
            dispatch(createAction(null, null))
            alert('Unable to login')

        }   //if anything else
    },
     /**************************************************
                        LOGOUT
    ***************************************************/
    logout: async () => {
        console.log('Logout')
        await AsyncStorage.removeItem('@user')
        dispatch(createAction('REMOVE_USER'));
    },
    /**************************************************
                    NEW USER REGISTRATION
    ***************************************************/
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
    /**************************************************
                        UPDATE USER
    ***************************************************/
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
            weight: weight,
        } 
        /*{
            timeout: 2000
        }*/
    ).then(res => res.data).catch(err => {
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
         console.log(user);
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