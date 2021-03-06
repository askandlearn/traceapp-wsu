/**
 * 
 * @fileoverview This is custom navigation drawer. It contains all the main screens and icons
 * @package  Icon library being used is MaterialCommunityIcons
 *
 * @todo refactor code to use an array and flatlist. all the code is repetitive
 * @author Trace Team Fall 2020.
 */
import React, {useContext} from 'react'
import {DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../contexts/AuthContext';
import UserInfo from '../components/UserInfoNav';


export function CusomDrawerComponent({...props}){
    const {logout} = useContext(AuthContext);

    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                    <UserInfo></UserInfo>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 2}}/>
                    <DrawerItem
                        label='Home'
                        icon={({color,size}) => (
                            <Icon name='home-heart' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                        label='Account'
                        icon={({color,size}) => (
                            <Icon name='account' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem
                        label='AST'
                        icon={({color,size}) => (
                            <Icon name='flash' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('AST')}}
                    />
                    <DrawerItem
                        label='HRV'
                        icon={({color,size}) => (
                            <Icon name='heart-pulse' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('HRV')}}
                    />
                    <DrawerItem
                        label='Realtime'
                        icon={({color,size}) => (
                            <Icon name='chart-line' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Realtime')}}
                    />
                    <DrawerItem
                        label='History'
                        icon={({color,size}) => (
                            <Icon name='clipboard-text' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('History')}}
                    />                     
                    <DrawerItem
                        label='Settings'
                        icon={({color,size}) => (
                            <Icon name='cog' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Settings')}}
                    /> 
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    label='Sign Out'
                    icon={({color,size}) => (
                        <Icon name='logout' color={color} size={size}/>
                    )}
                    onPress={async () => logout()}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
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
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'black',
  },
  avatarText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
  },
  drawerItem: {
    alignSelf: 'center',
    marginRight: 2,
    paddingLeft: 2,
  },
});