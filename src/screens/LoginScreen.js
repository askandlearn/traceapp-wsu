import React, { Component, useState }  from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';

//Create the Login Page
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


const logo= '../images/TraceBio-White.png';

//Create the Login Page
export default class LoginScreen extends Component {
    render(){
        var {navigate} = this.props.navigation;
        return ( 
            <View style={styles.container}>  
                <KeyboardAvoidingScrollView >
                    <View> 
                        <Image style={styles.backgroundImage} source={require(logo)}></Image>    
                        <Text style={styles.title}>Welcome back!</Text>
                    </View>
                    <View>
                        <TextInput placeholder='Email' style={styles.inputFields}></TextInput>
                        <TextInput placeholder='Password' style={styles.inputFields}></TextInput> 
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
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
