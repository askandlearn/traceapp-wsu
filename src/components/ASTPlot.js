import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import Plotly from 'react-native-plotly';
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  hrv: state.DATA['hrv'],
  connectedDevice: state.BLE['connectedDevice'],
  metrics: state.BLE['metrics'] //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})


const transactionID = 'monitor_metrics'

 App =(props)=>{
  const [isHR, setHR]= useState([
    {
      // type: "scatter",
      // mode: "lines+points",
      x: [],
      y: [],
      // marker: { color: "#ff0000" },
      // line: { shape: "spline" }
      name:'HR',
    }
  ]);
  const [isPAMP, setPAMP]= useState([
    {
      // type: "scatter",
      // mode: "lines+points",
      x: [],
      y: [],
      // marker: { color: "#ff0000" },
      // line: { shape: "spline" }
      name:'PAMP',
    }
  ]);
  const [isData, setData]=useState(isHR);

  const [isNewData, setNewData] =useState(isData);
  const [isNewPAMP, setNewPAMP]=useState(isPAMP);

  var d = new Date();
  setPlot=()=>{
    console.log("Started Timer");
   
    if(isNewData[0].y.length>15){
      isNewData[0].y.push(props.metrics[1]);
      //console.log("y second"+isNewData[0].y);
      isNewData[0].y.shift();
      isNewData[0].x.push( d.toLocaleTimeString());
      isNewData[0].x.shift();
      //console.log("x second"+isNewData[0].x);       
      setHR(isNewData);  
    }
    else{
      isNewData[0].y.push(props.metrics[1]);
      isNewData[0].x.push( d.toLocaleTimeString());
     // console.log("x first"+isNewData[0].x);
     // console.log("y first"+isNewData[0].y);
     setHR(isNewData);
    }
  }
  setPAMPVal=()=>{
    console.log("Started PAMP");
   
    if(isNewPAMP[0].y.length>15){
      isNewPAMP[0].y.push(props.metrics[3]);
      //console.log("y second"+isNewData[0].y);
      isNewPAMP[0].y.shift();
      isNewPAMP[0].x.push( d.toLocaleTimeString());
      isNewPAMP[0].x.shift();
      //console.log("x second"+isNewData[0].x);       
      setPAMP(isNewPAMP);  
    }
    else{
      isNewPAMP[0].y.push(props.metrics[3]);
      isNewPAMP[0].x.push( d.toLocaleTimeString());
     // console.log("x first"+isNewData[0].x);
     // console.log("y first"+isNewData[0].y);
     setPAMP(isNewPAMP);
    }
  }
  const onStart = async () => {
    props.updateMetric();
   // plot=setInterval(() => {
      //setPlot();
    //}, 5000);
  }

  useEffect(()=>{
    if (isData[0].name=== 'HR') {
     setPlot();
    }
    else{
     setPAMPVal();
    }
  },[props.hrv])

const onStop = async () => {
  console.log('Cancelling transaction...')
  props.stopTransaction(transactionID);
  //var currentTimeInSeconds=Math.floor(Date.now()/1000)
  
  //console.log()
 // clearInterval(plot);
}
const [layout, setLayout]=useState({
  title: 'HR vs Time',
  showlegend:true 
})
// const [layout2, setLayout2]=useState({
//   title: 'PAMP vs Time',
//   showlegend:true 
// })

const config={
  displaylogo:false,
  responsive:true
}
  swapData = () => {
    if (isData[0].name=== 'HR') {
      setData(isPAMP);
      setLayout({
        title: 'PAMP vs Time',
        showlegend:true 
      })
    } else {
      setData(isHR);
      setLayout({
        title: 'HR vs Time',
        showlegend:true 
      });
    }
  };

  update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
      <TouchableOpacity style={styles.button} onPress={() => onStart()}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onStop()}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
          <Button onPress={() =>swapData()} title="Swap Data" />
        </View>
        <View style={styles.chartRow}>
          <Plotly
            data={isData}
            layout={layout}
            update={update}
            //onLoad={() => console.log('loaded')}
            debug
            enableFullPlotly
            config={config}
          />
        </View>
      </View>
    );
  }

  export default connect(mapStateToProps, mapDispatchToProps) (App);
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row'
  },
  chartRow: {
    flex: 1,
    width: '100%'
  },
  container: {
    //paddingTop: 5,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical:10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});