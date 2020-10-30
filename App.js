/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Tracebio background color hex:#242852

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

<<<<<<< HEAD
//Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DrawerMenu from './src/screens/DrawerMenu';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ASTScreen from './src/screens/ASTScreen';
import SettingsMenu from './src/screens/SettingsMenu';
import TraceConnect from './src/screens/TraceConnectScreen';
import HealthInformation from './src/screens/HealthInformationScreen';
import SensorsComponent from './src/components/SensorsComponent';

const NavDrawer = createDrawerNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsMenu,
    AST: ASTScreen,
    HealthInformation: HealthInformation,
    TraceConnect: TraceConnect,
    Sensor: SensorsComponent,
  },
  {
    //Set the Welcome Page as the first page of the app
    initialRouteName: 'Sensor',
    unmountInactiveRoutes: true,
=======
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';

//Theme
import {lightTheme} from './src/themes/light';
import {AuthContext} from './src/contexts/AuthContext';
import {UserContext} from './src/contexts/UserContext';
import {useAuth} from './src/hooks/useAuth';
import {SplashScreen} from './src/screens/SplashScreen';
>>>>>>> prototype-2

const RootStack = createStackNavigator();
// const AuthStack = createStackNavigator();  //not needed

export default function () {
  const {auth, state} = useAuth();

  function renderScreens() {
    //return splash loading is true
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }

    return state.user ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  //For debuggin purpose
  // console.log('State.user',state.user);

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
