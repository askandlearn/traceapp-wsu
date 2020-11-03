import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import DatePicker from 'react-native-datepicker';
import {Form, TextValidator} from 'react-native-validator-form';
import {minNumber} from 'react-native-validator-form/lib/ValidationRules';
import * as Animatable from 'react-native-animatable';
import Google from '../components/Google-Component'

//Create the Sign Up Page

const logo = '../images/TraceBio-White.png';

const SignUpScreen = (props) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //Validation flags
  const [validation_flags, setValidationFlags] = useState({
    isValidFirst: true,
    isValidLast: true,
    isValidEmail: true,
    isValidDate: true,
    isValidPassword: true,
    isSamePassword: true,
    isFilled: false,
  });

  const registerUser = () => {
    checkIsFilled();
    if (!validation_flags.isFilled) {
      Alert.alert('One or more fields are empty or done incorrectly!');
    } else {
      const SUCCESS_MESSAGE = 'User Registered Successfully!';
      const url = 'http://localhost:8080/PHP-API/user_registration.php';
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'signup',
          firstName: first,
          lastName: last,
          date: date,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Showing response message coming from server after inserting records
          Alert.alert(responseJson);
          if (responseJson === SUCCESS_MESSAGE) {
            props.navigation.navigate('Login');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const display = () => {
    console.log(first);
    console.log(last);
    console.log(date);
    console.log(email);
    console.log(password);
  };

  //Validation handling functions start here
  const handleFirst = (val) => {
    if (val.trim().length > 0) {
      setValidationFlags({
        ...validation_flags,
        isValidFirst: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidFirst: false,
      });
    }
  };

  const handleLast = (val) => {
    if (val.trim().length > 0) {
      setValidationFlags({
        ...validation_flags,
        isValidLast: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidLast: false,
      });
    }
  };

  const handleEmail = (val) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (!pattern.test(val)) {
      setValidationFlags({
        ...validation_flags,
        isValidEmail: false,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidEmail: true,
      });
    }
  };

  const handleDate = (val) => {
    const [year, month, day] = val.split('-');

    if (
      year === undefined ||
      month === undefined ||
      day === undefined ||
      year.length < 4 ||
      year.length > 4 ||
      month.length !== 2 ||
      day.length !== 2
    ) {
      setValidationFlags({
        ...validation_flags,
        isValidDate: false,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidDate: true,
      });
    }
  };

  const handlePassword = (val) => {
    if (val.length < 8) {
      setValidationFlags({
        ...validation_flags,
        isValidPassword: false,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidPassword: true,
      });
    }
  };

  const handleConfirmPassword = (val) => {
    setConfirmPass(val);
    if (password === val) {
      setValidationFlags({
        ...validation_flags,
        isSamePassword: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isSamePassword: false,
      });
    }
  };

  const checkIsFilled = () => {
    if (first && last && date && email && password && confirmPass) {
      setValidationFlags({
        ...validation_flags,
        isFilled: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View>
          <Image style={styles.backgroundImage} source={require(logo)} />
          <Text style={styles.title}>Sign up to get started!</Text>
        </View>
        <TextInput
          style={styles.inputFields}
          placeholder="Firstname"
          value={first}
          onChangeText={(val) => setFirst(val)}
          onEndEditing={(e) => handleFirst(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidFirst ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Field cannot be empty</Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Lastname"
          value={last}
          onChangeText={(val) => setLast(val)}
          onEndEditing={(e) => handleLast(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidLast ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Field cannot be empty</Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          onEndEditing={(e) => handleEmail(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Not in valid email format (name@example.com)
            </Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Birthdate (yyyy-mm-dd)"
          value={date}
          onChangeText={(val) => setDate(val)}
          onEndEditing={(e) => handleDate(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidDate ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Format incorrect (yyyy-mm-dd){' '}
            </Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
          onEndEditing={(e) => handlePassword(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Passsword must be at least 8 characters long
            </Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Confirm Password"
          value={confirmPass}
          secureTextEntry
          onChangeText={(val) => handleConfirmPassword(val)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isSamePassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Passswords do not match</Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TouchableOpacity
          title="Submit"
          style={styles.button}
          onPress={registerUser}>
          <Text style={styles.buttonText} onPress={registerUser}>
            CREATE ACCOUNT
          </Text>
        </TouchableOpacity>
        <View style={styles.flexContainer}>
          <View style={styles.horizantalLine} />
          <View>
            <Text style={styles.orOption}>Or sign up with</Text>
          </View>
          <View style={styles.horizantalLine} />
        </View>
        <Google height={48} width={300} text={'Sign up with Google'}/>
        <View style={[styles.bottomContainer]}>
          <View style={styles.flexContainer}>
            <Text style={styles.otherText}>Already a member?</Text>
            <TouchableOpacity>
              <Text
                style={styles.linkButton}
                onPress={() => props.navigation.navigate('Login')}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

//All styling options created below
const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //alignSelf:'center'
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
    marginBottom: '15%',
    marginTop: 10
  },
  nameContainer: {
    // marginHorizontal:'10%',
    marginTop: '5%',
    justifyContent: 'space-between',
    // alignContent:'center',
    alignSelf: 'center',
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },

  firstName: {
    //width:'150%',
    height: 50,
    //marginLeft: '20%',
    // marginVertical: 5,
    padding: 13,
    marginLeft: '10%',

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
  lastName: {
    //width:'150%',
    height: 50,
    marginHorizontal: '10%',
    marginVertical: 5,
    paddingVertical: 13,
    // paddingHorizontal:'13%',
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
  inputFields: {
    width: '80%',
    height: 50,
    marginHorizontal: '10%',
    marginVertical: 5,
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
  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginTop: '3%',
    color: '#202020',
    // fontWeight:'bold',
    fontSize: 25,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '5%',
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
    //width: '60%',
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
  errorMessage: {
    marginHorizontal: '10%',
    position: 'relative',
    color: 'red',
  },

  // icons:{
  //     color:'rgba(255,255,255,0.7)',
  //     position:'absolute',
  // }
});

export default SignUpScreen;
