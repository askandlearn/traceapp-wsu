import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  BackgroundImage,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {UserContext} from '../contexts/UserContext';
import axios from 'axios';
import { addSync, removeRecording } from '../actions/actionCreators';
import DeviceInfo from 'react-native-device-info';  


const MAX_COMMENT = 300  //max number of chars


//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recording: state.BLE['currRecording']
})

const mapDispatchToProps = dispatch => ({
    remove: () => dispatch(removeRecording()),
    add: (user, file) => dispatch(addSync(user, file))
})


const ModalComponent = (props) => {
    const [comment, setComment] = useState('')
    const [description, setDescription] = useState('')
    const [max, setMax] = useState(MAX_COMMENT)
    const user = useContext(UserContext)
    const {start_time, label, file} = props.recording;

    

    var path = RNFS.DocumentDirectoryPath + '/' + file;
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


        var datafile = {
          uri: 'file://' + path,  //for android 'file://' needs to be appended to the uri. not sure if this is the same case for iOS. wiil need to test
          type: 'text/plain',
          name: file    //name of test file
        }

        const example = {
            "start_time": start_time,
            "label": label,
            "description": description,
            "datafile": datafile,
            "comments": comment,
            "highlight": false,
            "device_type": "HRM-AA",
            "device_sn": "2",
            "device_firmware": "1.02",
            "app_version": app_version,
            "app_hardware": app_hardware,
            "app_os": app_os,
            "app_os_version": app_os_version
        }
        console.log(example)
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
        formData.append("app_version", app_version)
        formData.append("app_hardware", app_hardware)
        formData.append("app_os", app_os)
        formData.append("app_os_version", app_os_version)

        
        // Working example
        // formData.append("start_time","2020-11-02T14:50:05Z")
        // formData.append("label","OTC")
        // formData.append("description","OTC 3X with BP.  1st one captured transient: 1: 95/57/42, 121/46/81, 99/55/54")
        // formData.append('datafile',datafile)
        // formData.append("comments","")
        // formData.append("highlight",false)
        // formData.append("device_type","HRM-AA")
        // formData.append("device_sn","2")
        // formData.append("device_firmware","1.02")
        // formData.append("app_version","1.12")
        // formData.append("app_hardware","Moto G5S")
        // formData.append("app_os","Android")
        // formData.append("app_os_version","9.0")
    
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
            props.add(user.username, file)
          }
        } catch (error) {
          console.log('TRY..CATCH',error.message)
          props.add(user.username, file)
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
                    style={{height: 70, color: 'white', borderColor: 'white', borderWidth: 1, backgroundColor: '#A4A4A4'}}
                    value={description}
                    placeholder='Session description...'
                    onChangeText={text => setDescription(text)}
                    maxLength={max}
                    multiline={true}
                    textAlignVertical='top'/>
                <Text style={{color: 'white'}}>Max character: {max}</Text>
                <TextInput
                    style={{height: 50, color: 'white', borderColor: 'white', borderWidth: 1, backgroundColor: '#A4A4A4'}}
                    value={comment}
                    placeholder='Leave a comment...'
                    onChangeText={text => setComment(text)}
                    maxLength={max/2}/>
                <Text style={{color: 'white'}}>Max character: {max/2}</Text>
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