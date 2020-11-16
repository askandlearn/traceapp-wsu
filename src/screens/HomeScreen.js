/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg from 'react-native-svg';
import {Calendar} from 'react-native-calendars';

const date = new Date();
const calDate = [];
date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + ((date.getDate()  + 0) % 7);
//newRealtimeData[0].y.shift();
 //newRealtimeData[0].x.push(this.state.count+1);
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

const data = [
  {day: strDay((date.getDay() + 1) % 7), score: 5},
  {day: strDay((date.getDay() + 2) % 7), score: 50},
  {day: strDay((date.getDay() + 3) % 7), score: 20},
  {day: strDay((date.getDay() + 4) % 7), score: 70},
  {day: strDay((date.getDay() + 5) % 7), score: 40},
  {day: strDay((date.getDay() + 6) % 7), score: 90},
  {day: strDay(date.getDay()), score: 69},
];

const calData = {
  [calDate]: {
    textColor: 'white', 
    color: data[0].score > 70 ? 'green': 'red',
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

const HomeScreen = ({navigation}) => {
  const [stats, setStats] = useState('week');
  const [status, setStatus] = useState('true');
  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingScrollView>
        <Header openDrawer={navigation.openDrawer} />
        <Image
          style={styles.backgroundImage}
          source={require('../images/TraceBio-Black.png')}
        />
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Health Dashboard</Text>
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
            <VictoryAxis dependentAxis label="Score" style={sharedAxisStyles} />
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
          markingType={'period'}
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    //alignItems: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 0,
    width: '60%',
    height: 100,
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
    marginHorizontal: '10%',
    marginVertical: 0,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 30,
  },
  button: {
    //alignSelf: 'center',
    //width: '60%',
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
    width: '100%',
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

    //alignItems: 'left',
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

export default HomeScreen;
