/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CusomDrawerComponent} from '../components/CustomDrawerComponent';

//Import screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ASTScreen from '../screens/ASTScreen';
import SettingsMenu from '../screens/SettingsMenu';
import TraceConnect from '../screens/TraceConnectScreen';
import HealthInformation from '../screens/HealthInformationScreen';
import HRVScreen from '../screens/HRVScreen';
import LiveScreen from '../screens/RealTimeScreen';
import RealTimeScreen from '../screens/RealTimeScreen';
import ChangePasswordScreen from '../screens/ChangePassword';
import { SettingStackNavigator } from './SettingStackNavigator';
import HistoryScreen from '../screens/HistoryScreen';


const MainStack = createDrawerNavigator();

export function MainStackNavigator() {
  return(
        <MainStack.Navigator drawerContentOptions={{ activeBackgroundColor: '#5cbbff', activeTintColor: '#ffffff' }} drawerContent={props => <CusomDrawerComponent {...props}/>}>
            <MainStack.Screen name={'Home'} component={HomeScreen}/>
            <MainStack.Screen name={'Profile'} component={ProfileScreen}/>
            <MainStack.Screen name={'AST'} component={ASTScreen}/>
            <MainStack.Screen name={'Settings'} component={SettingStackNavigator}/>
            {/* <MainStack.Screen name={'ChangePassword'} component={ChangePasswordScreen}/> */}
            <MainStack.Screen name={'HealthInformation'} component={HealthInformation}/>
            {/* <MainStack.Screen name={'TraceConnect'} component={TraceConnect}/> */}
            <MainStack.Screen name={'HRV'} component={HRVScreen}/>
            <MainStack.Screen name={'Live'} component={LiveScreen}/>
            <MainStack.Screen name={'History'} component={HistoryScreen}/>
            <MainStack.Screen name={'Realtime'} component={RealTimeScreen}/>
        </MainStack.Navigator>
  )
}
