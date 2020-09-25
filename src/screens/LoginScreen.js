import React, { Component, useState }  from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from 'react-navigation-stack';

//Create the Login Page
const LoginScreen =({navigation}) =>{
    //hard coded user information
    const userInfo = {
        username: 'admin',
        password: 'pass'
    };

    //states 
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    //User login done using AsyncStorage - not secure, information held locally
    _login = async () => {
        console.log(userInfo)
        console.log('name: '+username);
        console.log('pass: '+password);
        if(userInfo.username === username && userInfo.password === password){
           //alert('Logged in!');
           await AsyncStorage.setItem('isLoggedIn','1');
           navigation.navigate('Profile')
        }
        else{
            alert('Username or password is incorrect');
        }
    }
    //Need to add a logout button - logic is that AsyncStorage is cleared
    //and renavigated to the Welcome page
    _logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate.Auth;
    } 

    return ( 
        <View style={styles.container}>  
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>    
            <Text style={styles.title}>LOGIN</Text>
            <TextInput 
                placeholder='Username' 
                style={styles.inputFields}
                onChangeText={(uname) => setUsername(uname)}
                value={username}></TextInput> 
            <TextInput 
                placeholder='Password' 
                style={styles.inputFields} 
                secureTextEntry
                onChangeText={(pass) => setPassword(pass)}
                value={password}></TextInput>        
            <TouchableOpacity style={styles.button} onPress={_login}>
                <Text style={styles.buttonText} >LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
};

//All styling options created below
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7'
      },
    backgroundImage:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:70,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
    inputFields:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        fontWeight: 'bold',
        opacity: .4,
        borderRadius:3
    },
    title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color:'#202020',
        fontWeight:'bold',
        fontSize: 30
        },
    button:{
        //alignSelf: 'center',
        //width: '60%',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        borderRadius:20,
        backgroundColor:'#ff0000',            
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

export default LoginScreen;