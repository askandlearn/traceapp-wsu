import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import Plotly from 'react-native-plotly';
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import {connect} from 'react-redux';

function mapStateToProps(state){
  return{
    pnn50: state.DATA['pnn50'],
    hrv: state.DATA['hrv'],
    metrics: state.BLE['metrics'],
  }
}

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

RTPlot=(props)=> {

 

  //setPlot(){     
    // console.log("Started Timer");
    // let newRealtimeData = [...this.state.realtimeData];
    // //setInterval(() => {
    // if(newRealtimeData[0].y.length>5){
    //   newRealtimeData[0].y.push(Math.floor(Math.random() * 10) + 1);
    //   console.log("y second"+newRealtimeData[0].y);
    //   newRealtimeData[0].y.shift();
    //   newRealtimeData[0].x.push(this.state.count+1);
    //   newRealtimeData[0].x.shift();
    //   console.log("x second"+newRealtimeData[0].x);       
    //   this.setState({
    //     realtimeData: newRealtimeData,
    //     count: this.state.count+1
    //   });
    // }
    // else{
    //   newRealtimeData[0].y.push(newRealtimeData[0].x.length + 1);
    //   newRealtimeData[0].x.push(this.state.count+1);
    //   console.log("x first"+newRealtimeData[0].x);
    //   console.log("y first"+newRealtimeData[0].y);
    //   this.setState({
    //     realtimeData: newRealtimeData,
    //     count: this.state.count+1
    //   });
    // }
 // }, 2000);
  
//}

// handleTimer(){
//   const interval =setInterval(() => {
//     console.log(this.state.check);
//     this.setPlot();
//   }, 2000);
//   if (this.state.check==false){
//     clearInterval(interval);
//   }
// }

const [isHRV, setHRV] = useState(props.hrv);
// useEffect(() => {
//   // setInterval(() => {
//   //   setHR(props.data[1])
//   //   setIBI(props.data[2])
//   //   setSkinTemp(props.data[8])
//   //   setPAMP(props.data[3])
//   //   setDAMP(props.data[4])
//   //   setACC(props.data[9])
//   // }, 2000);
//   setHRV(props.hrv)
// },[props.hrv])
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
        isNewData[0].y.push(isHRV);
        console.log("y second"+isNewData[0].y);
        isNewData[0].y.shift();
        isNewData[0].x.push(isCount);
        isNewData[0].x.shift();
        console.log("x second"+isNewData[0].x);       
        setData(isNewData);
        setCount(isCount+1);    
      }
      else{
        isNewData[0].y.push(isHRV);
        isNewData[0].x.push(isCount);
        console.log("x first"+isNewData[0].x);
        console.log("y first"+isNewData[0].y);
        setData(isNewData);
        setCount(isCount+1);  
      }
  }

  const onStart = async () => {
    props.updateMetric();
   // setPlot();
  }

  const onStop = async () => {
    console.log('Cancelling transaction...')
    props.stopTransaction(transactionID)
  }

    return (
      <View style={styles.container}>
        <View style={styles.chartRow}>
        <TouchableOpacity style={styles.button} onPress={() => onStart()}>
            <Text>Start Plot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onStop()}>
            <Text>Stop Plot</Text>
          </TouchableOpacity>
        <Text>{props.hrv}</Text>
          <Plotly 
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
            data={isData}
            // layout={layout}
            // frames={frames}
            onInitialized={ (figure) =>this.setState(figure) }
            onUpdate={ (figure) =>  this.setState(figure) }
            enableFullPlotly={true}        
          />
        </View>
      </View>
    );
  }
  export default connect(mapStateToProps, mapDispatchToProps) (RTPlot)

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
    //alignSelf: 'center',
    //width: '60%',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 3,
    width: '40%',
    paddingVertical:6,
    borderRadius: 20,
    backgroundColor: '#ff2222',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
