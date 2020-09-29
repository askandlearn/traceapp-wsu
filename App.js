import React from 'react';
import {createAppContainer, Image} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HealthDashboardScreen from './src/screens/HealthDashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DrawerMenu from './src/screens/DrawerMenu';

const NavDrawer= createDrawerNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen
  },
    {
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