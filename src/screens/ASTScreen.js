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
                <View style={styles.NavBarDivider}/>
                 <Text style={{paddingHorizontal: 30, fontSize: 16, paddingVertical: 15 }}>
                      Welcome to the Active Standup Test. This test will provide TRACE with important data regarding your blood flow dynamics.</Text>
                      <View style={styles.NavBarDivider}/>
                      <Text style={{paddingHorizontal:30, paddingVertical: 15, fontSize: 16}}>To begin, lay flat on your back. Wait 3 minutes. After 3 minutes pass, stand back up.</Text>
                    <View style={styles.NavBarDivider}/>
                    <Text style={{paddingHorizontal: 30, fontSize: 16, paddingVertical: 15 }}>NOTE: While the test is being conducted, your TRACE device will continue to run analytics. After the 3 minute mark, please make sure to stand still to ensure your TRACE device performs accurate diagnostics.</Text>
                    <View style={styles.NavBarDivider}/>
                 {/*<Text style={{paddingHorizontal:50, fontStyle: 'italic'}}>1. Lay flat on your back</Text>
                 <Text style={{paddingHorizontal:50, fontStyle: 'italic'}}>2. Wait 3 minutes</Text>
    <Text style={{paddingHorizontal:50}}>3. After 3 minutes pass, stand back up</Text>*/}
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
        marginTop:10,
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
    },
    NavBarDivider:{
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    }
});