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
 
  //const screenWidth = Dimensions.get("window").width;
  export default RTPlot=()=>{
   return( 
    // <PinchZoomView>
  
  <LineChart
    data={{
      labels: ["BPM", "BPM", "BPM", "BPM", "BPM", "BPM"],
      datasets: [
        {
          data: [
            90,
            //Math.random() * 100,
            100,
            100,
            90,
            91,
            65,
            80,
            70,
            89,
            90
          ]
        }
      ]
    }}
   // width={Dimensions.get("window").width} // from react-native
    height={170}
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
      marginVertical: '1%',
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