import {createAppContainer, Image} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const navigator= createStackNavigator(
{
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen
  //Add homescreen
},
{
  //Set the Welcome Page as the first page of the app
  initialRouteName: 'Welcome',
  defaultNavigationOptions:{
  //Title shows on the header of the app
  title: 'Trace',
  //(
//     <Image source={require('./src/images/Trace-3D.png')}/>
// ),
    headerStyle: {
      backgroundColor: '#202020'
    },
    headerTintColor: '#fff'
  }
});

export default createAppContainer(navigator);
