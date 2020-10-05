import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, InteractionManager} from 'react-native';


const options = [
    {
        name: "Home",
        icon: "home"
    },
    {
        name: "Profile",
        icon: "user"
    },
    {
        name: "AST",
        icon: "heartbeat"
    },
    {
        name: "Settings",
        icon: "cog"
    },
    {
        name: "Log Out",
        icon: "sign-out"
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
            <Text style={styles.profileText}>John Doe</Text>
            <Text style={styles.emailText}>example@email.com</Text>
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
        <Icon name={icon}  size={32} style={{padding: 10}}/>
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
      fontSize: 13,
      marginTop: 10,
      paddingHorizontal: 80,
      alignSelf: 'center'
  },
  NavBarDivider:{
      height: 1,
      width: "100%",
      backgroundColor: "lightgray",
      marginVertical: 10
  },
  emailText:{
    color:"gray", 
    marginBottom: 10, 
    paddingHorizontal: 50,
    fontSize: 12,
    alignSelf: 'center'
  }

});

export default DrawerMenu;

