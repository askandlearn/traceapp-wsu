import React from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import Plotly from 'react-native-plotly';

export default class App extends React.Component {
  state = {
    realtimeData: [
      {
        type: "scatter",
        mode: "lines+points",
        x: [1, 2, 3],
        y: [2, 6, 3],
        marker: { color: "#fdcc00" },
        line: { shape: "spline" }
      }
    ],
    check: false,
  };

  // componentDidMount() {
  //   // Simulate realtime data
  //   //if(check==true){
  //   setInterval(() => {
  //     let newRealtimeData = [...this.state.realtimeData];
  //    if(newRealtimeData[0].x.length>5){
  //       newRealtimeData[0].x.push(Math.floor(Math.random() * 6) + 1);
  //       console.log("push second"+newRealtimeData[0].x);
  //       newRealtimeData[0].x.shift();
  //       console.log("push second"+newRealtimeData[0].x);       
  //       this.setState({
  //         realtimeData: newRealtimeData
  //       });
  //     }
  //     else{
  //       newRealtimeData[0].x.push(newRealtimeData[0].x.length + 1);
  //       newRealtimeData[0].y.push(newRealtimeData[0].x.length + 2);
  //       console.log("push first"+newRealtimeData[0].x);
  //       console.log("push first"+newRealtimeData[0].y);
  //       this.setState({
  //         realtimeData: newRealtimeData
  //       });
  //     }
      
  //   }, 2000);
  // //}
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartRow}>
        {/* <TouchableOpacity onPress={() => this.setState({check:true})}>
            <Text>Start Plot</Text>
          </TouchableOpacity> */}
          <Plotly
            data={this.state.realtimeData}
            layout={this.state.layout}
            update={this.update}
            onLoad={() => console.log('loaded')}
            debug
            enableFullPlotly={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row'
  },
  chartRow: {
    flex: 1,
    width: '100%'
  },
  container: {
    paddingTop: 30,
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
