import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity,Text, Dimensions, Linking } from 'react-native';
import Plotly from 'react-native-plotly';
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import {connect} from 'react-redux';
import ModalComponent from './Modal-Component';

const mapStateToProps = state => ({
  pnn50: state.DATA['pnn50'],
  hrv: state.DATA['hrv'],
  metrics: state.DATA['metrics'],
  isConnected : state.BLE['isConnected'],
  busy: state.BLE['busy']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: (timeout, label) => dispatch(updateMetric(timeout, label)),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})

const transactionID = 'monitor_metrics'

ASTPlot = (props) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
  const setPlot=()=>{
    // console.log("Started Timer");
   
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
    if(isConnected) {
      props.updateMetric(undefined, 'HRV');
    }
    else {
      alert("TRACE device not connected.\n\n Connect your device and try again");
    }
  }

  useEffect(()=>{
    setPlot();
  },[props.hrv])

  const onStop = async () => {
    console.log('Cancelling transaction...')
    props.stopTransaction(transactionID);
    setVisible(true)

  }
  const update = (_, { data, layout, config, }, plotly) => {
    plotly.react(data, layout, config);
  };
  const layout={
    title: 'HRV vs Time',
    showlegend:true,
    width: windowWidth,
  }
  const config={
    displaylogo:false,
    responsive:true,
    modeBarButtonsToRemove: ['toImage','lasso2d']
  }

  const [visible, setVisible] = useState(false)
  const {isConnected} = props



  return (     
      <View style={styles.container}>
      <ModalComponent visible={visible} setVisible={setVisible}/>
      <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
        <TouchableOpacity style={[styles.button, {backgroundColor: props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStart()} disabled={props.busy}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: !isConnected || !props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStop()} disabled={!isConnected || !props.busy}>
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
    marginVertical: '5%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignSelf:'center',
    width:'25%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
