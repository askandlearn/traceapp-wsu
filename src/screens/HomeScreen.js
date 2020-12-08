/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, VictoryLine, VictoryLabel} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg from 'react-native-svg';
import {Calendar} from 'react-native-calendars';

import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import { usePrevious } from '../hooks/usePrevious';

const date = new Date();
const strDay = (day) => {  
  switch(day){
    case 0: return 'Sun';
    case 1: return 'Mon';
    case 2: return 'Tue';
    case 3: return 'Wed';
    case 4: return 'Thu';
    case 5: return 'Fri';
    case 6: return 'Sat';
    default: return 'Err';
  }
}



const calDate = [];
var format = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
calDate.push({
  date: format,
  score: Math.random() * 100,
});

var thisDay = date.getDate();
var thisMonth = date.getMonth() + 1;
var thisYear = date.getFullYear();
var formatStr = '';
for(var i = 1; i < 30; i++) {
  if(thisDay == 1 && thisMonth == 1){
    thisYear--;
    thisMonth = 12;
    thisDay = new Date(thisYear, thisMonth, 0).getDate();
  } else if(thisDay == 1){
    thisMonth--;
    thisDay = new Date(thisYear, thisMonth, 0).getDate();
  } else {
    thisDay--;
  }

  if(thisDay < 10){
    var temp = "0";
    thisDay = temp.concat(thisDay);
  }
  var format = thisYear+ "-" + thisMonth + "-" + thisDay
  
  calDate.push({
    date: format,
    score: Math.floor(Math.random() * 100),
  });

  formatStr = formatStr.concat("\n" + format + " " + calDate[i].score);
}

const data = [
  {day: strDay((date.getDay() + 1) % 7), score: calDate[6].score},
  {day: strDay((date.getDay() + 2) % 7), score: calDate[5].score},
  {day: strDay((date.getDay() + 3) % 7), score: calDate[4].score},
  {day: strDay((date.getDay() + 4) % 7), score: calDate[3].score},
  {day: strDay((date.getDay() + 5) % 7), score: calDate[2].score},
  {day: strDay((date.getDay() + 6) % 7), score: calDate[1].score},
  {day: strDay(date.getDay()), score: calDate[0].score},
];

var calData = {};

for(const i in calDate) {
  calData.[calDate[i].date] =  {
    textColor: calDate[i].score > 70 || calDate[i].score < 40 && calDate[i].score != 0 ? 'white' : 'black',
    color: calDate[i].score > 70 ? 'rgba(0,150,0,.8)': calDate[i].score >= 40 ? 'rgba(255,255,0,.6)' : calDate[i].score > 0 ? 'rgba(255,0,0,.8)' : 'white',
    opacity: .4,
    startingDay: true,
    endingDay: true,
  }
}

const sharedAxisStyles = {
  axisLabel: {
    margin: 30,
    padding: 30,
    fontSize: 15,
    fontStyle: 'italic',
  },
};

//redux states to props
function mapStateToProps(state){
  return{
    isConnected : state.BLE['isConnected'],
  };
}


const HomeScreen = (props) => {
  //Toast for when the device disconnects
  const {isConnected} = props
  const prev = usePrevious(isConnected)
  
  useEffect(() => {
    function showToast(){
      if(prev === true && isConnected === false){
        Toast.showWithGravity('Device has disconnected. Attempting to reconnect...', Toast.LONG, Toast.BOTTOM);
      }
    }

    showToast()
  }, [isConnected])
  //End Toast

  const [stats, setStats] = useState('week');
  const [status, setStatus] = useState('true');
  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header openDrawer={props.navigation.openDrawer} />
      <Text style={styles.title}>Health Dashboard</Text>
      <KeyboardAvoidingScrollView style={styles.bodyMain}>
        {/* <Image
          style={styles.backgroundImage}
          source={require('../images/TraceBio-Black.png')}
        /> */}
        <DropDownPicker
          items={[
            {label: 'Results by Week', value: 'week'},
            {label: 'Results by Month', value: 'month'},
          ]}
          defaultValue={stats}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => (setStats(item.value), setStatus(item.value == 'week' ? true : false))}
        />   
        <Svg
          style={status ? styles.chart : styles.hidden}
          preserveAspectRatio="none">
          <VictoryChart domainPadding={15} height={300} width={420}>   
            <VictoryLine
              y={() => 40}
              samples={1}
              // labels={"Fair"}
              style={{
                data: {stroke: "#F7EF00", strokeDasharray: "12,6", strokeWidth: 2},
              }}
            />
            <VictoryLine
              y={() => 70}
              samples={1}
              // lables={["","Good"]}
              style={{
                data: {stroke: "#00C019", strokeDasharray: "6,6", strokeWidth: 1}
              }}
            />
            <VictoryBar
              data={data}
              x="day"
              y="score"
              style={{
                data: {
                  fill: ({datum}) =>
                    datum.score < 40
                      ? 'red'
                      : datum.score < 70
                      ? 'yellow'
                      : 'green',
                },
              }}
            />
            <VictoryAxis />
            <VictoryAxis dependentAxis label="Score" style={sharedAxisStyles} domain={[0, 100]} />
          </VictoryChart>
        </Svg>

        <Calendar
          style={status ? styles.hidden : styles.calendar}
          //Initially visible month. Default = Date()
          current={Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={undefined}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
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
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
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
          markedDates = {calData}
          markingType = "period"
          theme={{
            'stylesheet.day.period': {
                base: {
                  overflow: 'hidden',
                  height: 34,
                  alignItems: 'center',
                  width: 38,
                }
            }
          }}
          
          
        />
        <View style={styles.colorKey}>
          <View style={styles.colorKeyRow}>
            <View style={{height: 10, width: 10, backgroundColor: 'green'}} />
            <Text> {'  '}Great Health Score </Text>
          </View>
          <View style={styles.colorKeyRow}>
            <View style={{height: 10, width: 10, backgroundColor: 'yellow'}} />
            <Text> {'  '}Fair Health Score </Text>
          </View>
          <View style={styles.colorKeyRow}>
            <View style={{height: 10, width: 10, backgroundColor: 'red'}} />
            <Text> {'  '}Bad Health Score </Text>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyMain:{
    marginTop:25,
    paddingTop:30
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 0,
    width: '50%',
    height: 90,
    resizeMode: 'stretch',
  },
  inputFields: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    fontWeight: 'bold',
    opacity: 0.4,
    borderRadius: 3,
  },
  title: {
    alignSelf: 'center',
    color: '#242852',
    fontWeight: 'bold',
    fontSize: 37,
    marginTop:25,
    paddingTop:65,
    shadowColor: '#000000',
    shadowOffset: {width: .5, height: 1},
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
    ...Platform.select({
      ios: {
        fontFamily: 
        'AppleSDGothicNeo-Bold'
      },
    }),
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  chartRow: {
    width: '100%',
  },
  chart: {
    flex: 1,
    height: 300,
    width: '95%',
  },
  hidden: {
    display: 'none',
  },
  calendar: {
    flex: 1,
  },
  colorKey: {
    flex: 1,
    alignSelf: 'center',
    margin: 0,
    paddingTop: 20,
    paddingBottom: 40,
  },
  colorKeyRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default connect(mapStateToProps, null) (HomeScreen);
