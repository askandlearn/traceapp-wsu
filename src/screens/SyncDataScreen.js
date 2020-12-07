import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import { removeSync } from '../actions/actionCreators';
import { sleep } from '../utils/sleep';
import DeviceInfo from 'react-native-device-info';  
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recordings: state.UNSYNCED.unsynced.files,
    info: state.UNSYNCED.unsynced.info,
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

    const user = useContext(UserContext)
    const [LAST, setLast] = useState(props.recordings.length - 1)

    const remove = () => {
        upload(props.recordings[LAST])
        // props.remove()

        // const app_version = DeviceInfo.getVersion()
        // const app_hardware = DeviceInfo.getModel()
        // const app_os = DeviceInfo.getSystemName()
        // const app_os_version = DeviceInfo.getSystemVersion()

        // console.log(app_version);
    }
    
    const upload = async (file) => {
        //get file path
        var path = RNFS.DocumentDirectoryPath + '/' + file;

        //get saved session info
        const session = props.info[LAST]
        const {start_time, label, description, comment} = session


        //get all the device information
        const app_version = DeviceInfo.getVersion()
        const app_hardware = DeviceInfo.getModel()
        const app_os = DeviceInfo.getSystemName()
        const app_os_version = DeviceInfo.getSystemVersion()


        var datafile = {
            uri: 'file://' + path,  //for android 'file://' needs to be appended to the uri. not sure if this is the same case for iOS. wiil need to test
            type: 'text/plain',
            name: file    //name of test file
        }
        // console.log('In upload...')
        const formData = new FormData()
        formData.append("start_time",start_time)
        formData.append("label",label)
        formData.append("description",description)
        formData.append('datafile',datafile)
        formData.append("comments",comment)
        formData.append("highlight",false)
        formData.append("device_type","HRM-AA")
        formData.append("device_sn","2")    //need a way to get this info
        formData.append("device_firmware","1.02")   //need a way to get this info
        formData.append("app_version", "1.00")  
        formData.append("app_hardware", app_hardware)
        formData.append("app_os", app_os)
        formData.append("app_os_version", app_os_version)

    
    
        //debugging purposes
        // console.log('FORMDATA object appended to')
        // console.log(formData)
    
        //axios request
        try {
            const response = await axios({
            url: 'http://134.209.76.190:8000/api/Recording',
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':`Token ${user.token}`
            },
            onUploadProgress: function(progressEvent){
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
            }).catch(err => {
            console.log('error',err.code)
            console.log('error',err.message)
            })
            
            //if there is a network error, response will be null. in this case, it will be caught and the application won't crash
            //if response is successful, the accepted status is 201 - CREATED
            if(response.status == 201){
                console.log('SUCCESS',response.status)
                // setLast(LAST-1)
                // props.remove()
                alert('Success')
            }
            else{
                console.log('FAILURE',response.status)
                alert('Unable to sync. Please try again later.')
            }
        } catch (error) {
            console.log('TRY..CATCH',error.message)
            alert('Unable to sync. Please try again later.')
            // props.add(user.username, file)
        }
    }

    return (
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
             <KeyboardAvoidingScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <Icon name='arrow-left-circle' size={30} paddingVertical={50}></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={
                    <View>
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
           
            </KeyboardAvoidingScrollView>
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
        marginVertical: 30,
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