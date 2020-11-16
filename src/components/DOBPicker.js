import DatePicker from 'react-native-datepicker';
import React, {Component} from 'react';
import DropDownMenu from 'react-native-dropdown-menu';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
import {UserContext} from '../contexts/UserContext';
import {AuthContext} from '../contexts/AuthContext';

/*
  //UserContext only has one value: user
  const user = useContext(UserContext);
  const {update} = useContext(AuthContext);
  const [dob, editDOB] = useState(() => {if (user.birthdate) {return user.birthdate;} else {return '';}});
*/
export default class DOBPicker extends Component{

    constructor(props){
        super(props);
        this.state = {
            dob: "1999-01-01"
        };
    }

    render(){
        return(
            <DatePicker 
            style={{width: 200}}
            dob={this.state.dob}
            mode="date"
            placeholder="select date"
            format="YY-MM-DD"
            minDate="1930-01-01"
            maxDate="2020-09-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            }}
            onDateChange={(dob) => {this.setState({dob:dob})}}
            />
        )
    }
}