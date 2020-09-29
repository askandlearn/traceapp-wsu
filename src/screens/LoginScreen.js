import React, { Component, useState }  from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
<<<<<<< HEAD
=======
import { Form, TextValidator } from 'react-native-validator-form';
import { minNumber } from 'react-native-validator-form/lib/ValidationRules';

>>>>>>> Prototype-1

const logo= '../images/TraceBio-White.png';

//Create the Login Page
export default class LoginScreen extends  Component  {
    
    constructor () {
        super();
        this.state = {
          email: '',
          password: ''
        };
      }
    handlePassword = (password) => {
        this.setState({ password });
    }
 
    handleEmail = (email) => {
        this.setState({ email });
    }
 
    submit = () => {
        console.log('Submitted');
    }
 
    handleSubmit = () => {
        this.refs.form.submit();
        this.props.navigation.navigate('Home');
    }

    render(){
        var {navigate} = this.props.navigation;      
        const { email} = this.state;      
        const { password} = this.state;

        return ( 
            <View style={styles.container}>  
                <KeyboardAvoidingScrollView>
                    <View> 
                        <Image style={styles.backgroundImage} source={require(logo)}></Image>    
                        <Text style={styles.title}>Welcome back!</Text>
                    </View>
                    <Form ref="form" onSubmit={this.handleSubmit}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is invalid']}
                            errorStyle={{ container: { top: 0, left: '10%', position: 'relative' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }
                            placeholder="Email"
                            type="text"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={this.handleEmail}
                            style={styles.inputFields}
                        />
                        <TextValidator
                            name="passowrd"
                            label="password"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            errorStyle={{container: styles.errorMessage}, {text: styles.errorMessage}}
                            placeholder="Password"
                            type="text"
                            value={password}
                            onChangeText={this.handlePassword}
                            secureTextEntry={true}
                            style={styles.inputFields}
                        />
                        <TouchableOpacity title="Submit"
                        onPress={this.handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>SIGN IN</Text>
                            </TouchableOpacity>
                    
                    </Form>
                    <View style={styles.flexContainer}>
                        <View style={styles.horizantalLine} />
                        <View>
                            <Text style={styles.orOption}>Or sign in with</Text>
                        </View>
                        <View style={styles.horizantalLine} />  
                    </View>
                    <View style={[ styles.bottomContainer]}>
                        <View style={styles.flexContainer}>
                        <Text style={styles.otherText}>Not a member?</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkButton} onPress={()=>navigate("SignUp")}>SIGN UP</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingScrollView>     
            </View>
        )
    }
<<<<<<< HEAD


=======
>>>>>>> Prototype-1
};
                        
//All styling options created below
const styles= StyleSheet.create({
    flexContainer:{
        flexDirection: 'row',
        alignItems:'center',
        marginTop:'5%'
    },
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7',
      },
    bottomContainer:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        marginTop: '25%'
      },
    backgroundImage:{
        alignSelf:'center',
        marginTop:20,
        marginBottom:15,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
    inputFields:{
        marginHorizontal: '10%',
        marginVertical: 10,
        padding: 13,
        fontWeight: 'bold',
        borderColor:'rgba(0, 0, 0, .4)',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:20,
        shadowColor:'#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    errorMessage:{
        marginHorizontal:'10%',
        position:'relative',
        color:'red'
    },
    title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: '3%',
        color:'#202020',
        fontSize: 25
        },
    button:{
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: '3%',
        padding:10,
        borderRadius:20,
        backgroundColor:'#ff0000',   
        shadowColor:'#000000'   ,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    horizantalLine:{
        flex: 1, 
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: '3%',
    },
    orOption:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold'
    },
    linkButton:{
        color: 'blue',
       marginLeft: 5

    }
});