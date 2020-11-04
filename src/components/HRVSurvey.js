import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

//import Button from 'react-native-button';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Slider from 'react-native-slider';

export default class RadioButtonExample extends Component {
  constructor() {
    super();
    this.state = {
      valueStressed: 1,
      valueFatigue: 1,
      // types1: [{label: 'YES', value: 0}, {label: 'NO', value: 1}],
      // value1: 0,
      // value1Index: 0,

      comment: '',
    };
  }
  handleComment = (text) => {
    this.setState({comment: text});
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>HRV Survey</Text>
          <View style={styles.NavBarDivider} />

          <View style={styles.component}>
            {/* <Text style={styles.questions}>Did you feel dizzy after standing up?</Text> */}
            {/* <RadioForm
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
                <Text>Selected: {this.state.types1[this.state.value1Index].label}</Text>      */}
            <View style={styles.slider}>
              <Text style={styles.questions}>
                On a scale of 1 to 5, rate how stressed you feel {'\n'} (1 is
                the least, 5 is the most)
              </Text>
              <Slider
                minimumValue={1}
                maximumValue={5}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                value={this.state.valueStressed}
                onValueChange={(valueStressed) =>
                  this.setState({valueStressed})
                }
              />
              <Text>Value: {this.state.valueStressed}</Text>
            </View>
            <View style={styles.NavBarDivider} />
            <View style={styles.slider}>
              <Text style={styles.questions}>
                On a scale of 1 to 3, rate how tired you feel {'\n'} (1 is the
                least, 3 is the most)
              </Text>
              <Slider
                minimumValue={1}
                maximumValue={3}
                step={1}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                value={this.state.valueFatigue}
                onValueChange={(valueFatigue) => this.setState({valueFatigue})}
              />
              <Text>Value: {this.state.valueFatigue}</Text>
            </View>
            <View style={styles.NavBarDivider} />
            <View style={styles.slider}>
              <Text style={styles.questions}>
                Please include any additional comments on how you are feeling in
                the field below:
              </Text>
              <TextInput
                multiline={true}
                editable={true}
                style={styles.comment}
                //value={this.state.comment}
                onChangeText={this.handleComment}
                //value={text}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '95%',
    alignItems: 'center',
    backgroundColor: '#Ffffff',
    //maxWidth:'105%'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  questions: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 8,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
    alignItems: 'center',
    marginVertical: '5%',
    width: '95%',
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
  slider: {
    //flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    justifyContent: 'center',
    //backgroundColor: '#ff00ff',
    alignItems: 'stretch',
    marginVertical: '5%',
    width: '90%',
  },
  track: {
    backgroundColor: '#000000',
  },
  thumb: {
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 1,
  },
  commentComponent: {
    alignItems: 'stretch',
    marginVertical: '5%',
  },
  comment: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
    width: 240,
  },
});

AppRegistry.registerComponent('RadioButtonExample', () => RadioButtonExample);
