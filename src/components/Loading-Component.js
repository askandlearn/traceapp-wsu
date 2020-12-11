/**
 * 
 * @fileoverview Simple loading screen. Can be called in any screen or component.
 * A loading prop needs to be passed
 *
 * @todo refactor code to use an array and flatlist. all the code is repetitive
 * @author Trace Team Fall 2020.
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';


export function Loading({loading}){
    if(!loading){
        return <View/>;
    }

    return(
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator color={'black'}/>
                <Text>Loading...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay:{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20,
        borderRadius: 8
    },
    text:{
        marginLeft: 16,
        fontSize: 18,
        fontWeight: '500'
    }
})