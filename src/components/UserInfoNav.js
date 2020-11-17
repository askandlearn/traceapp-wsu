import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet}
from 'react-native';
import { UserContext } from '../contexts/UserContext';

export default UserInfo=()=>{
    //create user
    const user = useContext(UserContext);

    const [name] = useState(() => {if(user) return user.name; else return ''});
    const [email] = useState(() => {if(user) return user.email; else return ''});

    //console.log(user);

    //split name to get initials for avatar
    const initialzeAvatarText = () => {
        if (user){
          const[first, last] = user.name.split(' ')
          return first[0]+last[0]
        }else{
          return ''
        }
      }
    
      const [initials] = useState(initialzeAvatarText())

      return(
          <View style={{flexDirection:'row', marginTop: 15}}>
              <View style={styles.avatar}>
                  <Text style={styles.avatar_text}>{initials}</Text>
                </View>
                <View style={{flexDirection:'column', marginLeft: 15}}>
                    <Text style={styles.title} >{name}</Text>
                    <Text style={styles.caption}>{email}</Text>
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
        color: 'black',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'black',
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
        backgroundColor: '#242852',
      },
      avatar_text:{
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