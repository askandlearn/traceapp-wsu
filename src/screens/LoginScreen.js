import React, {Component, useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import { set } from 'react-native-reanimated';
import { Loading } from '../components/Loading-Component';
import { AuthContext } from '../contexts/AuthContext';

const logo = '../images/TraceBio-White.png';

//Create the Login Page
const LoginScreen = (props) => {
  /*
        Its important that the default values for email and password are ''(empty strings) or else if users trys
        to login without inputting anything, null values will passed onto the php script and then the database. The script
        does not know how to handle null values.
    */
  const [email, setEmail] = useState('mohammza@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const  { login } = useContext(AuthContext);

  // const loginUser = () => {
  //   const SUCCESS_MESSAGE = 'Login successful!';
  //   const url = 'http://192.168.7.97/PHP-API/user_registration.php';
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       type: 'signin',
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Showing response message coming from server after inserting records
  //       Alert.alert(responseJson);
  //       if (responseJson == SUCCESS_MESSAGE) {
  //         props.navigation.navigate('Home');
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View>
          <Image style={styles.backgroundImage} source={require(logo)} />
          <Text style={styles.title}>Welcome back!</Text>
        </View>
        <TextInput
          style={styles.inputFields}
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.inputFields}
          label="Password"
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
        <TouchableOpacity
          title="Submit"
          style={styles.button}
          onPress={async () => {
              try{
                setLoading(true)
                await login(email,password)
                setLoading(false)
              }
              catch(e){
                setLoading(false)
                Alert.alert('Error: Couldn\'t sign in')
                console.log('Error: ' + e.message);
              }
            }}>
          <Text style={styles.buttonText} onPress={ async () => {
              try{
                setLoading(true)
                await login(email,password)
                setLoading(false)
              }
              catch(e){
                console.log('Error: ' + e.message);
              }
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <View style={styles.flexContainer}>
          <View style={styles.horizantalLine} />
          <View>
            <Text style={styles.orOption}>Or sign in with</Text>
          </View>
          <View style={styles.horizantalLine} />
        </View>
        <View style={[styles.bottomContainer]}>
          <View style={styles.flexContainer}>
            <Text style={styles.otherText}>Not a member?</Text>
            <TouchableOpacity>
              <Text
                style={styles.linkButton}
                onPress={() => props.navigation.navigate('SignUp')}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
      <Loading loading={loading}/>
    </View>
  );
};
//All styling options created below
const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#b7b7b7',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '25%',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },
  inputFields: {
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 13,
    fontWeight: 'bold',
    borderColor: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  errorMessage: {
    marginHorizontal: '10%',
    position: 'relative',
    color: 'red',
  },
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    color: '#202020',
    fontSize: 25,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  horizantalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: '3%',
  },
  orOption: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkButton: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default LoginScreen;
