import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import Header from '../components/Header-Component';
import HealthDashboard from './HealthDashboardScreen';

<<<<<<< Updated upstream
const HomeScreen = ({navigation}) => {
=======
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

var thisDay=date.getDate();
if(date.getDate() < 10){
    var temp = "0";
    thisDay = temp.concat(thisDay);
  }
var format = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + thisDay;
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
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <Header openDrawer={navigation.openDrawer} />
      <HealthDashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7b7b7',
    alignItems: 'center',
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
