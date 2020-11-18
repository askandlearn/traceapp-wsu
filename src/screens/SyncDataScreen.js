import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Button } from 'react-native'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recordings: state.BLE.recordings.recordings
  })


const SyncDataScreen = props => {
    return (
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                <Icon name='arrow-left-circle' size={30} paddingVertical={50}></Icon>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Recordings</Text>
            <Text style={{margin: 10}}>In construction... </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent:'center',
    
      },
    title:{
        alignSelf: 'center',
        //marginHorizontal: '10%',
        marginVertical: 4,
        color: '#202020',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20,
        textAlign:'center'
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
})

export default connect(mapStateToProps,null) (SyncDataScreen);