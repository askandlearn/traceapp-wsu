import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import Plotly from 'react-native-plotly';
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  pnn50: state.DATA['pnn50'],
  hrv: state.DATA['hrv'],
  connectedDevice: state.BLE['connectedDevice'],
  metrics: state.BLE['metrics'] //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

const transactionID = 'monitor_metrics'

ASTPlot=(props)=> {

  const [isData, setData]= useState([
    {
      // type: "scatter",
      // mode: "lines+points",
      x: [1, 2, 3],
      y: [1,2,3],
      // marker: { color: "#ff0000" },
      // line: { shape: "spline" }
    }
  ]);
 const [isCount, setCount]=useState(0); 
 const [isNewData, setNewData] =useState(isData);


  setPlot=()=>{
    console.log("Started Timer");
  
    if(isNewData[0].y.length>5){
      isNewData[0].y.push(props.hrv);
      console.log("y second"+isNewData[0].y);
      isNewData[0].y.shift();
      isNewData[0].x.push(isCount);
      isNewData[0].x.shift();
      console.log("x second"+isNewData[0].x);       
      setData(isNewData);
      setCount(isCount+1);    
    }
    else{
      isNewData[0].y.push(props.hrv);
      isNewData[0].x.push(isCount);
      console.log("x first"+isNewData[0].x);
      console.log("y first"+isNewData[0].y);
      setData(isNewData);
      setCount(isCount+1);  
    }
  }
  var plot;
  const onStart = async () => {
    props.updateMetric();
   // plot=setInterval(() => {
      //setPlot();
    //}, 5000);
  }

  useEffect(()=>{
    setPlot();
  },[props.hrv])

const onStop = async () => {
  console.log('Cancelling transaction...')
  props.stopTransaction(transactionID);
 // clearInterval(plot);
}
update = (_, { data, layout, config }, plotly) => {
  plotly.react(data, layout, config);
};
    return (
   
      
      <View style={styles.container}>
      <View>
      <TouchableOpacity style={styles.button} onPress={() => onStart()}>
          <Text>Start Plot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onStop()}>
          <Text>Stop Plot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onStop()}>
        <Text>hrv: {props.hrv}</Text>
        </TouchableOpacity>
     
      </View>
        <View style={styles.chartRow}>
          <Plotly
            data={isData}
            // layout={this.state.layout}
            // update={this.update}
            onLoad={() => console.log('loaded')}
            debug
            enableFullPlotly
            update={update}
          />
        </View>
      </View>
    
    );
  }
  export default connect(mapStateToProps, mapDispatchToProps) (ASTPlot);
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row'
  },
  chartRow: {
    //flex: 1,
    width: '100%'
    ,height: 900,
  },
  container: {
   // paddingTop: 30,
    width: '100%',
    height: 900,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
