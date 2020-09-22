import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

const HomeScreen =() =>{
    return (
        <View style={styles.container}>
        <ImageBackground blurRadius={3} style={styles.backgroundImage} source={require('../images/Trace-3D.png')}>
            <TouchableOpacity style={styles.button}> //NEED to add reroute to dashboard
                <Text style={styles.buttonText}>Health Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}> //NEED to add reroute to AST
                <Text style={styles.buttonText}>Active Stand-up Test (AST)</Text>
            </TouchableOpacity>
        </ImageBackground> 
    </View>
    );

};

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

export default HomeScreen;