import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Button } from 'react-native'
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    isConnected: state.BLE['isConnected']
})


const Toast = ({message='Hello World'}) => {
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(-70))

    useEffect(() => {
        const callToast = () => {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true
            }).start(closeToast())
        }

        const closeToast = () => {
            setTimeout(() => {
                Animated.timing(animatedValue,{
                    toValue: -70,
                    duration: 350,
                    useNativeDriver: true
                }).start()
            }, 2000)
        }
        
        if(!props.isConnected)
            callToast();
        
    }, [props.isConnected])


    return(
        <Animated.View  style={[styles.toast,{transform: [{ translateY: animatedValue }]}]}>
            <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold', textAlign: 'center' }}>
                Device has been disconnected.
            </Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    toast:{ 
        height: 70, 
        backgroundColor: '#ff0000', 
        position: 'absolute',
        left:0, 
        top:0, 
        right:0, 
        justifyContent:  'center',
        opacity: 0.8,
      }
})

export default connect(mapStateToProps,null) (Toast);