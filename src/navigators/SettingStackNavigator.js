
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import SettingsMenu from '../screens/SettingsMenu';
import TraceConnect from '../screens/TraceConnectScreen';
import { SyncDataStackNavigator } from './SyncDataStackNavigator';

const SettingStack = createStackNavigator()

export function SettingStackNavigator(){
    return (
        <SettingStack.Navigator screenOptions={{headerShown: false}}>
            <SettingStack.Screen name={'SettingsMenu'} component={SettingsMenu}/>
            <SettingStack.Screen name={'TraceConnect'} component={TraceConnect}/>
            <SettingStack.Screen name={'SyncData'} component={SyncDataStackNavigator}/>
        </SettingStack.Navigator>
    )
}

