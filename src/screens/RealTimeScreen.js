import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  BackgroundImage,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../components/Header-Component';
import RTTimer from '../components/RTTimer';
import RTData from '../components/RTData';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
//import SensorAlert from '../components/ConnectToSensorAlert';
import Swiper from 'react-native-swiper';
import Plot from '../components/RTPlot';

var check = true;

const RealTimeScreen = ({navigation}, props) => {
  const [isTimer, setTimer]= useState(true);
  const [isStart, setIsStart] = useState(false);
  // const[isRealTime, setRealTime]= useState({ x: [1, 2, 3],
  //   y: [1,2,3]});
    
//   testTimer=(stopwatchStart)=>{
//     setTimer(stopwatchStart);
//     console.log("Test timer works");
//     console.log(isTimer);
//     setChild(isTimer);
//     console.log("isChild:"+stopwatchStart)
//     return (isTimer);
// }
// setPlot=()=>{     
//   console.log("Started Timer");
//   const [newRealtimeData, setNewRealTimeData] = [...this.state.realtimeData];
//   setInterval(() => {
//   if(newRealtimeData[0].y.length>5){
//     newRealtimeData[0].y.push(Math.floor(Math.random() * 10) + 1);
//     console.log("y second"+newRealtimeData[0].y);
//     newRealtimeData[0].y.shift();
//     newRealtimeData[0].x.push(this.state.count+1);
//     newRealtimeData[0].x.shift();
//     console.log("x second"+newRealtimeData[0].x);       
//     this.setState({
//       realtimeData: newRealtimeData,
//       count: this.state.count+1
//     });
//   }
//   else{
//     newRealtimeData[0].y.push(newRealtimeData[0].x.length + 1);
//     newRealtimeData[0].x.push(this.state.count+1);
//     console.log("x first"+newRealtimeData[0].x);
//     console.log("y first"+newRealtimeData[0].y);
//     this.setState({
//       realtimeData: newRealtimeData,
//       count: this.state.count+1
//     });
//   }
// }, 2000);

// }
  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <ScrollView>
         <Header openDrawer={navigation.openDrawer} />
         <Text style={styles.title}>Real-Time Data</Text>
         <Button
         title='Show Value'
         onPress={() => console.log(isStart)}/>
        <RTTimer setIsStart={setIsStart}></RTTimer>  
    {/* sendData={this.testTimer} */}
        <View style={styles.NavBarDivider}/>
        <Swiper style={styles.wrapper} showsButtons loop={false} autoplay={false}>
        <View testID="Data" style={styles.slide1}>
          <Text style={styles.slideTitles}>Biometric Data by Numbers</Text>
          <RTData></RTData>
        </View>
        {/* <View style={styles.NavBarDivider} /> */}
        <View testID="Plot" style={styles.slide2}>
        <Text style={styles.slideTitles}>Biometric Data by Plot</Text>
         <Plot isStart={isStart}></Plot>
        </View>
        </Swiper>
      </ScrollView> 
    </View>
  );
};

export default RealTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    ...Platform.select({
      ios: {paddingTop: 50},
    }),
  },
  //   valueContainer:{
  //     marginVertical:'-2%',
  //     backgroundColor: '#ffffff',
  //     alignContent:'center',
  //   },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 10,
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
    //marginHorizontal: '10%',
    marginVertical: 4,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    textAlign: 'center',
  },
  valueTitle: {
    fontWeight: 'bold',
    marginHorizontal: '8.5%',
    marginTop: '3%',
    width: 80,
    height: 25,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    //resizeMode: 'stretch',
    paddingHorizontal: 8,
  },
  valueButton: {
    alignItems: 'center',
    // alignContent:'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginBottom: '1%',
    borderRadius: 65,
    borderWidth: 1,
    width: 65,
    height: 65,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  valueText: {
    color: '#000000',
    //fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: '#ffffff',
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
  ASTfigure: {
    width: 210,
    height: 214,
    alignSelf: 'center',
    marginBottom: 20,
  },
  NavBarDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  wrapper: {
     height:600,
     backgroundColor:'#ffffff', 
   },
   slide1: {
     height:'100%',
     paddingHorizontal:'10%',
     justifyContent: 'center',
     alignItems: 'center',
     color: '#000000',
     fontSize: 20,
   },
   slideTitles:{
    alignSelf: 'center',
    //marginHorizontal: '10%',
    //marginVertical: 50,
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
   },
   slide2: {
    // flex: 1,
     height:'100%',
     //justifyContent: 'center',
     paddingVertical:'10%',
     paddingHorizontal:'10%',
     alignItems: 'center',
    
     //backgroundColor: '#97CAE5'
   },

  steps: {
    color: '#000000',
    fontSize: 15,
  },
  centeredView: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
