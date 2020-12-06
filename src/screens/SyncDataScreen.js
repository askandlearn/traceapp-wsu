import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import { removeSync } from '../actions/actionCreators';
import { sleep } from '../utils/sleep';

//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recordings: state.UNSYNCED.unsynced.files
})

const mapDispatchToProps = dispatch => ({
    remove: () => dispatch(removeSync())
})
  

const Recording = ({recording}) => {    
    return (
        <View style={styles.recording}>
            <Text style={styles.file}>{recording}</Text>
            <Icon 
                name='chevron-right' 
                size={25} 
                color='black'
                style={{marginLeft: 'auto', justifyContent: 'center'}}></Icon>
        </View>
    )
}

const SyncDataScreen = props => {
    const renderItem = (prop) => {
        return(
            <TouchableOpacity onPress={() => props.navigation.navigate('FileModal', {file: prop.item})}>
                <Recording recording={prop.item}/>
            </TouchableOpacity>
        )
    }

    const remove = () => {
        props.remove()
    }

    return (
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => props.navigation.pop()}>
                                <Icon name='arrow-left-circle' size={30} paddingVertical={50}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Recordings</Text>
                    </View>
                }
                // data={props.recordings}
                data = {props.recordings}
                renderItem={renderItem}
                keyExtractor={item => item}
                ListFooterComponent={
                    <View style={{marginBottom: 80}}/>
                }
            />
            <TouchableOpacity onPress={() => remove()} style={styles.button}>
                <Text style={styles.buttonText}>Sync</Text>
            </TouchableOpacity>
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
    recording: {
        borderBottomColor: 'black',
        borderWidth: 0.5,
        margin: 0,
        padding: 15,
        flexDirection: "row",
    },
    file: {
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        width: '50%',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#ff0000',
        position: 'absolute',
        bottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (SyncDataScreen);