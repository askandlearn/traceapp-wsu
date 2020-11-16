import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
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

  export default class GenderMenu extends Component{

    constructor(){
        super();
        this.state = {
            gender: ''
        };
    }

    render(){
        return(
            <View>
                <DropDownPicker
                items={[
                    {label: 'Male', value: 'M'},
                    {label: 'Female', value: 'F'},
                    {label: 'Other', value: 'O'},
                    {label: 'Decline to Answer', value: 'NA'},
                ]}
                defaultValue={this.state.gender}
                containerStyle={{height: 30, width: 220}}
                placeholder="Select a gender option"
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) =>
            this.setState({
              gender: item.value
            })
          }/>
            </View>
        )
    }



  }
  const styles = StyleSheet.create({
    container: {
      height: '95%',
      alignItems: 'center',
      backgroundColor: '#Ffffff',
      //maxWidth:'105%'
    }
  

  });