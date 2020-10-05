import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Header =({openDrawer})=>(
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>openDrawer()}>
            <Icon name ="bars" size={30} />
        </TouchableOpacity>
        <Text style={{width:45}}></Text>
    </View>
);

const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:60,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20,
    },
    backgroundImage:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:70,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
      title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color:'#202020',
        fontWeight:'bold',
        fontSize: 30
        },
})

export default Header;