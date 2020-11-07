import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAuth} from '../hooks/useAuth';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import { useScreens } from 'react-native-screens';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileScreen = (props) => {
  /*
    props that should be passed when calling this screen
    name:
    DOB:
    zip:
    Password(?):
    */

  //avatar text
  //UserContext only has one value: user
  const user = useContext(UserContext);
  const {update} = useContext(AuthContext);

  //Load in logout function from AuthContext
  const {logout} = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user)

  const [changeText, setChangeText] = useState('Edit');
  const [isEditable, editEditable] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [checkValidations, setCheckValidations] = useState({
    diffzip: false,
    diffHeight: false,
    diffWeight: false,
  })

  const initialzeAvatarText = () => {
    if (user) {
      const [first, last] = user.name.split(' ');
      return first[0] + last[0];
    } else {
      return '';
    }
  };

  const [initials, setInitials] = useState(initialzeAvatarText());

  //check if new value is different from old value
  const checkzip = (val) =>{
    if(val.length != 5){
      console.log('Invalid zip')
    }
  }
  const checkHeight = (val) =>{
    if(val === user.height || val === ''){
      console.log('No changes made')
    }
    else{
      console.log('Different')
      editHeight(val);
      setCheckValidations({
        ...checkValidations,
        diffHeight: true
      });

    }
  }
  const checkWeight = (val) =>{
    if(val === user.weight || val===''){
      console.log('No changes made')
    }
    else{
      console.log('Different')
      editWeight(val);
      setCheckValidations({
        ...checkValidations,
        diffWeight: true
      });
    }
  }

  //save changes
  const saveChanges = async () => {
    console.log(currentUser)
    if (isEditable) {
      //POST Request to Update DB
      console.log('Calling update')
      try{
        await update(currentUser);
      }
      catch(err){
        console.log('Error in saveChanges():',err.message)
      }
      
      setChangeText('Edit');
      editEditable(false);
    } else {
      setChangeText('Save');
      editEditable(true);
    }
  };


  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingScrollView>
        <Header openDrawer={props.navigation.openDrawer} />
        <View style={styles.header} />
        <View style={styles.avatar}>
          <Text style={styles.avatar_text}>{initials}</Text>
        </View>
        <View style={styles.body}>
          <View style={[styles.horizontal, styles.name]}>
            <TextInput    
              value={currentUser.name}
              editable={false}
              style={styles.name}/>
          </View>
          <Text style={styles.profileCategory}>Basic Info:</Text>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Email: </Text>
            <TextInput
              value={user.email}
              editable={false}
              style={styles.content}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Date of Birth: </Text>
            <TextInput
              value={currentUser.birthdate}
              placeholder='mm/dd/yyyy (optional)'
              placeholderTextColor="#a1a2a6"
              editable={isEditable}
              style={styles.content}
              onChange={(birthdate) => setCurrentUser({...currentUser, birthdate: birthdate})}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <View style={{paddingBottom: 40}}/>
          <Text style={styles.profileCategory}>Additional Info:</Text>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Zip: </Text>
            <TextInput
              placeholder='Zip (optional)'
              placeholderTextColor="#a1a2a6"
              textContentType='postalCode'
              value={currentUser.zip}
              editable={isEditable}
              style={styles.content}
              onChangeText={(zip) => setCurrentUser({...currentUser, zip: zip})}
              onEndEditing={(e) => checkzip(e.nativeEvent.text)}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Height (cm): </Text>
            <TextInput
              placeholder='Height (optional)'
              placeholderTextColor="#a1a2a6"
              value={currentUser.height}
              editable={isEditable}
              style={styles.content}
              onChangeText={(height) => setCurrentUser({...currentUser, height: height})}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Weight (lbs): </Text>
            <TextInput
              placeholder='Weight (optional)'
              placeholderTextColor="#a1a2a6"  
              value={currentUser.weight}
              editable={isEditable}
              style={styles.content}
              onChangeText={(weight) => setCurrentUser({...currentUser, weight: weight})}/>
          </TouchableOpacity>
          <View style={styles.contentBorder} />
          <View style={{paddingVertical: 30}}></View>
          <Button
            title={changeText}
            color="#ff0000"
            style={styles.save}
            onPress={saveChanges}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={{marginTop: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  inputFields: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    fontWeight: 'bold',
    opacity: 0.4,
    borderRadius: 3,
  },
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    //alignSelf: 'center',
    //width: '60%',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    //backgroundColor: '#ff0000',
    //height: 200
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: 25,
    backgroundColor: 'black',
  },
  avatar_text: {
    alignSelf: 'center',
    fontSize: 75,
    color: 'white',
  },
  body: {
    //marginTop: 100,
    alignSelf: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    padding: 20,
    alignSelf: 'center',
    color:'black',
    fontStyle: 'italic',
  },
  content: {
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    //margin: 10,
   marginHorizontal: '10%',
    //marginVertical: 5,
  },
  contentTitle: {
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  save: {
    //come back to style the save button
    //marginTop: 10,
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  profileCategory: {
    fontSize: 22,
    //fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',

  },
  contentBorder: {
    borderBottomColor: 'gainsboro', 
    borderBottomWidth: 1
  }
});

export default ProfileScreen;
