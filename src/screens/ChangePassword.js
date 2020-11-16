import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../contexts/UserContext';
import {Alert} from 'react-native';
import axios from 'axios';

const ChangePassword = ({navigation}) => {
  //create user context
  const user = useContext(UserContext);


  //define
  const [email] = useState(() => {if (user.email) {return user.email;} else {return '';}});
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confNewPass, setConfNewPass] = useState('');

  const updatePass = async()=>{
    handleConfNewPass();
    if(checkPass){
      const url = 'http://192.168.1.189/PHP-API/updatePass.php';
      //there is a timout parameter set for 2 sec
      //reference: https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68
      const results = await axios.post(url, {
          email: email,
          oldPass: oldPass,
          password: newPass,
      }, {
          timeout: 2000
      }).then(res => res.data).catch(err => {
          console.log(err.code)
          console.log(err.message)
      })
      console.log(results)

      if(results === 'Update password successful'){
        alert('Password change successful!')
      }
      else{
        alert('Password change unsuccessful.')
      }
    }
    else{
      alert('Password does not match')
    }
   
  }
  /*const submit = () => {
    alert('Password Updated');
  };*/
  
   //Validation flags
  const [checkPass, setCheckPass] = useState(false);

  const handleConfNewPass = () => {
    if(confNewPass === newPass){
      console.log('Same pass')
      setCheckPass(true)
    }
    else{
      console.log('Diff pass')
      setCheckPass(false)
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name='arrow-left-circle' size={30} paddingVertical={50}></Icon>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Update Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Current password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(oldPass) => setOldPass(oldPass)}
      />
      <TextInput
        secureTextEntry
        placeholder="New password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(newPass) => setNewPass(newPass)}
      />
      <TextInput
        secureTextEntry
        placeholder="Re-type new password"
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={(confNewPass) => setConfNewPass(confNewPass)}
        onEndEditing={() => handleConfNewPass()}
      />
      <TouchableOpacity
        title="Save Changes"
        style={styles.button}
        onPress={async () => {
          try {
            await updatePass();
          } catch (e) {
            Alert.alert("Error: Couldn't update password.");
            console.log('Error: ' + e.message);
          }
        }}>
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
