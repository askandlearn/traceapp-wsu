import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';

const Header =({openDrawer})=>(
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>openDrawer()}>
            <Ionicons name ="ios-menu" size={30} />
        </TouchableOpacity>
        <Text style={{width:45}}></Text>
    </View>
)

const HomeScreen =({navigation}) =>{
    return (
        <View style={styles.container}>
            <Header openDrawer={navigation.openDrawer}/>
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image> 
            <Text style={styles.title}>HOME</Text>
            <Text>Welcome to your Home page</Text>
        </View>
    );

};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7',
        alignItems: 'center'
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
    }
});

export default HomeScreen;