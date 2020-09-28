import React, { Component }  from 'react';
import { render } from 'react-dom';
import {ScrollView, View, Text, TextInput, StyleSheet, Button, Image, AppRegistry} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Svg from 'react-native-svg'
import {LocaleConfig, Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars';

const data = [
  { day: "Mon", score: 100 },
  { day: "Tues", score: 80 },
  { day: "Wed", score: 90 },
  { day: "Thurs", score: 70 },
  { day: "Fri", score: 40 },
  { day: "Sat", score: 20 },
  { day: "Sun", score: 69 },
];

export default class HealthDashboardScreen extends Component{
  constructor(){
    super();
    this.state={
        stats: 'week', 
        status: true
    }
  } 

  render() {
    let results;
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>    
        <Text style={styles.title}>Health Dashboard</Text>
        
        <DropDownPicker
          items={[
              {label: 'Results by Week', value: 'week'},
              {label: 'Results by Month', value: 'month'},
          ]}
          defaultValue={this.state.stats}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.setState({
              stats: item.value,
              status: !(this.state.status),
          })}
        />

        <Svg style={(this.state.status) ? styles.chart : styles.hidden} viewBox={"0 0 140 350"} preserveAspectRatio="none">
          <VictoryChart domainPadding={15} height={300} width={385}>
              <VictoryBar data={data} x="day" y="score" />
          </VictoryChart>
        </Svg>

        <Calendar style={(this.state.status) ? styles.hidden : styles.calendar}
          //Initially visible month. Default = Date()
          current={Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={undefined}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {console.log('selected day', day)}}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //renderArrow={(direction) => (<Arrow/>)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          //renderHeader={(date) => {/*Return JSX*/}}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </ScrollView>
    );
  }
}

//All styling options created below
const styles= StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#b7b7b7',
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
      color:'#ffffff',
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
    chartRow: {
      width: '100%'
    },
    chart: {
      flex: 1,
      height: 400,
      width:'80%',
    },
    hidden: {
      display: 'none'
    },
    calendar: {
      flex: 1,
    },
});


