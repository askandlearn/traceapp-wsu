import React from 'react'
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import SyncDataScreen from '../screens/SyncDataScreen';
import ModalScreen from '../screens/ModalScreen';
import { Button } from 'react-native';

const SyncDataStack = createStackNavigator();

export function SyncDataStackNavigator(){
    return (
        <SyncDataStack.Navigator mode='modal'>
            <SyncDataStack.Screen name="SyncDataScreen" component={SyncDataScreen} options={{headerShown: false}}/>
            <SyncDataStack.Screen name="FileModal" component={ModalScreen} options={({route}) => ({
                title: route.params.file,
                headerStyle: {
                    backgroundColor: '#ff0000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}/>
        </SyncDataStack.Navigator>
    )
}