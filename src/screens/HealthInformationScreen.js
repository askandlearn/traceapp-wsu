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
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


const HealthInfoScreen = ({navigation}) => {
 
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const saveChanges = () => {
    alert('Changes saved!');
  };

  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <Image
        style={styles.backgroundImage}
        source={require('../images/TraceBio-White.png')}
      />
      <Text style={styles.title}>Health Information</Text>
      <KeyboardAvoidingScrollView>
        <TextInput
          placeholder="Height"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(height) => setHeight(height)}
        />
        <Text style={styles.result}>Current Height: {height} ft</Text>
        <TextInput
          placeholder="Weight"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(weight) => setWeight(weight)}
        />
        <Text style={styles.result}>Current Weight: {weight} lbs</Text>
        <TextInput
          placeholder="Activity Level"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(activity) => setActivity(activity)}
        />
        <Text style={styles.result}>Current Activity Level: {activity}</Text>
        <TouchableOpacity
          title="Save"
          style={styles.button}
          onPress={saveChanges}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  container: {
    flex: 1,
    backgroundColor: '#b7b7b7',
    paddingTop: 50,

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
  result: {
    marginHorizontal: '10%',
    marginBottom: 15,
    width: '80%',
    height: 50,
    padding: 13,
    fontWeight: 'bold',
    
    color: 'rgba(0, 0, 0, 1)',
   
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
    width: '60%',
    height: 100,
    resizeMode: 'stretch',
  },

  title: {
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
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
  buttonRow: {
    flexDirection: 'row',
  },
});

export default HealthInfoScreen;
