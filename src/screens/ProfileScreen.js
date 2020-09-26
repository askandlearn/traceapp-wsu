import React, { useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    TextInput, 
    Button,
    ScrollView,
    KeyboardAvoidingView, 
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; //need to run npm install --save react-native-vector-icons


const ProfileScreen = (props) => {
/*
    props that should be passed when calling this screen
    name: 
    DOB:
    Address:
    Password(?):
*/
    //const name = props.name !== undefined ? props.name:'Mohammed Hamza' //default name value
    //const address = '123 Main St, Detroit MI'

    const [name, setName] = useState(props.name !== undefined ? props.name:'Mohammed Hamza')
    const [address, setAddress] = useState('123 Main St, Detroit MI')
    const [isEditable, setEditable] = useState(false)


    //implement edit DOB function
    const editDOB = (dob) => {
        console.log('In editDOB function...')
    }

    //save changes
    const saveChanges = () => {
        console.log('In saveChanges functon ...')
    }

    return (
        <View
        >
            <View style={styles.header}></View>
            <Image 
                style={styles.avatar} 
                source={{uri: 'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png'}}
            />
            <View style={styles.body}>
                <View style={[styles.horizontal, styles.name]}>
                    <TextInput 
                        style={styles.name}
                        editable= {isEditable}
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                    <TouchableOpacity>
                        <Icon
                            name='edit'
                            size={20}
                            style={{marginLeft: 5}}
                            onPress={() => {
                                setEditable(true)
                                alert('You can now make changes to your profile')
                            }}  //need to make name editable for user to change
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.horizontal}>
                    <Text style={styles.content}>Date of Birth: </Text>
                    <TextInput
                        style={styles.content}
                        value='July 22, 1999'
                        editable={isEditable}
                    />
                </TouchableOpacity>
                <View
                    style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                />
                <TouchableOpacity style={styles.horizontal}>
                    <Text style={styles.content}>Address: </Text>
                    <TextInput
                        style={styles.content}
                        value={address}
                        onChangeText={address => setAddress(address)}
                        editable={isEditable}
                    />
                </TouchableOpacity>
                <View
                    style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                />
                <Button
                    title='Save Changes'
                    color='#ff0000'
                    style={styles.save}
                    onPress={() => {
                        //call saveChanges() function
                        //reset isEditable
                        setEditable(false)
                        alert('Changes saved!')
                    }}
                />
            </View>
            <View style={{ flex: 1 }} />
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
      },
      name: {
        fontSize: 25,
        fontWeight: '600',
        margin: 10,
        justifyContent: 'center'
      },
      content: {
          margin: 20,
          fontSize: 20
      },
      horizontal:{
          flexDirection: 'row'
      },
      save: {
          //come back to style the save button
          marginTop: 10,
          flex: 1
      }
});

export default ProfileScreen;