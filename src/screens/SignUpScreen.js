import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';

//Create the Sign Up Page
const SignUpScreen =(props) =>{
    return ( 
        <View style={styles.container}>  
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>    
            <Text style={styles.title}>SIGN UP</Text>
            <TextInput placeholder='Username' style={styles.inputFields}></TextInput> 
            <TextInput placeholder='Email' style={styles.inputFields}></TextInput>
            <TextInput placeholder='Password' style={styles.inputFields}></TextInput> 
            <TextInput placeholder='Repeat Password' style={styles.inputFields}></TextInput>               
                <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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

export default SignUpScreen;