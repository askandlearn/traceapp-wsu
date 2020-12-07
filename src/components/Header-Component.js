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
import Svg, { Path } from 'react-native-svg';
const Header = ({openDrawer}) => (
  // <View style={{paddingBottom: 0}}>
  // <View style={styles.header}>
  //   <TouchableOpacity onPress={() => openDrawer()} style={styles.icon}>
  //     <Icon name="menu" size={35} paddingVertical={50} color='white' />
  //   </TouchableOpacity>
  // </View>
  // </View>
  
      <View style={{ backgroundColor: '#242852', height: 80 }}>
        <Svg
          height="120%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 50 }}
        >
          
          <Path
            fill="#242852"
           // d="M0,224L60,218.7C120,213,240,203,360,176C480,149,600,107,720,106.7C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
            //d="M0,224L80,240C160,256,320,288,480,277.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            d="M0,288L80,245.3C160,203,320,117,480,117.3C640,117,800,203,960,240C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
           
          />
          
        </Svg>
        <TouchableOpacity onPress={() => openDrawer()} style={styles.icon}>
            <Icon name="menu" size={40} paddingVertical={50} color='white' />
          </TouchableOpacity>
      </View>
  
  
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
   //justifyContent: 'space-between',
    alignItems: 'flex-start',
    //paddingHorizontal: 20,
    padding: Platform.OS === 'ios' ? 15 : 10,
    paddingTop:Platform.OS === 'ios' ? 45 : 10,
  
    // backgroundColor: '#ff0000'
    // backgroundColor: '#000030'
    backgroundColor: '#242852',

  },
  icon:{
   paddingLeft:20,
   paddingTop:50
  }
  

});

export default Header;
