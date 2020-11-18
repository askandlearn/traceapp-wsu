import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {connect} from 'react-redux';

//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recordings: state.BLE.recordings.recordings
  })


const SyncDataScreen = props => {
    return (
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <Text style={styles.title}>Recording History</Text>
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
    }
})

export default connect(mapStateToProps,null) (SyncDataScreen);