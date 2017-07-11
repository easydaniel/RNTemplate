import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  ListView,
  TouchableHighlight,
  Switch,
  Text,
  Alert,
  View,
} from 'react-native';

import dgram from 'react-native-udp';
import net from 'react-native-tcp';
import { NetworkInfo } from 'react-native-network-info';

import styles from '../styles/monitor';
import * as MonitorActions from '../actions/monitor';

const mapStateToProps = state => ({
  monitor: state.monitor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...MonitorActions,
}, dispatch);

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const ptu = {
  0: 'off',
  1: 'on',
  2: 'stand-by',
  3: 'ble-connecting',
  4: 'charging',
  5: 'ptu-error',
  6: 'ptu-error',
};

class Monitor extends Component {

  constructor(props) {
    super(props);

    const server = dgram.createSocket('udp4');
    server.bind(8080);

    const client = dgram.createSocket('udp4')
    client.bind(5000, () => {
      client.setBroadcast(true)
    })

    this.state = {
      devices: {},
      UDPServer: server,
      UDPClient: client
    }
    this.addDevice = this.addDevice.bind(this)
    this.scanSubnet = this.scanSubnet.bind(this)
    this.switch = this.switch.bind(this)
    this.scanSubnet()
  }

  componentWillMount() {
    const $this = this;
    this.state.UDPServer.on('message', (msg) => {
      const info = msg.toString().match(/WCTC_(\w+),(.*)/);
      if (info) {
        const client = dgram.createSocket('udp4');
        const message = Buffer.from(`WCTC_${info[1]}_OK\r\n`);
        client.send(message, 0, message.length, 8849, info[2], (err) => {
          $this.addDevice({ mac: info[1], ip: info[2] })
          client.close();
        });
      }
    })
  }

  componentWillUnmount() {
    this.state.UDPServer.close();
    this.state.UDPClient.close();
    this.state.devices.forEach((dev) => {
      dev.client.destroy();
    })
    clearInterval(this.state.periodic)
  }

  scanSubnet() {
    NetworkInfo.getIPAddress(ip => {
      try {
        const subnet = ip.match(/(\d+\.\d+\.\d+\.)/)[1]
        const $this = this
        var periodic = setInterval(() => {
          var message = Buffer.from(`WCTC_APP_ALIVE\r\n`);
          $this.state.UDPClient.send(message, 0, message.length, 8849, subnet + '255', (err) => {
            console.log(`Send ${message.toString()} to ${subnet + '255'}`);
          });
        }, 3000)

        this.state.periodic = periodic;

        const status = {}
        for (var i = 1; i < 254; i += 1) {
          const client = new net.Socket()
          client.connect(8848, subnet + i);
          client.on('data', (msg) => {
            const info = msg.toString().match(/WCTC_(\w+) Vs1: (\d+) mV, Is1: (\d+) mA, T: (\d+) DegC, PRUs: (\d+), PTU_ST: (\d+)/)
            if (info) {
              const status = {
                Vs1: info[2],
                Is1: info[3],
                T: info[4],
                PRUs: info[5],
                PTU_ST: info[6]
              }
              this.state.devices[info[1]] = {
                status,
                client: client,
                mac: info[1],
                ip: client.address().address
              }
              this.forceUpdate();
            }
          })
          client.on('error', (e) => {
            console.log(e);
          })
          client.setTimeout(3000, () => {
            if (!client.address()) {
              client.destroy();
            }
          })
        }
      } catch (e) {
        Alert.alert('subnet scan error', `No wifi connected or network error: ${e.message}`)
        console.log(e);
      }
    });
  }

  switch(dev) {
    if (dev.status.PTU_ST !== "0") {
      dev.client.write('WCTC_PTUOFF\r\n');
    } else {
      dev.client.write('WCTC_PTUON\r\n');
    }
  }

  addDevice(data) {
    const client = new net.Socket();
    client.connect(8848, data.ip)
    client.on('data', (data) => {
      const info = data.toString().match(/WCTC_(\w+) Vs1: (\d+) mV, Is1: (\d+) mA, T: (\d+) DegC, PRUs: (\d+), PTU_ST: (\d+)/)
      if (info) {
        const status = {
          Vs1: info[2],
          Is1: info[3],
          T: info[4],
          PRUs: info[5],
          PTU_ST: info[6]
        }
        this.state.devices[info[1]].status = status
        this.forceUpdate();
      }
    });
    const dev = {
      ...data,
      status: {},
      client: client
    }
    this.state.devices[data.mac] = dev
    this.forceUpdate();
  }

  getDevice(mac) {
    this.state.devices.forEach((dev) => {
      if (dev.mac == mac) {
        return dev;
      }
    })
    return null
  }

  render() {
    const { devices } = this.state;

    const dataSource = ds.cloneWithRows(Object.keys(devices).map((mac) => (this.state.devices[mac])));
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={dataSource}
        renderRow={
          data => (
            <TouchableHighlight
              delayLongPress={1000}
              activeOpacity={0.3}
              underlayColor="transparent"
            >
              <View style={styles.rowContainer}>
                <Switch
                  onValueChange={() => this.switch(data)}
                  value={data.status.PTU_ST != '0'} />
                <View style={styles.textContainer}>
                  <Text style={styles.textHeader}>IP: {data.ip}</Text>
                  <Text style={styles.textHeader}>Mac: {data.mac}</Text>
                  <Text style={styles.textHeader}>Vs1: {Number(data.status.Vs1 / 1000).toFixed(2)} V</Text>
                  <Text style={styles.textHeader}>Is1: {data.status.Is1} mA</Text>
                  <Text style={styles.textHeader}>T: {data.status.T}&#8451;</Text>
                  <Text style={styles.textHeader}>PRUs: {data.status.PRUs}</Text>
                  <Text style={styles.textHeader}>Status: {ptu[data.status.PTU_ST]}</Text>
                </View>
              </View>
            </TouchableHighlight>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
