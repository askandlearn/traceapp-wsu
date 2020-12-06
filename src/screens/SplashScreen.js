import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Animated, Easing, Text} from 'react-native';

export function SplashScreen() {
  const startValue = new Animated.Value(0);
  const endValue = 100;
  const duration = 4500;

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      <View style={{width: 200, height: 200}}>
        <Image
          style={styles.title}
          source={require('../images/TraceBio-White.png')}
        />
      </View>
      <Animated.View
        style={[styles.row, {transform: [{translateX: startValue}]}]}>
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
        <Image
          style={styles.image}
          source={require('../images/Pulse-Red.png')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
    flex: 1,
    height: null,
    resizeMode: 'contain',
    width: null,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});
