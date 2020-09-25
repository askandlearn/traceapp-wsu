import {createAppContainer, Image} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import DrawerMenu from './src/screen/DrawerMenu';



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
    NavDrawer: NavDrawer,
  },
  {
    initialRouteName: 'NavDrawer',
  });

  

const Container = createAppContainer(Navigator);


export default function App();
return <Container />;
