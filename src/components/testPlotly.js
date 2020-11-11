import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Plotly from 'react-native-plotly';

const upData = {
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 3, 4, 8],
};

const downData = {
  __id: 'down',
  x: [1, 2, 3, 4, 5],
  y: [8, 4, 3, 2, 1],
  type: 'scatter'
};

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
    ]
  };

  componentDidMount() {
    // Simulate realtime data

    setInterval(() => {
      let newRealtimeData = [...this.state.realtimeData];
      newRealtimeData[0].x.push(newRealtimeData[0].x.length + 1);
      newRealtimeData[0].y.push(Math.floor(Math.random() * 6) + 1);
      console.log(newRealtimeData[0].x);
      console.log(newRealtimeData[0].y);
      this.setState({
        realtimeData: newRealtimeData
      });
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <Button onPress={this.update} title="Swap Data" />
        </View>
        <View style={styles.chartRow}>
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
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
