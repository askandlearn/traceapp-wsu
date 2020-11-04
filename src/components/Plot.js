import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import PinchZoomView from 'react-native-pinch-zoom-view';
  import PureChart from 'react-native-pure-chart';
  //const screenWidth = Dimensions.get("window").width;
  export default plot=()=>{
    let sampleData = [
      {
        seriesName: 'HR',
        data:[
        {x: '0', y: 37.5},
        {x: '0.04', y: 39.47368421},
        {x: '0.06', y: 38.46153846},
        {x: '0.08', y: 35},
        {x: '0.1', y: 35.71428571},
        {x: '0.12', y: 35},
        {x: '0.14', y: 34},
        {x: '0.16', y: 35},
        {x: '0.181', y: 37.5},
        {x: '0.201', y: 37},], color:'red'
      }]
   return( 
     <View>
    <PureChart height={190} data={sampleData}  width={'50%'} type='line' backgroundColor={'#ffffff'} 
    />
    <View style={styles.colorKey}>
        <View style={styles.colorKeyRow}>
            <Text>- X Axis: Time </Text>
          </View>
          <View style={styles.colorKeyRow}>
            <Text>- Y Axis: HR </Text>
        </View>

      </View>
    </View> 
    
    // <PinchZoomView>
  
  // <LineChart
  //   data={{
  //     labels: ["BPM", "BPM", "BPM", "BPM", "BPM", "BPM"],
  //     datasets: [
  //       {
  //         data: [
  //           Math.random() * 100,
  //           Math.random() * 100,
  //           Math.random() * 100,
  //           Math.random() * 100,
  //           Math.random() * 100,
  //           Math.random() * 100
  //         ]
  //       }
  //     ]
  //   }}
  //  // width={Dimensions.get("window").width} // from react-native
  //   height={180}
  //   width={400}
  //   //yAxisLabel="Days"
  //   //yAxisSuffix=""
  //   yAxisInterval={1} // optional, defaults to 1
    
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
  //     marginVertical: '2%',
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