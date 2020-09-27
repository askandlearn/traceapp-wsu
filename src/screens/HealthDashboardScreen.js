import React, { Component }  from 'react';
import { render } from 'react-dom';
import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const upData = {
    __id: 'up',
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 8],
    type: 'bar'
};
  
const downData = {
    __id: 'down',
    x: [1, 2, 3, 4, 5],
    y: [8, 4, 3, 2, 1],
    type: 'bar'
};

export default class App extends React.Component{
    state = {
        data: [upData],
        layout: { title: 'Weekly View' }
      };
    
      swapData = () => {
        if (this.state.data[0].__id === 'up') {
          this.setState({ data: [downData] });
        } else {
          this.setState({ data: [upData] });
        }
      };
    
      update = (_, { data, layout, config }, plotly) => {
        plotly.react(data, layout, config);
      };
    
      render() {
        return (
          <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require('../images/TraceBio-White.png')}></Image>    
            <Text style={styles.title}>Health Dashboard</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={this.swapData}>
                    <Text style={styles.buttonText} >Swap</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.chartRow}>
                <Plotly
                    data={this.state.data}
                    layout={this.state.layout}
                    update={this.update}
                    onLoad={() => console.log('loaded')}
                    debug
                    enableFullPlotly
                />
            </View>
          </View>
        );
    }
}

//All styling options created below
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b7b7b7'
      },
    backgroundImage:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:70,
        width: '60%',
        height: 100,
        resizeMode: "stretch"              
      },
    inputFields:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        fontWeight: 'bold',
        opacity: .4,
        borderRadius:3
    },
    title:{
        alignSelf:'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        color:'#ffffff',
        fontWeight:'bold',
        fontSize: 30
        },
    button:{
        //alignSelf: 'center',
        //width: '60%',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: 10,
        padding:10,
        borderRadius:20,
        backgroundColor:'#ff0000',            
    },
    buttonText:{
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    buttonRow: {
        flexDirection: 'row'
    },
    chartRow: {
        flex: 1,
        width: '100%'
    },
});


