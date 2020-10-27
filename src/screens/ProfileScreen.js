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

  //Load in logout function from AuthContext
  const {logout} = useContext(AuthContext);

  const [name, editName] = useState(() => {
    if (user) {
      return user.name;
    } else {
      return '';
    }
  });
  const [email, setEmail] = useState(() => {
    if (user) {
      return user.email;
    } else {
      return '';
    }
  });
  const [dob, editDOB] = useState(() => {
    if (user) {
      return user.birthdate;
    } else {
      return '';
    }
  });
  const [address, editAddress] = useState('');
  const [height, editHeight] = useState('');
  const [weight, editWeight] = useState('');
  const [active, editActive] = useState('');
  const [changeText, setChangeText] = useState('Edit');
  const [isEditable, editEditable] = useState(false);

  const initialzeAvatarText = () => {
    if (user) {
      const [first, last] = user.name.split(' ');
      return first[0] + last[0];
    } else {
      return '';
    }
  };

  const [initials, setInitials] = useState(initialzeAvatarText());

  //save changes
  const saveChanges = () => {
    if (isEditable) {
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
              editable={isEditable}
              style={styles.name}
              onChangeText={(name) => editName(name)}
            />
            {/*}
            <TouchableOpacity>
              <Icon
                name="edit"
                size={20}
                style={{marginLeft: 5}}
                onPress={() => onEdit()} //need to make name editable for user to change
              />
        </TouchableOpacity>*/}
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
              placeholder="No address provided"
              placeholderTextColor="#fff"
              value={address}
              editable={isEditable}
              style={styles.content}
              onChangeText={(address) => editAddress(address)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Height (ft): </Text>
            <TextInput
              placeholder="0"
              placeholderTextColor="#fff"
              value={height}
              editable={isEditable}
              style={styles.content}
              onChangeText={(height) => editHeight(height)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Weight (lbs): </Text>
            <TextInput
              placeholder="0 lbs"
              placeholderTextColor="#fff"
              value={weight}
              editable={isEditable}
              style={styles.content}
              onChangeText={(weight) => editWeight(weight)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
          <TouchableOpacity style={styles.horizontal}>
            <Text style={styles.contentTitle}>Activity level: </Text>
            <TextInput
              placeholder="0 ft"
              placeholderTextColor="#fff"
              value={active}
              editable={isEditable}
              style={styles.content}
              onChangeText={(active) => editActive(active)}
            />
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
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
    fontSize: 25,
    fontWeight: '600',
    padding: 20,
    alignSelf: 'center',
  },
  content: {
    fontSize: 20,
    alignSelf: 'center',
<<<<<<< HEAD
    textAlign: 'center',
=======
    textAlign:'center',
    color: 'black'
>>>>>>> 771d5c2fece498047f130c339e656a8ea32bd21c
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
