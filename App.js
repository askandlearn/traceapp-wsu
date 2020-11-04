/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Tracebio background color hex:#242852

import {createAppContainer, Image} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

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
import SensorAlert from './src/components/ConnectToSensorAlert';
import Timer from './src/components/Timer';
import ASTPlot from './src/components/ASTPlot';
import HRVScreen from './src/screens/HRVScreen';
import ChangePassword from './src/screens/ChangePassword';
import RealTimeScreen from './src/screens/RealTimeScreen';

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
    SensorAlert: SensorAlert,
    Timer: Timer,
    ASTPlot: ASTPlot,
    HRV: HRVScreen,
    ChangePassword: ChangePassword,
    Live: RealTimeScreen,
  },
  {
    //Set the Welcome Page as the first page of the app
    initialRouteName: 'Welcome',
    unmountInactiveRoutes: true,

    defaultNavigationOptions: {
      //Title shows on the header of the app
      title: 'Trace',
      //(
      //     <Image source={require('./src/images/Trace-3D.png')}/>
      // ),
      headerStyle: {
        backgroundColor: '#202020',
      },
      headerTintColor: '#fff',
    },
    contentComponent: DrawerMenu,
  },
);

const Navigator = createStackNavigator(
  {
    TRACE: NavDrawer,
    SensorAlert: SensorAlert,
    TraceConnect: TraceConnect,
  },
  {
    initialRouteName: 'TRACE',
  },
);

const Container = createAppContainer(Navigator);
export default Container;
