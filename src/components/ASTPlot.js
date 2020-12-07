import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image, Dimensions, Modal, TouchableHighlight } from 'react-native';
import Plotly from 'react-native-plotly';
import { onDisconnect, stopTransaction, updateMetric } from '../actions';
import {connect} from 'react-redux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Timer from './Timer';
import { usePrevious } from '../hooks/usePrevious';
import ModalComponent from '../components/Modal-Component';

const mapStateToProps = state => ({
  hrv: state.DATA['hrv'],
  connectedDevice: state.BLE['connectedDevice'],
  metrics: state.DATA['metrics'], //[0: time, 1: bpm, 2: ibi, 3: pamp, 4: damp, 5: ppg, 6: dif, 7: digout, 8: skintemp, 9: accelx,10: '/n'] size: 11
  isConnected : state.BLE['isConnected'],
  busy: state.BLE['busy']
})

const mapDispatchToProps = dispatch => ({
  updateMetric: () => dispatch(updateMetric()),
  stopTransaction: ID => dispatch(stopTransaction(ID)),
})


const transactionID = 'monitor_metrics'

 App =(props)=>{
  const {isConnected} = props
 // const prev = usePrevious(isConnected)
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const [startDisabled, setStartDisabled] = useState(true);
    const [stopDisabled, setStopDisabled] = useState(false);
    const[timer, setTimer] = useState(null);

    const start = () => {
      var tempSeconds = seconds;
      var tempMinutes = minutes;
      let timer = setInterval(() => {
            if (tempSeconds > 0) {
                console.log("thing");
                tempSeconds = tempSeconds - 1
                setSeconds(tempSeconds);             
            }
            if (tempSeconds === 0) {
                if (tempMinutes === 0) {
                    clearInterval(timer)
                } else {
                    tempMinutes = tempMinutes - 1;
                    tempSeconds = 59;
                    setMinutes(tempMinutes);
                    setSeconds(tempSeconds);
                }
            } 
        }, 1000);
        setTimer(timer);
    }

    
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
  const setPlot=()=>{
    // console.log("Started Timer");
   
    if(isNewData[0].y.length>100){
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
  const setPAMPVal=()=>{
    console.log("Started PAMP");
   
    if(isNewPAMP[0].y.length>100){
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
    if(isConnected===true)
    {
      start();
      setStartDisabled(true);
      setStopDisabled(false);
    }
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
  setVisible(true)
  clearInterval(timer);
        setStartDisabled(false);
        setStopDisabled(true);    
        setMinutes(3);
        setSeconds(0);
  //console.log()
 // clearInterval(plot);
}
const [visible, setVisible] = useState(false)
const [layout, setLayout]=useState({
  title: 'HR vs Time',
  showlegend:true 
})
// const [layout2, setLayout2]=useState({
//   title: 'PAMP vs Time',
//   showlegend:true 
// })
if (minutes===0 && seconds===0){
  onStop();
}
const config={
  displaylogo:false,
  responsive:true,
  toImageButtonOptions: {
    format: 'png', // one of png, svg, jpeg, webp
    filename: 'custom_image',
    height: 500,
    width: 700,
    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
  },
   modeBarStyle: {
        orientation: 'h',
        bgcolor: 'rgba(0 ,0 ,0 ,0.9)',
        //iconColor: 'rgba(0, 31, 95, 0.3)',
        //logoColor: 'rgba(0, 31, 95, 0.3)',
        //position: 
    },
}
 const swapData = () => {
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

  const update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };
  const screenWidth = Dimensions.get('window').width;
  
    return (
      <View style={styles.container}>
        <ModalComponent visible={visible} setVisible={setVisible}/>
      {/* <Timer/> */}
      <Text style={{justifyContent:'center', alignSelf:'center'}}>
            { minutes === 0 && seconds === 0
                ? <Text>Busted!</Text>
                : <Text>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
            }
            </Text>
      <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
        
        <TouchableOpacity style={[styles.button, {backgroundColor: props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStart()} disabled={props.busy}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: !isConnected || !props.busy ? 'gray' : '#ff0000'}]} onPress={() => onStop()} disabled={!isConnected || !props.busy}>
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
  modalContainer:{
    width: '97%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  slide1: {
    //height:'100%',
    //paddingHorizontal:'2%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: 20,
  },
  slide1Text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  note: {
    color: '#000000',
    fontSize: 10,
    // marginVertical:50,
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
  modalButton:{
    marginTop:10
  },
  centeredView: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },

});