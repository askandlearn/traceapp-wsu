import { ActivityIndicator, StyleSheet, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {createAppContainer, Image} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import DrawerMenu from './src/screens/DrawerMenu';
import ASTScreen from './src/screens/ASTScreen';
import HealthInformation from './src/screens/HealthInformationScreen';
import SettingsMenu from './src/screens/SettingsMenu';
import TraceConnect from './src/screens/TraceConnectScreen';

const NavDrawer= createDrawerNavigator(
{
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Home: HomeScreen,
  Profile: ProfileScreen,
  Settings: SettingsMenu,
  AST: ASTScreen,
  HealthInformation: HealthInformation,
  TraceConnect: TraceConnect
},
{
  //Set the Welcome Page as the first page of the app
  initialRouteName: 'Welcome',
  unmountInactiveRoutes: true,

  defaultNavigationOptions:{
  //Title shows on the header of the app
  title: 'Trace',
  //(
//     <Image source={require('./src/images/Trace-3D.png')}/>
// ),
    headerStyle: {
      backgroundColor: '#202020'
    },
    headerTintColor: '#fff',
  },
  contentComponent: DrawerMenu
}

);

const Navigator = createStackNavigator(
  {
    TRACE: NavDrawer,
  },
  {
    initialRouteName: 'TRACE',
  });

  

const Container = createAppContainer(Navigator);
export default Container;


/*
//Loading screen
const AuthLoadingScreen = (props) => {
  // _loadData = async () => {
  //   const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  //   console.log(isLoggedIn);
  //   props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App')
  // }
  useEffect( () => {
    async function _loadData() {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      console.log(isLoggedIn);
      // props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
      props.navigation.navigate('Auth'); //comment this and uncomment line above after _logout has been implemented
    }
    _loadData();
  });
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#0000ff'/>
      <StatusBar barStyle='dark-content'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default createAppContainer(createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Root,
    Auth: AuthStack 
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
*/

