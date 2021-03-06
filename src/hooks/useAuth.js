import React from 'react';
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
            let profileDate = results.profile.birthdate
            if(profileDate){
                const [api_year, api_month, api_day] = profileDate.split('-');
                profileDate = (api_month + "/" + api_day + "/" + api_year);
            }
            const user = {
                token: token,
                username: results.username,
                email: results.email,
                first_name: results.first_name,
                last_name: results.last_name,
                birthdate: profileDate,
                gender: results.profile.sex,
                zip: results.profile.zip,
            }
            console.log('user:',user)
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
    register: async (user, navigate) => {
        console.log('Register')
        console.log(user)

        const config = {
            headers: {'Content-Type':'application/json'},
            timeout: 2000
        }


        const url = 'http://134.209.76.190:8000/api/User';
        const result = await axios.post(url, {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile": {
                "sex": "NA"
            }
        }, config).catch(err => {
            console.log('Error: ' + err)
            alert('A user with that username already exists ')
        })

        if(result){
            if(result.status == 201){
                alert('Registration successful. Please sign in.')
                navigate('Login')
            }
            else{
                alert('Registration failed')
            }
        }
    },

    /**************************************************
                        UPDATE USER
    ***************************************************/
    update: async (user) => {
        console.log('In update...');
        console.log('username:',user);
        const STATUS_CODES = [200,400];
        const url = `http://134.209.76.190:8000/api/User/${user.username}`
        const config = {
            headers: {'Content-Type':'application/json', 'Authorization':`Token ${user.token}`},
            timeout: 2000
        }
     
        const [month, day, year] = user.birthdate.split('/');
        var apiDate = (year + "-" + month + "-" + day);
        const response = await axios.patch(url, {
            email: user.email,
            
            first_name: user.first_name,
            last_name: user.last_name,
            
            profile:{
                birthdate: apiDate,
                sex: user.gender,
                zip: user.zip
            }
        },config).catch(err => {
            console.log(err.code)
            console.log(err.message)
        })

        if(response.status == STATUS_CODES[0]){
            const results = response.data
            let profileDate = results.profile.birthdate
            if(profileDate){
                const [api_year, api_month, api_day] = profileDate.split('-');
                profileDate = (api_month + "/" + api_day + "/" + api_year);
            }
            const updated = {
                token: user.token,
                username: results.username,
                email: results.email,
                first_name: results.first_name,
                last_name: results.last_name,
                birthdate: profileDate,
                gender: results.profile.sex,
                zip: results.profile.zip,
            }
            console.log('Setting updated...')
            await AsyncStorage.setItem('@user', JSON.stringify(updated))
        }   //if status 200
        else{
            console.log('Unable to fetch user info')
        }   //anything other than 200

    }
}), []);

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