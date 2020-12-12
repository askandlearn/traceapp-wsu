/**
 * 
 * @fileoverview This is called upon stopping of any test. This component contains all the logic for send a recording to the database
 *
 * @todo 
 * @author Trace Team Fall 2020.
 */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import { addSync, removeRecording, appendSync } from '../actions/actionCreators';
import DeviceInfo from 'react-native-device-info';  


const MAX_COMMENT = 300  //max number of chars


//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recording: state.BLE['currRecording'],
    recordings: state.UNSYNCED['unsynced']
})

const mapDispatchToProps = dispatch => ({
    remove: () => dispatch(removeRecording()),
    add: (user, file, info) => dispatch(addSync(user, file, info)),
    append: (user, file, info) => dispatch(appendSync(user, file, info))
})


const ModalComponent = (props) => {
    const [comment, setComment] = useState('')
    const [description, setDescription] = useState('')
    const [max, setMax] = useState(MAX_COMMENT)
    const user = useContext(UserContext)
    const {start_time, label, file} = props.recording;

    

    // var path = RNFS.DocumentDirectoryPath + '/' + file;
    var path = RNFS.DocumentDirectoryPath + '/' + file
      //reference: https://stackoverflow.com/questions/56235286/react-native-post-form-data-with-object-and-file-in-it-using-axios
      //reference: https://stackoverflow.com/questions/61585437/how-to-send-post-request-with-files-in-react-native-android
      //file type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    
    const upload = async () => {
        props.setVisible(false)

        //get all the device information
        const app_version = DeviceInfo.getVersion()
        const app_hardware = DeviceInfo.getModel()
        const app_os = DeviceInfo.getSystemName()
        const app_os_version = DeviceInfo.getSystemVersion()

        //text file cannot be empty, else it won't send
        var datafile = {
          uri: 'file://' + path,  //for android 'file://' needs to be appended to the uri. not sure if this is the same case for iOS. wiil need to test
          type: 'text/plain',
          name: file    //name of test file
        }

        const session = {
            "start_time": start_time, //ISO format
            "label": label, //HRV, RT, or AST
            "description": description, //string
            "datafile": datafile, //file
            "comments": comment,  //string
            "highlight": false, //boolean
            "device_type": "HRM-AA",  //need a way to get this info from sensor, api field type: HRM-AA, HRM-AB, HRM-BA, HRM-BB
            "device_sn": "1", //need a way to get this info from sensor, api field type: 1, 2, 3
            "device_firmware": "1.02", //need a way to get this inform from sensor, api field type: 1.00, 1.02, 1.01, 1.03
            "app_version": '1.00', //api field type: 1.00, 1.10, 1.11, 1.12
            "app_hardware": app_hardware, //string
            "app_os": app_os, //string
            "app_os_version": app_os_version //string
        }

        // console.log(session)
        // console.log('In upload...')
        const formData = new FormData()
        formData.append("start_time",start_time)
        formData.append("label",label)
        formData.append("description",description)
        formData.append('datafile',datafile)
        formData.append("comments",comment)
        formData.append("highlight",false)
        formData.append("device_type","HRM-AA")
        formData.append("device_sn","1")    //need a way to get this info
        formData.append("device_firmware","1.02")   //need a way to get this info
        formData.append("app_version", "1.00") //needs to be to be the hundreth value
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
            }
          }).catch(err => {
            console.log('error',err.code)
            console.log('error',err.message)
          })
          
          //if there is a network error, response will be null. in this case, it will be caught and the application won't crash
          //if response is successful, the accepted status is 201 - CREATED
          if(response.status == 201){
            console.log('SUCCESS',response.status)
            // console.log(response)
          }
          else{
            console.log('FAILURE',response.status)
            if(user.username in props.recordings){  //if username already exists in unsynced, append to the list file
              props.appendSync(user.username, file, session)
            }else{  //if username is not in, add it in
              props.add(user.username, file, session)
            }
            alert('Unable to sync. Please sync manually.')
          }
        } catch (error) {
          console.log('TRY..CATCH',error.message)
          if(user.username in props.recordings){  //if username already exists in unsynced, append to the list file
            props.append(user.username, file, session)
          }else{  //if username is not in, add it in
            props.add(user.username, file, session)
          }
          alert('Unable to sync. Please sync manually.')
        } finally {
          setComment('')
          setDescription('')
        }
    }
    

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible}>
            <View style={styles.modal}>
              <View style={styles.modalBox}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', alignSelf: 'center', marginBottom: 10}}>Session Information</Text>
                <TextInput
                    style={{paddingLeft:5, height: 70, color: 'black', borderColor: 'white', borderWidth: 1, backgroundColor: 'white'}}
                    value={description}
                    placeholder='Session description...(optional)'
                    placeholderTextColor='black'
                    onChangeText={text => setDescription(text)}
                    maxLength={max}
                    multiline={true}
                    textAlignVertical='top'/>
                <Text style={{color: 'white'}}>Max characters: {max}</Text>
                <TextInput
                    style={{paddingLeft:5,height: 50, color: 'black', borderColor: 'white', borderWidth: 1, backgroundColor: 'white'}}
                    value={comment}
                    placeholder='Leave a comment...(optional)'
                    placeholderTextColor='black'
                    onChangeText={text => setComment(text)}
                    maxLength={max/2}/>
                <Text style={{color: 'white'}}>Max characters: {max/2}</Text>
                <TouchableOpacity style={styles.button} onPress={() => upload()}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (ModalComponent);

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox:{
        padding: 15,
        borderColor: 'white',
        borderWidth: 2,
        width: '70%',
        backgroundColor: '#00003F',
        borderRadius: 20,
        opacity: 0.95
    },
    button: {
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius: 20,
        backgroundColor: '#ff0000',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },


})