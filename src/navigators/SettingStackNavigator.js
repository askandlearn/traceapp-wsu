
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import SettingsMenu from '../screens/SettingsMenu';
import TraceConnect from '../screens/TraceConnectScreen';
import ChangePasswordScreen from '../screens/ChangePassword';
import SyncDataScreen from '../screens/SyncDataScreen';
import { SyncDataStackNavigator } from './SyncDataStackNavigator';

const SettingStack = createStackNavigator()

export function SettingStackNavigator(){
    return (
        <SettingStack.Navigator screenOptions={{headerShown: false}}>
            <SettingStack.Screen name={'SettingsMenu'} component={SettingsMenu}/>
            <SettingStack.Screen name={'TraceConnect'} component={TraceConnect}/>
            <SettingStack.Screen name={'ChangePassword'} component={ChangePasswordScreen}/>
            <SettingStack.Screen name={'SyncData'} component={SyncDataStackNavigator}/>
        </SettingStack.Navigator>
    )
}

