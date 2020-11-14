import React from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import Plotly from 'react-native-plotly';

export default class App extends React.Component {
  constructor(props){
    super(props);
  
  this.state = {
    realtimeData: [
      {
        type: "scatter",
        mode: "lines+points",
        x: [1, 2, 3],
        y: [1,2,3],
        marker: { color: "#ff0000" },
        line: { shape: "spline" }
      }
    ],
    check: false,
    count: 3,
    //isTimer: this.props.isStart
  };
}
  setPlot(){     
    console.log("Started Timer");
    let newRealtimeData = [...this.state.realtimeData];
    setInterval(() => {
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
  }, 2000);
  
}

handleTimer(){
  const interval =setInterval(() => {
    console.log(this.state.check);
    this.setPlot();
  }, 2000);
  if (this.state.check==false){
    clearInterval(interval);
  }
}

  // testProp(props){
  //   <Text style={styles.chartRow}>{this.state.isTimer}</Text>
  //   console.log(this.props.dataFromParent);
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartRow}>
        <Text >{this.state.isTimer}</Text>
        <TouchableOpacity onPress={() => this.setPlot()}>
            <Text>Start Plot</Text>
          </TouchableOpacity>
        
          {/* {this.props.isStart ? this.setPlot() : null} */}
          <Plotly 
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
            data={this.state.realtimeData}
            layout={this.state.layout}
            frames={this.state.frames}
            onInitialized={ (figure) =>this.setState(figure) }
            onUpdate={ (figure) =>  this.setState(figure) }
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
  },
  container: {
    flex:1,
    paddingTop: 20,
    width: 400,
    //height: '100%',
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center'
  }
});
