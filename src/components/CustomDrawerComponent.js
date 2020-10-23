import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


export function CusomDrawerComponent({...props}){
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                        <DrawerItem
                            label='Home'
                            icon={({color,size}) => (
                                <Icon name='home' color={color} size={size}/>
                            )}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            label='Profile'
                            icon={({color,size}) => (
                                <Icon name='user' color={color} size={size}/>
                            )}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem
                            label='AST'
                            icon={({color,size}) => (
                                <Icon name='heartbeat' color={color} size={size}/>
                            )}
                            onPress={() => {props.navigation.navigate('AST')}}
                        />
                        <DrawerItem
                            label='Settings'
                            icon={({color,size}) => (
                                <Icon name='gear' color={color} size={size}/>
                            )}
                            onPress={() => {props.navigation.navigate('Settings')}}
                        /> 
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    label='Sign Out'
                    icon={({color,size}) => (
                        <Icon name='sign-out' color={color} size={size}/>
                    )}
                    onPress={() => {}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})