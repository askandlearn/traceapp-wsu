import React, {Component, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet,  AsyncStorage,StatusBar, TouchableOpacity, Image, TextInput, Button} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import HealthDashboard from './HealthDashboardScreen';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


//export default class HealthInfoScreen extends Component{
//    state = {
//         'name': '',
//         'height': ''
//      }
//      componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
//      componentDidMount = () => AsyncStorage.getItem('height').then((value) => this.setState({ 'height': value }))

//      setName = (value) => {
//         AsyncStorage.setItem('name', value);
//         this.setState({ 'name': value });
//      }
//      setHeight=(value)=>{
//          AsyncStorage.setItem('height', value);
//          this.setState({'height': value});
//      }
const HealthInfoScreen =({navigation}) =>{ 
//  this.setState = {
//             'height': ''
//          }
         
//          componentDidMount = () => AsyncStorage.getItem('height').then((value) => this.setState({ 'height': value }))

//          setHeight=(value)=>{
//              AsyncStorage.setItem('height', value);
//              this.setState({'height': value});
//          }
const [height, setHeight]= useState('');
        return (
           <View style = {styles.container}>
                <Header openDrawer={navigation.openDrawer}/>
                <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>    
                <Text style={styles.title}>Health Information</Text>
                <KeyboardAvoidingScrollView>
                    <TextInput placeholder='Height' style = {styles.textInput} autoCapitalize = 'none'
                    //   onChangeText = {this.setName}
                    onChangeText = {height=>setHeight(height)}
                    />
                    <Text style={styles.result}>
                     Current Height: {height}
                    </Text>
                    <TextInput placeholder='Weight' style = {styles.textInput} autoCapitalize = 'none'
                    //   onChangeText = {this.setHeight}
                    />
                    <Text style={styles.result}>
                    Current Weight: 
                    </Text>
                    <TextInput placeholder='Activity Level' style = {styles.textInput} autoCapitalize = 'none'
                      
                    />
                    <Text style={styles.result}  >
                    Current Activity Level: 
                    </Text>
                    <TouchableOpacity title="Save" style={styles.button}>
                    <Text style={styles.buttonText} onPress={null}>SAVE</Text>
                </TouchableOpacity>
                </KeyboardAvoidingScrollView>
           </View>
        )
    }


const styles = StyleSheet.create ({
    flexContainer:{
        flexDirection: 'row',
        alignItems:'center',
        marginTop:'5%'
    },
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7',
        //justifyContent:'center'
      },
    textInput: {
        marginHorizontal: '10%',
        marginVertical: 5,
        width:'80%',
        height: 50,
        padding: 13,
        fontWeight: 'bold',
        borderColor:'rgba(0, 0, 0, .4)',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        shadowColor:'#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        borderRadius:20,             
    },
    result:{
        marginHorizontal: '10%',
        marginBottom: 15,
        width:'80%',
        height: 50,
        padding: 13,
        fontWeight: 'bold',
        // borderBottomColor:'rgba(0, 0, 0, .4)',
        // borderBottomWidth:2,
        // borderStyle:'solid',
        color: 'rgba(0, 0, 0, 1)',
        //backgroundColor:'rgba(255, 255, 255, 1)',
        // shadowColor:'#000000',
        // shadowOffset: { width: 1, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 1
    },
    backgroundImage:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:70,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
    
      title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color:'#000000',
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
      },
      buttonRow: {
        flexDirection: 'row'
      },
  
 });

 export default HealthInfoScreen;
