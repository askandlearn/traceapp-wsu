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

  export default class HealthGoals extends Component{

    constructor(){
        super();
        this.state = {
            goals: ''
        };
    }

    render(){
        return(
            <View>
                <DropDownPicker
                items={[
                    {label: 'Feel more energized', value: 'energy'},
                    {label: 'Lower heart rate', value: 'heart'},
                    {label: 'Lower stress level', value: 'stress'},
                    {label: 'Improve blood oxygen level', value: 'bloodox'},
                    {label: 'Improve overall wellness', value: 'wellness'},
                    {label: 'Monitor health', value: 'health'},
                ]}
                defaultValue={this.state.goals}
                containerStyle={{height: 30, width: 220}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) =>
            this.setState({
              goals: item.value
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