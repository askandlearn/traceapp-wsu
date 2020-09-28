import React,  {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import DatePicker from 'react-native-datepicker';
import { Form, TextValidator } from 'react-native-validator-form';
import { minNumber } from 'react-native-validator-form/lib/ValidationRules';


//Create the Sign Up Page

const logo= '../images/TraceBio-White.png';

export default class SignUpScreen extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        date:'',
        firstName:'',
        lastName:'',
        email: '',
       // password: '',
        user: {},}
    }
    handleFirstName = (firstName) => {
        this.setState({ firstName });
    }
    handleLastName = (lastName) => {
        this.setState({ lastName });
    }
    handleEmail = (email) => {
        this.setState({ email });
    }
    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        Form.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }
    componentWillUnmount() {
        Form.removeValidationRule('isPasswordMatch');
    }
    handlePassword = (event) => {
        const { user } = this.state;
        user.password = event.nativeEvent.text;
        this.setState({ user });
    }
    handleRepeatPassword = (event) => {
        const { user } = this.state;
        user.repeatPassword = event.nativeEvent.text;
        this.setState({ user });
    }
    submit = () => {
        console.log('Submitted');
    }
    handleSubmit = () => {
        this.refs.form.submit();
    }
// const SignUpScreen =() =>{
    render(){
        var {navigate} = this.props.navigation;
        const { email} = this.state;      
        const { password} = this.state;
        const { firstName} = this.state;      
        const { lastName} = this.state;  
        const { user } = this.state;    

    return ( 
        <View style={styles.container}>
            <KeyboardAvoidingScrollView >
                <View > 
                    <Image style={styles.backgroundImage} source={require(logo)}></Image>    
                    <Text style={styles.title}>Sign up to get started!</Text>
                </View>
                <Form ref="form" onSubmit={this.handleSubmit}>
                        <TextValidator 
                        name="firstName"
                        label="firstName" 
                        placeholder='First Name'
                        validators={['required']}
                        errorMessages={['This field is required']}
                        errorStyle={{ container: { top: 0, left: '10%', position: 'relative' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }
                        type="text"
                        value={firstName}
                        onChangeText={this.handleFirstName}
                        style={styles.inputFields}>
                        </TextValidator>
                        <TextValidator
                        name="lastName"
                        label="lastName" 
                        placeholder='Last Name' 
                        validators={['required']}
                        errorMessages={['This field is required']}
                        errorStyle={{ container: { top: 0, left: '10%', position: 'relative' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }
                        type="text"
                        value={lastName}
                        onChangeText={this.handleLastName}
                        style={styles.inputFields}>
                        </TextValidator>
                 
                    
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
                     ></DatePicker>
                    <TextValidator
                        name="email"
                        label="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is invalid']}
                        errorStyle={{ container: { top: 0, left: '10%', position: 'relative' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }
                        placeholder="Email"
                        type="text"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={this.handleEmail}
                        style={styles.inputFields}
                    
                    />
                    <TextValidator
                        name="passowrd"
                        label="password"
                        validators={['required', 'minStringLength:8', 'maxStringLength:15']}
                        errorMessages={['This field is required', 'Password must be at least 8 characters', 'Password cannot exceed 15 characters']}
                        errorStyle={{container: styles.errorMessage}, {text: styles.errorMessage}}
                        placeholder="Password"
                        type="text"
                        value={user.password}
                        onChange={this.handlePassword}
                        secureTextEntry={true}
                        style={styles.inputFields}
                    />
                    <TextValidator
                        name="confirmPassowrd"
                        label="confirmPassowrd"
                        validators={['isPasswordMatch','required', 'minStringLength:8', 'maxStringLength:15']}
                        errorMessages={['Password mismatch','This field is required', 'Password must be at least 8 characters', 'Password cannot exceed 15 characters']}
                        type="text"
                        value={user.repeatPassword}
                        onChange={this.handleRepeatPassword}
                        
                        errorStyle={{container: styles.errorMessage}, {text: styles.errorMessage}}
                        placeholder="Confirm Passowrd"        
                        secureTextEntry={true}
                        style={styles.inputFields}
                    />
                    <TouchableOpacity title="Submit"
                        onPress={this.handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText} onPress={() => null}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                    
                </Form>
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
            </KeyboardAvoidingScrollView>      
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
        backgroundColor:'#b7b7b7'
      },
    bottomContainer:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        marginTop: '25%'
      },
      nameContainer:{
       // marginHorizontal:'10%',
        marginTop:'5%',
       justifyContent: 'space-between',
      // alignContent:'center',
      // alignSelf:'center'
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
        width:'90%',
        height: 50,
        //marginLeft: '20%',
       // marginVertical: 5,
        padding: 13,
        marginLeft:'22%',
      
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
      width:'77%',
      height: 50,
      //marginLeft: '20%',
     // marginVertical: 5,
      padding: 13,
      marginRight:'22%',
    
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
    errorMessage:{
        marginHorizontal:'10%',
        position:'relative',
        color:'red'
    },
   
    // icons:{
    //     color:'rgba(255,255,255,0.7)',
    //     position:'absolute',
    // }
});

//export default SignUpScreen;