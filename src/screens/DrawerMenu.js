import React, { Component } from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, InteractionManager} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import { NavigationEvents } from 'react-navigation';


const options = [
    {
        name: "Home",
        icon: "ios-home",
        screenName: "HomeScreen",
        key: 1
    },
    {
        name: "Profile",
        icon: "md-contact",
        screenName: "ProfileScreen",
        key: 2
    },
    {
        name: "Settings",
        icon: "ios-settings",
        screenName: "SettingsScreen",
        key: 3
    }
];

class DrawerMenu extends Component {
    render() {
        return(
            <View style={StyleSheet.container}>
                <FlatList
                data={options}
                renderItem={({item})=> (
                    <NavItem
                    navigation={this.props.navigation}
                    name={item.name}
                    icon={item.icon}
                    screenName={item.screenName}
                    keyExtractor={(item,index)=>index.key}
                    />
                )}
                    />
            </View>
        );
    }
};

const NavItem =({navigation, name, icon, screenName})=>{
    return(
        <TouchableOpacity style={styles.OptionsItem} onPress={()=>navigation.navigate('${screenName}',{isStatusBarHidden: false})}>
        <Ionicons name={icon} size={32}/>
        <Text style={styles.OptionsItemText}>{name}</Text>
    </TouchableOpacity>
    )
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
      },
   OptionsItem:{
       height:60,
       alignItems:"center",
       flexDirection: "row"
   },
   OptionsItemText:{
       fontSize: 20,
       margin: 10,
       fontWeight: 'bold',
       paddingHorizontal: 25
       
   }

});

export default DrawerMenu;

