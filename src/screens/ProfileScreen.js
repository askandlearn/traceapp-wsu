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
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAuth} from '../hooks/useAuth';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';
import { useScreens } from 'react-native-screens';

const ProfileScreen = (props) => {
  /*
    props that should be passed when calling this screen
    name:
    DOB:
    Address:
    Password(?):
    */

  //avatar text
  //UserContext only has one value: user
  const user = useContext(UserContext);
  const {update} = useContext(AuthContext);

  //Load in logout function from AuthContext
  const {logout} = useContext(AuthContext);

  const [name, editName] = useState(() => {if (user.name) {return user.name;} else {return '';}});
  const [email, setEmail] = useState(() => {if (user.email) {return user.email;} else {return '';}});
  const [dob, editDOB] = useState(() => {if (user.birthdate) {return user.birthdate;} else {return '';}});
  const [address, editAddress] = useState(() => {if (user.address) {return user.address;} else {return '';}});
  const [height, editHeight] = useState(() => {if (user.height) {return user.height;} else {return '';}});
  const [weight, editWeight] = useState(() => {if (user.weight) {return user.weight;} else {return '';}});
  const [changeText, setChangeText] = useState('Edit');
  const [isEditable, editEditable] = useState(false);

  const [checkValidations, setCheckValidations] = useState({
    diffAddress: false,
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
  const checkAddress = (val) =>{
    if(val === user.address || val === ''){
      console.log('No changes made')
    }
    else{
      console.log('Different')
      editAddress(val);
      setCheckValidations({
        ...checkValidations,
        diffAddress: true
      });
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
    if (isEditable) {
      //POST Request to Update DB
      if(checkValidations.diffAddress || checkValidations.diffHeight || checkValidations.diffWeight){
        console.log('Calling update')
        try{
          await update(email,address,height,weight);
          setCheckValidations({
            ...checkValidations,
            diffAddress: false,
            diffHeight: false,
            diffWeight: false
          })
        }
        catch(err){
          console.log('Error in saveChanges():',err.message)
        }
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
              value={name}
              editable={false}
              style={styles.name}/>
          </View>
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Email: </Text>
            <TextInput
              value={email}
              editable={false}
              style={styles.content}/>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Date of Birth: </Text>
            <TextInput
              value={dob}
              editable={false}
              style={styles.content}/>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Address: </Text>
            <TextInput
              placeholder='Add address'
              placeholderTextColor="#a1a2a6"
              textContentType='addressCityAndState'
              value={address}
              editable={isEditable}
              style={styles.content}
              onChangeText={(address) => editAddress(address)}
              onEndEditing={(e) => checkAddress(e.nativeEvent.text)}/>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Height (cm): </Text>
            <TextInput
              placeholder='Add Height'
              placeholderTextColor="#a1a2a6"
              value={height}
              editable={isEditable}
              style={styles.content}
              onChangeText={(height) => editHeight(height)}
              onEndEditing={(e) => checkHeight(e.nativeEvent.text)}/>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Weight (lbs): </Text>
            <TextInput
              placeholder='Add Weight'
              placeholderTextColor="#a1a2a6"  
              value={weight}
              editable={isEditable}
              style={styles.content}
              onChangeText={(weight) => editWeight(weight)}
              onEndEditing={(e) => checkWeight(e.nativeEvent.text)}/>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <View style={{paddingVertical: 10}}></View>
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
    color:'black'
  },
  content: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black' 
  },
  contentTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  save: {
    //come back to style the save button
    marginTop: 10,
  },
});

export default ProfileScreen;
