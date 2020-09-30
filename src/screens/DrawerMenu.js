import React, { Component } from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, InteractionManager} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import { NavigationEvents } from 'react-navigation';


const options = [
    {
        name: "Home",
        icon: "ios-home"
    },
    {
        name: "Profile",
        icon: "md-contact"
    },
    {
        name: "AST",
        icon: "ios-heart"
    },
    {
        name: "Settings",
        icon: "ios-settings"
    },
    {
        name: "Log Out",
        icon: "ios-log-out"
    }
];

//implement logout functionality - AsyncStorage
const _logOut = (navigation) => {
    //console.log("Clicked log out!");
    alert('Clicked log out!')
}

class DrawerMenu extends Component {
    render() {
        return(
            <View style={StyleSheet.container}>
                <Image 
                style={styles.avatar} 
                source={{uri: 'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png'}}
            />
            <Text style={styles.profileText}>Mohammad Hamza</Text>
            <Text style={{color:"gray", marginBottom: 10, paddingHorizontal: 50}}>mohammad@hamza.com</Text>
            <View style={styles.NavBarDivider}/>
                <FlatList
                data={options}
                renderItem={({item})=> (
                    <NavItem
                    navigation={this.props.navigation.navigate}
                    name={item.name}
                    icon={item.icon}/>
                )}
                keyExtractor={(item)=>item.name}
                    />
            </View>
        );
    }
};

const NavItem =({navigation, name, icon})=>{
    return(
        <TouchableOpacity style={styles.OptionsItem} onPress={()=> {
                name !== 'Log Out' ? navigation(name) : _logOut(navigation)
            }}>
        <Ionicons name={icon} size={32} style={{padding: 10}}/>
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
       
   },
   avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    marginTop: 20
  },
  profileText: {
      fontWeight: 'bold',
      fontSize: 12,
      marginTop: 10,
      paddingHorizontal: 80
  },
  NavBarDivider:{
      height: 1,
      width: "100%",
      backgroundColor: "lightgray",
      marginVertical: 10
  }

});

export default DrawerMenu;

