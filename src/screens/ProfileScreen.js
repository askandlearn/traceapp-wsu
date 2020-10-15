import React, {useState} from 'react';
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
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const ProfileScreen = (props) => {
  /*
    props that should be passed when calling this screen
    name:
    DOB:
    Address:
    Password(?):
    */
  const [name, editName] = useState('John Doe');
  const [email, setEmail] = useState('example@email.com');
  const [dob, editDOB] = useState('July 22, 1999');
  const [buttonText, setButtonText] = useState('Edit');
  const [address, editAddress] = useState('');
  const [isEditable, editEditable] = useState(false);

  const onEdit = () => {
    alert('You can now edit your profile');
    editEditable(true);
  };

  //save changes
  const saveChanges = () => {

    alert('Changes saved!');
    editEditable(false);
  };

  const chooseButtonAction = () => {
    console.log('In choose action...')
    if(buttonText === 'Edit'){
      setButtonText('Save')
      onEdit();
    }
    else{
      setButtonText('Edit')
      saveChanges();
    }
  }

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingScrollView>
        <Header openDrawer={props.navigation.openDrawer} />
        <View style={styles.header} />
        <Text style={styles.title}>Profile</Text>
        <View style={styles.body}>
          <View style={[styles.horizontal, styles.name]}>
            <TextInput    
              value={name}
              editable={isEditable}
              style={styles.name}
              onChangeText={(name) => editName(name)}
            />
          </View>
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Email: </Text>
            <TextInput
              value={email}
              editable={isEditable}
              style={styles.content}
              onChangeText={(email) => setEmail(email)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Date of Birth: </Text>
            <TextInput
              value={dob}
              editable={isEditable}
              style={styles.content}
              onChangeText={(dob) => editDOB(dob)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Address: </Text>
            <TextInput
              placeholder="Add address"
              placeholderTextColor="transparent"
              value={address}
              editable={isEditable}
              style={styles.content}
              onChangeText={(address) => editAddress(address)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 20}} />
            <Button
              title={buttonText}
              color="#ff0000"
              // onPress={buttonText => chooseButtonAction(buttonText)}
              onPress={() => chooseButtonAction()}
              
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
    backgroundColor: '#b7b7b7',
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
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 275,
  },
  body: {
    marginTop: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
    padding: 20,
    alignSelf: 'center',
    color: 'black'
  },
  content: {
    // margin: 10,
    fontSize: 20,
    color: 'black'
  },
  contentTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
