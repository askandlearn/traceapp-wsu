import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import * as Animatable from 'react-native-animatable';
import Google from '../components/Google-Component'
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading-Component';

//Create the Sign Up Page

const logo = '../images/TraceBio-Black.png';

//Create variable instances for each required field

const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  

  //export context
  const {register} = useContext(AuthContext);

  //loading state
  const [loading, setLoading] = useState(false);

  //Validation flags
  const [validation_flags, setValidationFlags] = useState({
    isValidUsername: true,
    isValidFirstName: true,
    isValidLastName: true,
    isValidEmail: true,
    isValidBirthdate: true,
    isValidPassword: true,
    isSamePassword: true,
  });

  //Console log each variable for error handling
  const display = () => {
    console.log(username);
    console.log(firstName);
    console.log(lastName);
    console.log(birthdate);
    console.log(email);
    console.log(password);
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 // Validation handling functions start here
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 //Username
  const handleUsername = (val) => {
    if (val.trim().length > 0) {
      setValidationFlags({
        ...validation_flags,
        isValidUsername: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidUsername: false,
      });
    }
  };
  //Firstname
  const handleFirst = (val) => {
    if (val.trim().length > 0) {
      setValidationFlags({
        ...validation_flags,
        isValidFirstName: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidFirstName: false,
      });
    }
  };
//Lastname
  const handleLast = (val) => {
    if (val.trim().length > 0) {
      setValidationFlags({
        ...validation_flags,
        isValidLastName: true,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidLastName: false,
      });
    }
  };
//Email
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
//Birthdate
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
        isValidBirthdate: false,
      });
    } else {
      setValidationFlags({
        ...validation_flags,
        isValidBirthdate: true,
      });
    }
  };
//Password
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
//Confirm password
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

  const submit = async () => {
    try {
      if(!(username && firstName && lastName && email && password && confirmPass)){
        alert('Fields cannot be blank')
        throw 'Blank field'
      }
      
      if(!validation_flags.isValidUsername || !validation_flags.isValidFirstName || !validation_flags.isValidLastName || !validation_flags.isValidEmail || !validation_flags.isValidBirthdate || !validation_flags.isValidPassword || !validation_flags.isSamePassword) {
        if(!validation_flags.isValidUsername) {
          alert('Invalid Username')
          throw('Invalid Username')
        }
        if(!validation_flags.isValidFirstName) {
          alert('Invalid First Name')
          throw('Invalid Firt Name')
        }
        if(!validation_flags.isValidLastName) {
          alert('Invalid Last Name')
          throw('Invalid Last Name')
        }
        if(!validation_flags.isValidEmail) {
          alert('Invalid Email')
          throw('Invalid Email')
        }
        if(!validation_flags.isValidBirthdate) {
          alert('Invalid Birthdate')
          throw('Invalid Birthdate')
        }
        if(!validation_flags.isValidPassword) {
          alert('Password must be at least 8 characters long')
          throw('Invalid Password')
        }
        if(!validation_flags.isSamePassword){
          alert('Passwords must match')
          throw('Passwords do not match')        
        }
      }
      setLoading(true);
      const user = { username: username, first_name: firstName, last_name: lastName, email: email, password: password }
      await register(
        user,
        props.navigation.navigate,
      );
    } catch (error) {
      console.log('Error: ' + error);
    } finally {
      setLoading(false);
    }
      
  }

//Page display starts here
  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View>
          <Image style={styles.backgroundImage} source={require(logo)} />
          <Text style={styles.title}>Sign up to get started!</Text>
        </View>
        <TextInput
          style={styles.inputFields}
          placeholder="Username"
          value={username}
          onChangeText={(val) => setUsername(val)}
          onEndEditing={(e) => handleUsername(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidUsername ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Field cannot be empty</Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="First name"
          value={firstName}
          onChangeText={(val) => setFirstName(val)}
          onEndEditing={(e) => handleFirst(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidFirstName ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Field cannot be empty</Text>
          </Animatable.View>
        )}
        {/* End of validation prompt */}
        <TextInput
          style={styles.inputFields}
          placeholder="Last name"
          value={lastName}
          onChangeText={(val) => setLastName(val)}
          onEndEditing={(e) => handleLast(e.nativeEvent.text)}
        />
        {/* Insert validation prompt */}
        {validation_flags.isValidLastName ? null : (
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
          onPress={() => submit()}>
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <View style={styles.flexContainer}>
          <View style={styles.horizantalLine} />
          <View>
            {/*<Text style={styles.orOption}>Or sign up with</Text> */}
          </View>
          <View style={styles.horizantalLine} />
        </View>
        {/*<Google height={48} width={300} text={'Sign up with Google'}/> */}
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
      <Loading loading={loading} />
    </View>
  );
};


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: '5%',
    justifyContent: 'space-between',
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
    height: 50,
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
    height: 50,
    marginHorizontal: '10%',
    marginVertical: 5,
    paddingVertical: 13,
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
});

export default SignUpScreen;
