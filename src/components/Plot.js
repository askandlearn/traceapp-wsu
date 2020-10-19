import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions
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
  //const screenWidth = Dimensions.get("window").width;
  export default plot=()=>{
   return( 
    // <PinchZoomView>
  
  <LineChart
    data={{
      labels: ["BPM", "BPM", "BPM", "BPM", "BPM", "BPM"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
   // width={Dimensions.get("window").width} // from react-native
    height={180}
    width={400}
    //yAxisLabel="Days"
    //yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    
    chartConfig={{
      backgroundColor: "#000000",
      backgroundGradientFrom: "#ff1111",
      backgroundGradientTo: "#ff6666",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#ffffff"
      }
    }}
    bezier
    style={{
      marginVertical: '2%',
      marginHorizontal:'5%',
      width:'90%',
     // marginLeft: '5%',
     // marginRight:'5%',
      alignItems:'center',
      borderRadius: 16
    }}
  />
// </PinchZoomView>
)

  }