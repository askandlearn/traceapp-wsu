import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Header from '../components/Header-Component';

  
const SettingsMenu =({navigation}, props) =>{ 

        var bgColor = '#DCE3F4';
       // var navigate= props.navigation.navigate;
        // this.onValueChange.bind(this);
        //this.state = {switchValue: false};   
        return (
          
          <View style={{backgroundColor:'#f1f1f2',flex:1}}>
            <Header openDrawer={navigation.openDrawer}/>
            <View style={{borderBottomWidth:1, backgroundColor:'#f1f1f2',borderColor:'#f1f1f2'}}>
           {/* <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>     */}
        <Text style={styles.title}>Health Dashboard</Text>
            </View>
            <View style={{backgroundColor:'#f1f1f2',flex:1}}>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                {/* <SettingsList.Item            
                  hasSwitch={true}
                  switchState={this.state.switchValue}
                  switchOnValueChange={this.onValueChange}
                  hasNavArrow={false}
                  title='Airplane Mode'
                /> */}
                <SettingsList.Item
                  title='My Health Information'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={()=>navigation.navigate('HealthInformation')}
                />
                <SettingsList.Item
                  title='Connect TRACE Sensor'
                  titleInfo='Disconnected'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={()=>navigation.navigate('TraceConnect')}
                />
                <SettingsList.Item
                  title='Sync My Data'
                  onPress={() => null}
                />
            
              </SettingsList>
            </View>
          </View>
        );
      
   
        this.setState({switchValue: value});
      
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7'
      },
    backgroundImage:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:70,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
    inputFields:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        fontWeight: 'bold',
        opacity: .4,
        borderRadius:3
    },
    title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color:'#202020',
        fontWeight:'bold',
        fontSize: 30
        },
    button:{
        //alignSelf: 'center',
        //width: '60%',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        borderRadius:20,
        backgroundColor:'#ff0000',            
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

export default SettingsMenu;