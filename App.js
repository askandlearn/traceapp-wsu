import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';

const navigator= createStackNavigator({
  Welcome: WelcomeScreen
},
{
  //Set the Welcome Page as the first page of the app
  initialRouteName: 'Welcome',
  defaultNavigationOptions:{
  //Title shows on the header of the app
    title: 'TRACE'
  }
});

export default createAppContainer(navigator);
