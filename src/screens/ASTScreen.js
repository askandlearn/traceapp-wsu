import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import HealthDashboard from './HealthDashboardScreen';


const ASTScreen =({navigation}) =>{
    return (
        <View style={styles.container}>
            <Header openDrawer={navigation.openDrawer}/>
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image> 
            <ScrollView style={styles.container}>
                <Image style={styles.ASTfigure} source={require('../images/Humanfigure_CirculatorySystem.png')}></Image>
                 <Text style={{padding:20}}>
                      Welcome to the Active Standup Test. This test will provide TRACE with important data regarding your blood flow dynamics.</Text>
                 <Text style={{padding:25}}>Instructions:</Text>
                 <Text style={{padding:25}}>1. Lay flat on your back</Text>
                 <Text style={{padding:25}}>2. Wait 3 minutes</Text>
                 <Text style={{padding:25}}>3. After 3 minutes pass, stand back up</Text>
            </ScrollView>
        </View>
    );

};

export default ASTScreen;

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
        fontSize: 30,
        paddingBottom: 30
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
    },
    header:{
        width:"100%",
        height:60,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20,
    },
    ASTfigure:{
        width: 210,
        height:214,
        alignSelf: 'center',
        marginBottom: 20
    }
});