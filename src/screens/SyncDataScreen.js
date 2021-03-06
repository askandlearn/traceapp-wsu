import React, { useContext,useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, FlatList} from 'react-native'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { removeSync } from '../actions/actionCreators';
import DeviceInfo from 'react-native-device-info';  
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

//require module
var RNFS = require('react-native-fs');

const mapStateToProps = state => ({
    recordings: state.UNSYNCED.unsynced
})

const mapDispatchToProps = dispatch => ({
    remove: (user) => dispatch(removeSync(user))
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
    const user = useContext(UserContext)
    const [LAST, setLast] = useState(() => {
        if(user.username in props.recordings)
            return props.recordings[user.username].files.length - 1
        else
            return
    })  //last index


    const renderItem = (prop) => {
        return(
            <TouchableOpacity onPress={() => props.navigation.navigate('FileModal', {file: prop.item})}>
                <Recording recording={prop.item}/>
            </TouchableOpacity>
        )
    }

    const remove = () => {
        if(!LAST){
            console.log('Empty')
        }
        else{
            upload(props.recordings[user.username])
        }
    }
    
    const upload = async (user) => {
        //get file path
        const {files, info} = user
        var path = RNFS.DocumentDirectoryPath + '/' + files[LAST];

        //get saved session info
        const session = info[LAST]
        const {start_time, label, description, comment} = session


        //get all the device information
        const app_version = DeviceInfo.getVersion()
        const app_hardware = DeviceInfo.getModel()
        const app_os = DeviceInfo.getSystemName()
        const app_os_version = DeviceInfo.getSystemVersion()


      //reference: https://stackoverflow.com/questions/56235286/react-native-post-form-data-with-object-and-file-in-it-using-axios
      //reference: https://stackoverflow.com/questions/61585437/how-to-send-post-request-with-files-in-react-native-android
      //file type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

        //text file cannot be empty, else it will fail
        var datafile = {
            uri: 'file://' + path,  //for android 'file://' needs to be appended to the uri. not sure if this is the same case for iOS. wiil need to test
            type: 'text/plain', 
            name: files[LAST]   //name of test file
        }
        // console.log('In upload...')
        const formData = new FormData()
        formData.append("start_time",start_time)    //ISO format
        formData.append("label",label)  //HRV, RT, or AST
        formData.append("description",description)  //string
        formData.append('datafile',datafile)    //file
        formData.append("comments",comment) //string
        formData.append("highlight",false)  //always false for now
        formData.append("device_type","HRM-AA") //need a way to get this info from sensor, api field type: HRM-AA, HRM-AB, HRM-BA, HRM-BB
        formData.append("device_sn","1")    //need a way to get this info from sensor, api field type: 1, 2, 3
        formData.append("device_firmware","1.02")   //need a way to get this inform from sensor, api field type: 1.00, 1.02, 1.01, 1.03
        formData.append("app_version", '1.10')  //api field type: 1.00, 1.10, 1.11, 1.12
        formData.append("app_hardware", app_hardware)   //string
        formData.append("app_os", app_os)   //string
        formData.append("app_os_version", app_os_version)   //string


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
            }   //doesn't seem to function for now
            }).catch(err => {
            console.log('error',err.code)
            console.log('error',err.message)
            })
            
            //if there is a network error, response will be null. in this case, it will be caught and the application won't crash
            //if response is successful, the accepted status is 201 - CREATED
            if(response.status == 201){
                console.log('SUCCESS',response.status)
                setLast(LAST-1)
                props.remove()
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.pop()}>
                    <Icon name='arrow-left-circle' style={{color:'#242852'}} size={30} paddingVertical={50}></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Recordings</Text>
                    </View>
                }
                // data={props.recordings}
                data = {props.recordings[user.username]?.files}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View style={{marginBottom: 80}}/>
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='ghost' color='#A0A0A0' size={100} paddingVertical={50}/>
                        </View>
                        <Text style={{color: 'gray', textAlign: 'center'}}>It's a ghost town in here.{'\n'} No unsynced recordings...</Text>
                    </View>
                }
            />       
            <TouchableOpacity onPress={() => remove()} style={styles.button}>
                <Text style={styles.buttonText}>Sync</Text>
            </TouchableOpacity>
        </View>
    )
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent:'center',
    
      },
      title: {
        alignSelf: 'center',
        color: '#242852',
        fontWeight: 'bold',
        fontSize: 32,
        paddingTop:  15,
        marginBottom:20,
        shadowColor: '#000000',
        shadowOffset: {width: .5, height: 1},
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 1,
        ...Platform.select({
          ios: {
            fontFamily: 
            'AppleSDGothicNeo-Bold'
          },
        }),
      },
    header: {
        width: '100%',
        height: Platform.OS==='ios'?100:60,
        paddingTop:Platform.OS==='ios'?30:10,
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
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: '15%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#ff0000',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width:'60%',
        alignSelf:'center'
      },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    empty:{
        borderWidth: 0,
        borderColor: 'black',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (SyncDataScreen);