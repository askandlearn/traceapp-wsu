/* eslint-disable no-bitwise */
//ServiceUUID = 30DFE0D6-BEEE-1520-21B4-FC6CA2817252
//NotifyUUID =
//Custom Service = F80D
//Device Info = 180A
//Model Number String = 2A24
//PNP ID (2A50)
import React, {Component, useState} from 'react';
import {Platform, View, Text} from 'react-native';
import {BleManager, Characteristic} from 'react-native-ble-plx';
import {FlatList} from 'react-native-gesture-handler';
import {cursorContainerMixin} from 'victory-native';

export default class SensorsComponent extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      info: '',
      vcnlCurrent: 0,
      bpm: 0,
      skinTemp: 0.0,
      accelX: 0,
      ibi: 0,
      pamp: 0,
      damp: 0,
      ppg: 0,
      diff: 0,
      hrv: 0,
      cbf: 0,
      hrv_pnn50: 0,
      nn50: 0,
      nBeats: 0,
      digOut: 0,
      time: 0.00,
    };
    this.ServicesUUID;
    this.CharacteristicUUID;
    this.id = '';
  }

  serviceUUID(num) {
    return this.prefixUUID + num + '0' + this.suffixUUID;
  }

  notifyUUID(num) {
    return this.prefixUUID + num + '1' + this.suffixUUID;
  }

  writeUUID(num) {
    return this.prefixUUID + num + '2' + this.suffixUUID;
  }

  info(message) {
    this.setState({info: message});
  }

  error(message) {
    this.setState({info: 'ERROR: ' + message});
  }

  updateValue(key, value) {
    this.setState({values: {...this.state.values, [key]: value}});
  }

  convertData(base64) {
    //Convert from base 64 to byte array
    var binary_string = atob(base64);
    var len = binary_string.length;
    var data = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      data[i] = binary_string.charCodeAt(i);
    }

    var t_vcnlCurrent = data[0];
    var t_bpm = data[1];
    var t_skinTemp = data[2];
    var t_accelX;
    data[3] & 0x80
      ? (t_accelX = data[3])
      : (t_accelX = -((~data[3] & 0xff) + 1)); //Two's complement
    var t_ibi = (data[5] << 8) + data[4];
    var t_pamp = (data[7] << 8) + data[6];
    var t_damp = (data[9] << 8) + data[8]; // data[8];
    var t_ppg = (data[11] << 8) + data[10];
    var t_dif;
    data[13] & 0x80
      ? (t_dif = (data[13] << 8) + data[12])
      : (t_dif = -((~((data[13] << 8) + data[12]) & 0x80) + 1)); //Two's complement
    var t_digOut = data[14];
    var t_currTime =
      ((data[18] << 24) + (data[17] << 16) + (data[16] << 8) + data[15]) *
      9.846e-6;
    var deltaT = t_currTime - this.time;

    //Update screen
    this.setState({
      ppg: t_ppg,
      dif: t_dif,
      accelX: t_accelX,
    });
    if (this.state.digOut == 0 && t_digOut == 1) {
      var t_hrv = t_ibi - this.state.ibi;

      this.setState({
        ibi: t_ibi,
        nBeats: this.nBeats++,
      });

      if (Math.abs(t_hrv) >= 50) {
        this.setState({
          nn50: this.nn50++,
        });
      }

      this.setState({
        vcnlCurrent: t_vcnlCurrent,
        bpm: t_bpm,
        skinTemp: t_skinTemp,
        ibi: t_ibi,
        pamp: t_pamp,
        damp: t_damp,
        hrv: t_hrv,
        hrv_pnn50: this.nn50 / this.nBeats,
        cbf: t_ppg,
      });
    }

    this.setState({
      time: t_currTime,
      digOut: t_digOut,
    });
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          this.scanAndConnect();
        }
      });
    } else {
      this.scanAndConnect();
    }
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info('Scanning for TRACE Device');
      console.log(device);

      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === 'TRACE') {
        this.info('Connecting to TRACE Sensor');
        this.manager.stopDeviceScan();
        // eslint-disable-next-line prettier/prettier
        device.connect()
          .then((device) => {
            this.info('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            this.info('Reterning services');
            var heartBeatService = this.manager.servicesForDevice(device.id);
            return heartBeatService;
          })
          .then((heartBeatService) => {
            this.info('Returning characteristics');
            var characteristicService = this.manager.characteristicsForDevice(
              device.id,
              heartBeatService[0].uuid,
            );
            return characteristicService;
          })
          .then((characteristicService) => {
            this.info('returning values');
            characteristicService[0].monitor((error, characteristic) => {
              if (error) {
                this.error(error.message);
                return;
              }
              if (characteristic.isNotifying) {
                this.convertData(characteristic.value);
              }
            });
          }),
          (error) => {
            this.error(error.message);
          };
      }
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.info}</Text>
        <Text>Time: {this.state.time}</Text>
        <Text>Heart Rate: {this.state.bpm}</Text>
        <Text>Vcnl Current: {this.state.vcnlCurrent}</Text>
        <Text>Skin Temp: {this.state.skinTemp}C</Text>
        <Text>IBI: {this.state.ibi}</Text>
        <Text>Pamp: {this.state.pamp}</Text>
        <Text>Damp: {this.state.damp}</Text>
        <Text>HRV: {this.state.hrv}</Text>
        <Text>CBF: {this.state.cbf}</Text>
        <Text>HRV PNN 50: {this.state.hrv_pnn50}</Text>
        <Text>PPG: {this.state.ppg}</Text>
        <Text>Dig Out: {this.state.digOut}</Text>
        <Text>Acceleraometer: {this.state.accelX}</Text>
        <Text>State Diff: {this.state.diff}</Text>
      </View>
    );
  }
}

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const atob = (input = '') => {
  let str = input.replace(/[=]+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded.",
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};
