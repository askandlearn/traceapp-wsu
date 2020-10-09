import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';

const HRVScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Header openDrawer={navigation.openDrawer} />
        <ScrollView style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../images/TraceBio-Black.png')}
        />
         <Text style={{paddingBottom: 70}}>Welcome to the Heart Rate Variability Screen</Text>
         <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>Start</Text>
         </TouchableOpacity>
        </ScrollView>
        
      </View>
    );
  };
  
  export default HRVScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    backgroundImage: {
        alignSelf: 'center',
        marginTop: 10,
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
      paddingHorizontal: 10,
    },
    ASTfigure: {
      width: 210,
      height: 214,
      alignSelf: 'center',
      marginBottom: 20,
    },
    NavBarDivider: {
      height: 1,
      width: '100%',
      backgroundColor: 'lightgray',
      marginVertical: 10,
    },
  });
  