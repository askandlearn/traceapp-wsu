import React,  {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import DatePicker from 'react-native-datepicker';
//import ModalDropdown from 'react-native-modal-dropdown';
//import { TextInputMask } from 'react-native-masked-text'
//import Icon from 'react-native-vector-icons/Ionicons';
//Create the Sign Up Page

const logo= '../images/TraceBio-White.png';

export default class SignUpScreen extends Component {
    
    constructor(props){
        super(props)
        this.state = {date:''}
      }
// const SignUpScreen =() =>{
    render(){
        var {navigate} = this.props.navigation;
    return ( 
        <View style={styles.container}>
        <View > 
            <Image style={styles.backgroundImage} source={require(logo)}></Image>    
            <Text style={styles.title}>Sign up to get started!</Text>
        </View>
        <View style={[styles.flexContainer, styles.nameContainer]}>
            {/* <Icon name="ios-person" size={28}  style={styles.icons}> </Icon> */}
            <TextInput placeholder='First Name' style={styles.firstName}></TextInput>
            <TextInput placeholder='Last Name' style={styles.lastName}></TextInput>
        </View>

        <View>
            
            <DatePicker       
            style={[styles.inputFields]}
            placeholder="Date of Birth"
            date={this.state.date}
            mode="date"
            format="YYYY-MM-DD"
            minDate="1920-01-01"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                width:0,
                height:0        
                },
                dateInput: {
                    borderWidth:0,                   
                },
                placeholderText:{
                    alignSelf:'flex-start',
                    color: 'rgba(0, 0, 0, .25)',
                    fontWeight:'bold',
                    paddingBottom:'5%'
                },
                dateText:{
                    color: 'rgba(0, 0, 0, 1)',
                    fontWeight: 'bold'
                }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
        
        <View>
            <TextInput placeholder='Email' style={styles.inputFields}></TextInput>
            <TextInput placeholder='Password' style={styles.inputFields}></TextInput> 
            <TextInput placeholder='Repeat Password' style={styles.inputFields}></TextInput>               
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.flexContainer}>
        <View style={styles.horizantalLine} />
        <View>
            <Text style={styles.orOption}>Or sign up with</Text>
        </View>
        <View style={styles.horizantalLine} />  
        </View>
        <View style={[ styles.bottomContainer]}>
            <View style={styles.flexContainer}>
            <Text style={styles.otherText}>Already a member?</Text>
            <TouchableOpacity>
                <Text style={styles.linkButton} onPress={
                                ()=>navigate("Login")}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
        </View>       
        </View>
    )
};

}

//All styling options created below
const styles= StyleSheet.create({
    flexContainer:{
        flexDirection: 'row',
        alignItems:'center',
        //alignSelf:'center'
    },
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7',
      },
    bottomContainer:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        marginBottom: '15%'
      },
      nameContainer:{
          marginTop:'5%',
        justifyContent: 'space-between'
      },
      dobContainer:{
        flexDirection: 'row',
        alignItems:'center',
      },
    backgroundImage:{
        alignSelf:'center',
        marginTop:20,
        marginBottom:10,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
   
    firstName:{
        width:'38%',
        height: 50,
        marginLeft: '10%',
       // marginVertical: 5,
        padding: 13,
        fontWeight: 'bold',
        borderColor:'rgba(0, 0, 0, .4)',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:20,
        shadowColor:'#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    lastName:{
        width:'38%',
        height: 50,
        marginRight: '10%',
        marginVertical: 5,
        padding: 13,
        fontWeight: 'bold',
        borderColor:'rgba(0, 0, 0, .4)',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:20,
        shadowColor:'#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    inputFields:{
        width:'80%',
        height: 50,
        marginHorizontal: '10%',
        marginVertical: 5,
        padding: 13,
        fontWeight: 'bold',
        borderColor:'rgba(0, 0, 0, .4)',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:20,
        shadowColor:'#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginTop: '3%',
        color:'#202020',
       // fontWeight:'bold',
        fontSize: 25
        },
    button:{
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: '5%',
        padding:10,
        borderRadius:20,
        backgroundColor:'#ff0000',   
        shadowColor:'#000000'   ,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    horizantalLine:{
        flex: 1, 
        height: 1,
        backgroundColor: 'black',
        //width: '60%',
        marginHorizontal: '3%',
    },
    orOption:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold'
    },
    linkButton:{
        color: 'blue',
       marginLeft: 5

    },
   
    // icons:{
    //     color:'rgba(255,255,255,0.7)',
    //     position:'absolute',
    // }
});

//export default SignUpScreen;