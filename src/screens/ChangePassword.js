import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';

const ChangePassword = ({navigation}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confNewPass, setConfNewPass] = useState('');
  const submit = () => {
    alert('Password Updated');
  };

  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <Text style={styles.title}>Update Password</Text>
      <TextInput
        placeholder="Current password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(oldPass) => setOldPass(oldPass)}
      />
      <TextInput
        placeholder="New password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(newPass) => setNewPass(newPass)}
      />
      <TextInput
        placeholder="Re-type new password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(confNewPass) => setConfNewPass(confNewPass)}
      />
      <TouchableOpacity
        title="Save Changes"
        style={styles.button}
        onPress={submit}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
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
    paddingBottom: 30,
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
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    marginHorizontal: '10%',
    marginVertical: 5,
    width: '80%',
    height: 50,
    padding: 13,
    fontWeight: 'bold',
    borderColor: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 20,
  },
});

export default ChangePassword;
