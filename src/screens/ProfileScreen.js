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
  const [address, editAddress] = useState('');
  const [height, editHeight] = useState('');
  const [weight, editWeight] = useState('');
  const [active, editActive] = useState('');
  const [isEditable, editEditable] = useState(true);

  /*const onEdit = () => {
    alert('You can now edit your profile');
    editEditable(true);
  };*/

  //save changes
  const saveChanges = () => {
    alert('Changes saved!');
    editEditable(true);
  };

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingScrollView>
        <Header openDrawer={props.navigation.openDrawer} />
        {/*<Image
          style={styles.backgroundImage}
          source={require('../images/TraceBio-Black.png')}
        />
        */}
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png',
          }}
        />
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
            title="Save Changes"
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
    //position: 'absolute',
    marginTop: 25,
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
    margin: 20,
    fontSize: 20,
  },
  contentTitle: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
  },
  save: {
    //come back to style the save button
    marginTop: 10,
  },
});

export default ProfileScreen;
