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
      x: [],
      y: [],
      // marker: { color: "#ff0000" },
      // line: { shape: "spline" }
      name:'HRV'
      
    }
  ]);
 const [isCount, setCount]=useState(0); 
 const [isNewData, setNewData] =useState(isData);

 var d = new Date();
  setPlot=()=>{
    console.log("Started Timer");
   
    if(isNewData[0].y.length>100){
      isNewData[0].y.push(props.hrv);
      //console.log("y second"+isNewData[0].y);
      isNewData[0].y.shift();
      isNewData[0].x.push( d.toLocaleTimeString());
      isNewData[0].x.shift();
      //console.log("x second"+isNewData[0].x);       
      setData(isNewData);
      setCount(isCount+1);    
    }
    else{
      isNewData[0].y.push(props.hrv);
      isNewData[0].x.push( d.toLocaleTimeString());
     // console.log("x first"+isNewData[0].x);
     // console.log("y first"+isNewData[0].y);
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
  //var currentTimeInSeconds=Math.floor(Date.now()/1000)
  
  //console.log()
 // clearInterval(plot);
}
update = (_, { data, layout, config, }, plotly) => {
  plotly.react(data, layout, config);
};
const layout={
  title: 'HRV vs Time',
  showlegend:true,
  
}
const config={
  displaylogo:false,
  responsive:true
}
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
        <View style={styles.chartRow}>
          <Plotly
            data={isData}
            layout={layout}
            // update={this.update}
            onLoad={() => console.log('loaded')}
            debug
            config={config}
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
    flex: 1,
  },
  container: {
    flex:1,
    paddingTop: 20,
    width: 400,
    backgroundColor: '#fff',
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
