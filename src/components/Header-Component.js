import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

const Header = ({openDrawer}) => (
  <View style={{paddingBottom: 0}}>
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Icon name="menu" size={30} paddingVertical={50} color='white' />
    </TouchableOpacity>
  </View>
  </View>
  
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
   //justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    padding: Platform.OS === 'ios' ? 20 : 10,
    // backgroundColor: '#ff0000'
    // backgroundColor: '#000030'
    backgroundColor: '#242852',

  },
  backgroundImage: {
    alignSelf: 'center',
   // justifyContent: 'space-between',
   // marginTop: 30,
    //marginBottom: 70,
    width: '20%',
    height: 35,
    resizeMode: 'stretch',
    paddingLeft: 120,
    marginLeft: 90,
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
  }

});

export default Header;
