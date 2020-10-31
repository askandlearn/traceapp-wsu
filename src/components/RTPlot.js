import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
//   } from "react-native-chart-kit";
import PureChart from 'react-native-pure-chart';
  //const screenWidth = Dimensions.get("window").width;
  export default RTPlot=()=>{
    let sampleData = [
      {
        data:[ {x: '34:44.0', y: 44061},
        {x: '34:44.0', y: 44062},
        {x: '34:44.1', y: 44062},
        {x: '34:44.1', y: 64079},
        {x: '34:44.1', y: 44092},
        {x: '34:44.1', y: 14093},
        {x: '34:44.1', y: 44117},
        {x: '34:44.2', y: 44117},
        {x: '34:44.2', y: 34117},
        {x: '34:44.3', y: 24117},], color:'red'
      }
  ]
 
   return( 
    <View>
      <PureChart height={190} data={sampleData}  width={'50%'} type='line' backgroundColor={'#ffffff'} 
      /> 
      <View style={styles.colorKey}>
        <View style={styles.colorKeyRow}>
            <Text>- X Axis: Time </Text>
          </View>
          <View style={styles.colorKeyRow}>
            <Text>- Y Axis: PPG </Text>
          </View>

        </View>
      </View>
    // <PinchZoomView>
  
  // <LineChart
  //   data={{
  //     labels: [ 
    //   '34:44.0',
  //     '34:44.0',
  //     '34:44.1',
  //     '34:44.1',
  //     '34:44.1',
  //     '34:44.1',
  //     '34:44.1'],
  //     datasets: [
  //       {
  //         data: [44061, 44062, 44062, 44079, 44092, 44093, 44117
           
  //         ]
  //       }
  //     ]
  //   }}
  //  // width={Dimensions.get("window").width} // from react-native
  //   height={170}
  //   width={400}
  //   //yAxisLabel="Days"
  //   //yAxisSuffix=""
  //   yAxisInterval={1} // optional, defaults to 1
  //   yAxisLabel={'PPG'}
  //   chartConfig={{
  //     backgroundColor: "#000000",
  //     backgroundGradientFrom: "#ff1111",
  //     backgroundGradientTo: "#ff6666",
  //     decimalPlaces: 1, // optional, defaults to 2dp
  //     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //     style: {
  //       borderRadius: 16
  //     },
  //     propsForDots: {
  //       r: "4",
  //       strokeWidth: "2",
  //       stroke: "#ffffff"
  //     }
  //   }}
  //   bezier
  //   style={{
  //     marginVertical: '1%',
  //     marginHorizontal:'5%',
  //     width:'90%',
      
  //    // marginLeft: '5%',
  //    // marginRight:'5%',
  //     alignItems:'center',
  //     borderRadius: 16
  //   }}
  // />
// </PinchZoomView>
)

  }

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
  