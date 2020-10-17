import React from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin'

//Reference: https://medium.com/@monthlyschnitzel/hi-6d328bbd550f
//Documentation: https://github.com/react-native-google-signin/google-signin
//Video: https://www.youtube.com/watch?v=TlVNKiH7P88&ab_channel=AVDojo

//console.cloud.google.com
//email: tracebiowayne@gmail.com
//pass: fall2020



const GoogleComponent = () => {
   [userGoogleInfo, setUserGoogleInfo] = React.useState({})

   React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: '56620583036-uat4lneni55u4q8u0hrr8k5djal0a6am.apps.googleusercontent.com',
            offlineAccess: true
        })
   }, [])

   const signIn = async () => {
       try {
           await GoogleSignin.hasPlayServices();
           const userInfo = await GoogleSignin.signIn();
           console.log(userInfo)
           setUserGoogleInfo(userInfo)
       } catch (error) {
           console.log(error)
           if(error === statusCodes.SIGN_IN_CANCELLED){
               console.log('User cancelled the Login flow')
           }
           else if(error === statusCodes.IN_PROGRESS){
               console.log('Signing in...')
           }
           else if(error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
               console.log('Play services not available')
           }
           else{
               console.log('Some other error has happened')
           }
       }
   }

    return (
        <>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn()}/>
        </>
    )
}

export default GoogleComponent;