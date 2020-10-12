import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
Button
} from 'react-native';

//import Button from 'react-native-button';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Slider from "react-native-slider";

export default class RadioButtonExample extends Component {
    constructor () {
        super()
        this.state = {
            value: 1,
            types1: [{label: 'YES', value: 0}, {label: 'NO', value: 1}],
            value1: 0,
            value1Index: 0,
            types2: [{label: 'YES', value: 0}, {label: 'NO', value: 1}],
            value2: 0,
            value2Index: 0,
            comment:'',
        }
    }
    handleComment = (text) => {
        this.setState({ comment: text })
    }   
    render () {
    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
            <Text style={styles.welcome}>AST Survey</Text>
            <View style={styles.NavBarDivider} />
           
            <View style={styles.component}>
            <Text style={styles.questions}>Did you feel dizzy after standing up?</Text>
                <RadioForm
                ref="radioForm"
                radio_props={this.state.types1}
                initial={0}
                //formHorizontal={false}
                //labelHorizontal={true}
                buttonColor={'#ff0000'}
                selectedButtonColor={'#ff0000'}
                //labelColor={'#000'}
                //animation={true}
                onPress={(value, index) => {
                    this.setState({
                    value1:value,
                    value1Index:index
                    })
                }}
                />
                <Text>Selected: {this.state.types1[this.state.value1Index].label}</Text>     
            </View>
            <View style={styles.NavBarDivider} />
            <View style={styles.component}>
                <Text style={styles.questions}>Do you feel ill?</Text>
                <RadioForm
                buttonColor={'#ff0000'}
                selectedButtonColor={'#ff0000'}
                initial={0}
                radio_props={this.state.types2}
                onPress={(value, index) => {
                    this.setState({
                    value2:value,
                    value2Index:index
                    })
                }}
                />
                <Text>Selected: {this.state.types2[this.state.value2Index].label}</Text> 
            </View>
            <View style={styles.NavBarDivider} />
            <View style={styles.slider}>
                <Text style={styles.questions}>On a scale of 1 to 5, how tired do you feel? {"\n"} (1 is the worst, 5 is the best)</Text>
                <Slider
                minimumValue={1}
                maximumValue={5}
                step={1} 
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                value={this.state.value}
                onValueChange={value => this.setState({ value })}
                />
                <Text>
                Value: {this.state.value}
                </Text>
            </View>
            <View style={styles.NavBarDivider} />
            <View style={styles.commentComponent}>     
                <Text style={styles.questions}>
                    Please include any additional comments on how you are feeling in the box below:
                </Text>
                <TextInput
                multiline={true} 
                editable={true}
                style={{height:80, borderColor: 'gray', borderWidth: 1 , borderRadius: 10, padding: 5, marginHorizontal: '5%', width:280}}
                //value={this.state.comment}
                onChangeText={ this.handleComment}
                //value={text}               
                />
            </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'95%',
    alignItems: 'center',
    backgroundColor: '#Ffffff',
    //maxWidth:'105%'
  },
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight:'bold',
    marginBottom:'3%'
  },
  questions:{
    fontSize: 15,
    textAlign: 'center',
    marginVertical:8,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
    alignItems: 'center',
    marginVertical: '5%',
    width:'95%',
  },
  radioStyle: {
    borderRightWidth: 1,
    borderColor: '#ff0000',
    paddingRight: 10,

  },
  radioButtonWrap: {
    marginRight: 5,
  },
  NavBarDivider: {
    height: 1,
    width: 250,
    backgroundColor: 'lightgray',
    
    //marginVertical: 2,
  },
  slider:{
    //flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignContent:'center',
    justifyContent: "center",
    //backgroundColor: '#ff00ff',
    alignItems: 'stretch',
    marginVertical: '5%',
    width:'90%'
  },
  track:{
    backgroundColor:'#000000',
  },
  thumb:{
      backgroundColor: '#ff0000',
      shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 1,
  },
  commentComponent:{
    alignItems: 'stretch',
    marginVertical: '5%', 
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});

AppRegistry.registerComponent('RadioButtonExample', () => RadioButtonExample);