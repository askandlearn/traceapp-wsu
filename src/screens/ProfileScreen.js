import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';


const ProfileScreen =({navigation}) =>{
    return (
        <View style={styles.container}>
            <Header openDrawer={navigation.openDrawer}/>
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image> 
            <Text style={styles.title}>PROFILE</Text>
        </View>
    );

};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7'
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
        fontSize: 30
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
    }
/*
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; //need to run npm install --save react-native-vector-icons


const ProfileScreen = (props) => {
    props that should be passed when calling this screen
    name: 
    DOB:
    Address:
    Password(?):
    const name = props.name !== undefined ? props.name:'Mohammed Hamza' //default name value

    //implement edit name function
    const editName = (name) => {
        console.log('In editName function...')
    }

    //implement edit DOB function
    const editDOB = (dob) => {
        console.log('In editDOB function...')
    }

    //save changes
    const saveChanges = () => {
        console.log('In saveChanges functon ...')
    }

    return (
        <View>
            <View style={styles.header}></View>
            <Image 
                style={styles.avatar} 
                source={{uri: 'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png'}}
            />
            <View style={styles.body}>
                <View style={styles.horizontal}>
                    <Text style={styles.name}>{name}</Text>
                    <TouchableOpacity>
                        <Icon
                            name='edit'
                            size={15}
                            style={{marginLeft: 5}}
                            onPress={() => editName()}  //need to make name editable for user to change
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={styles.content}>Date of Birth: July 22, 1999</Text>
                    <View
                        style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.content}>Address: 123 North, Detroit MI</Text>
                    <View
                        style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                    />
                </TouchableOpacity>
                <Button
                    title='Save Changes'
                    color='#ff0000'
                    onPress={saveChanges}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#ff0000',
        height: 200
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      body: {
          marginTop: 100,
          alignSelf: 'center',
      },
      name: {
        fontSize: 25,
        fontWeight: '600',
        padding: 20
      },
      content: {
          margin: 10,
          fontSize: 20,
      },
      horizontal:{
          flexDirection: 'row'
      },
      save: {
          //come back to style the save button
          backgroundColor: 'black'
      }
*/
});

export default ProfileScreen;