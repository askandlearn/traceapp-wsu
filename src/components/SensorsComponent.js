//UUID = 30DFE0D6-BEEE-1520-21B4-FC6CA2817252
//Custom Service = F80D
//Device Info = 180A
//Model Number String = 2A24
//PNP ID (2A50)
import React, {Component} from 'react';
import {Platform, View, Text} from 'react-native';
import {BleManager, Characteristic} from 'react-native-ble-plx';
import {FlatList} from 'react-native-gesture-handler';

export default class SensorsComponent extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {info: '', values: {}};
    this.prefixUUID = '';
    this.suffixUUID = '';
    this.sensors = {
      0: 'vcnlCurrent',
      1: 'bpm',
      2: 'skinTemp',
      3: 'accelX',
      4: 'ibi',
      5: 'damp',
      6: 'ppg',
      7: 'dif',
      8: 'digOut',
      9: 'curTime',
      10: 'deltaT',
    };
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
            var thing = this.manager.servicesForDevice(device.id);
            return thing;
          })
          .then((thing) => {
            this.info('Returning characteristics');
            var thing2 = this.manager.chacteristicsForDevice(
              device.id,
              thing[0],
            );
            return thing2;
          })
          /*.then((thing2) => {
            this.info('Subscribing to heartrate');
            var thing3 = this.manager.monitorCharacteristicForService(
              device.id,
              thing[0].uuid,
              thing2[0].uuid,
              listener(error, thing2[0]),
            );
            return thing3;
          })*/
          .then(
            (thing2) => {
              this.info(thing2[0].uuid);
            },
            (error) => {
              this.error(error.message);
            },
          );
      }
    });
  }

  async setupNotifications(device) {
    var serviceUUID = '30DFE0D6-BEEE-1520-21B4-FC6CA2817252';
    var characteristicUUID = '2A37';
    device.monitorCharacteristicForService(serviceUUID);
  }

  render() {
    return (
      <View>
        <Text>{this.state.info}</Text>
        {Object.keys(this.sensors).map((key) => {
          return (
            <Text key={key}>
              {this.sensors[key] +
                ': ' +
                (this.state.values[this.notifyUUID(key)] || '-')}
            </Text>
          );
        })}
      </View>
    );
  }
}
