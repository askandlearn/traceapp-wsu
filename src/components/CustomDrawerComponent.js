import React, {useContext} from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../contexts/AuthContext';


export function CusomDrawerComponent({...props}){
    const {logout} = useContext(AuthContext);

    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>DA</Text>
                            </View>
                            <View style={{flexDirection:'column', marginLeft: 15}}>
                                <Text style={styles.title}>Dana Abu</Text>
                                <Text style={styles.caption}>test2@email.com</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 2}}/>
                    <DrawerItem
                        label='Home'
                        icon={({color,size}) => (
                            <Icon name='home' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                        label='Profile'
                        icon={({color,size}) => (
                            <Icon name='user' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem
                        label='AST'
                        icon={({color,size}) => (
                            <Icon name='bolt' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('AST')}}
                    />
                    <DrawerItem
                        label='HRV'
                        icon={({color,size}) => (
                            <Icon name='heartbeat' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('HRV')}}
                    />
                    <DrawerItem
                        label='Live'
                        icon={({color,size}) => (
                            <Icon name='rocket' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Live')}}
                    />
                    <DrawerItem
                        label='Realtime'
                        icon={({color,size}) => (
                            <Icon name='line-chart' color={color} size={size} style={styles.drawerItem}/>
                        )}
                        onPress={() => {props.navigation.navigate('Realtime')}}
                    />
                    <DrawerItem
                        label='Settings'
                        icon={({color,size}) => (
                            <Icon name='gear' color={color} size={size} style={styles.drawerItem}/>
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
        marginBottom: 20
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
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      avatar:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'black'
      },
      avatarText:{
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
      },
      drawerItem:{
        alignSelf: "center",
        marginRight: 2,
        paddingLeft: 2,
      }
})
