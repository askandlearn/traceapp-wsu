import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import SyncDataScreen from '../screens/SyncDataScreen';
import ModalScreen from '../screens/ModalScreen';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SyncDataStack = createStackNavigator();

export function SyncDataStackNavigator(){
    return (
        <SyncDataStack.Navigator mode='modal'>
            <SyncDataStack.Screen name="SyncDataScreen" component={SyncDataScreen} options={{headerShown: false}}/>
            <SyncDataStack.Screen name="FileModal" component={ModalScreen} options={({route,navigation}) => ({
                title: route.params.file,
                headerStyle: {
                    backgroundColor: '#242852',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center'
                },
                headerLeft: null,
                headerRight: () => (
                    <TouchableOpacity>
                        <Icon name="window-close" size={25} color="white" style={{marginRight: 14}} onPress={() => navigation.goBack()}/>
                    </TouchableOpacity>
                )
            })}/>
        </SyncDataStack.Navigator>
    )
}