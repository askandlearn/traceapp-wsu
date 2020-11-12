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
        y: [1,2,3],
        marker: { color: "#fdcc00" },
        line: { shape: "spline" }
      }
    ],
    check: false,
    count: 3
  };

  componentDidMount() {
    // Simulate realtime data
    //if(check==true){
    setInterval(() => {
      let newRealtimeData = [...this.state.realtimeData];
    
     if(newRealtimeData[0].y.length>5){
        newRealtimeData[0].y.push(Math.floor(Math.random() * 10) + 1);
        console.log("y second"+newRealtimeData[0].y);
        newRealtimeData[0].y.shift();
        newRealtimeData[0].x.push(this.state.count+1);
        newRealtimeData[0].x.shift();
        console.log("x second"+newRealtimeData[0].x);       
        this.setState({
          realtimeData: newRealtimeData,
          count: this.state.count+1
        });
      }
      else{
        newRealtimeData[0].y.push(newRealtimeData[0].x.length + 1);
        newRealtimeData[0].x.push(this.state.count+1);
        console.log("x first"+newRealtimeData[0].x);
        console.log("y first"+newRealtimeData[0].y);
        this.setState({
          realtimeData: newRealtimeData,
          count: this.state.count+1
        });
      }
      
    }, 4000);
  //}
  }

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
