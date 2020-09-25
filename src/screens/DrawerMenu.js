import React, {component} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import { NavigationEvents } from 'react-navigation';

const options = [
    {
        name: "Home",
        icon: "home",
        screenName: "Home",
        key: 1
    },
    {
        name: "Profile",
        icon: "md-contacts",
        screenName: "Profile",
        key: 2
    },
    {
        name: "Settings",
        icon: "settings",
        screenName: "Settings",
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
                    key={item.key}
                    />
                )}
                    />
            </View>
        );
    }
}

const NavItem =({navigation, name, icon, screenName}
    <TouchableOpacity style={styles.NavItem} onPress={()=>navigation.navigate('${screenName}',{isStatusBarHidden: false})}>
        <Ionicons name={icon} size={32}/>
        <Text style={styles.NavItemText}>{name}</Text>
    </TouchableOpacity>
);

const styles= StyleSheet.create({
    container: {
        flex: 1,
      },
   NavItem:{
       flexDirection: "row"
   },
   NavItemText:{
       fontSize: 20,
       margin: 20
   }

});

export default DrawerMenu;

