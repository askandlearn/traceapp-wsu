import React from 'react';
import {View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity} from 'react-native';

const image = '../images/Trace-3D.png';
//Create the Welcome Page
const WelcomeScreen =() =>{
    return ( 
        <View style={styles.container}>
            <ImageBackground blurRadius={3} style={styles.backgroundImage} source={require('../images/Trace-3D.png')}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </ImageBackground> 
        </View>
    )
};

//All styling options created below
const styles= StyleSheet.create({
    container: {
        flex: 1,
      },
    backgroundImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",                
      },
    button:{
        alignSelf: 'center',
        width: '60%',
        alignItems: 'center',
        margin: 10,
        padding:10,
        backgroundColor:'#ff0000',            
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

export default WelcomeScreen;