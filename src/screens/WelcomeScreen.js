import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

//Create the Welcome Page
const WelcomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={3}
        style={styles.backgroundImage}
        source={require('../images/Trace-3D.png')}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              STYLE SHEET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
});

export default WelcomeScreen;
