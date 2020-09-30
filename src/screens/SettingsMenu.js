import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Header from '../components/Header-Component';



export default class SettingsMenu extends Component{
    constructor(){
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
      }  

      render() {
        var bgColor = '#DCE3F4';
        var {navigate} = this.props.navigation;     
        return (
          
          <View style={{backgroundColor:'#f1f1f2',flex:1}}>
            <Header openDrawer={navigate.openDrawer}/>
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
                  //titleInfo='Bill Wi The Science Fi'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={()=>navigate('HealthInformation')}
                />
                <SettingsList.Item
                  title='Connect TRACE Sensor'
                  titleInfo='Disconnected'
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={()=>navigate('TraceConnect')}
                />
                <SettingsList.Item
                  title='Sync My Data'
                  onPress={() => null}
                />
            
              </SettingsList>
            </View>
          </View>
        );
      }
      onValueChange(value){
        this.setState({switchValue: value});
      }
    
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
