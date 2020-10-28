/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg from 'react-native-svg';
import {Calendar} from 'react-native-calendars';
import { createServer } from "miragejs";

var isNewUser=false;
if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/existingUser", () => {
      return {
        scores : [
          {day: 'Mon', score: 50},
          {day: 'Tues', score: 80},
          {day: 'Wed', score: 90},
          {day: 'Thurs', score: 50},
          {day: 'Fri', score: 10},
          {day: 'Sat', score: 20},
          {day: 'Sun', score: 69},
        ],
      }
    })
    this.get("/api/newUser", () => {
      return {
        scores : [
          {day: 'Mon', score: 0},
          {day: 'Tues', score: 0},
          {day: 'Wed', score: 0},
          {day: 'Thurs', score: 0},
          {day: 'Fri', score: 0},
          {day: 'Sat', score: 0},
          {day: 'Sun', score: 0},
        ],
      }
    })
  },
})
// const data = [
//   {day: 'Mon', score: 5},
//   {day: 'Tues', score: 50},
//   {day: 'Wed', score: 50},
//   {day: 'Thurs', score: 50},
//   {day: 'Fri', score: 40},
//   {day: 'Sat', score: 20},
//   {day: 'Sun', score: 69},
// ];

const sharedAxisStyles = {
  axisLabel: {
    margin: 30,
    padding: 30,
    fontSize: 15,
    fontStyle: 'italic',
  },
};

const HealthDashboardScreen = () => {
  const [stats, setStats] = useState('week');
  const [status, setStatus] = useState('true');
  let [existingUser, setExistingUser] = React.useState([]);
  let [newUser, setNewUser]=useState([]);

  React.useEffect(() => {
    fetch("/api/existingUser")
      .then((res) => res.json())
      .then((json) => setExistingUser(json.scores))
  }, [])
  React.useEffect(() => {
    fetch("/api/newUser")
      .then((res) => res.json())
      .then((json) => setNewUser(json.scores))
  }, [])
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../images/TraceBio-Black.png')}
      />
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
        onChangeItem={(item) => (setStats(item.value), setStatus(!status))}
      />
      
      <Svg
        style={status ? styles.chart : styles.hidden}
        viewBox={'0 0 140 350'}
        preserveAspectRatio="none">
        <VictoryChart domainPadding={15} height={300} width={385}>
        {isNewUser &&
          <VictoryBar
            data={newUser}
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
          }
          {isNewUser==false &&
          <VictoryBar
            data={existingUser}
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
          }
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
    </ScrollView>
  );
};

//All styling options created below
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70,
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
    marginVertical: 10,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
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
    width: '80%',
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
});

export default HealthDashboardScreen;
