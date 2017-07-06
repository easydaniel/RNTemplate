import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableHighlight,
  Switch
} from 'react-native';

import net from 'react-native-tcp';
import styles from '../styles/device';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const ptu = {
  0: 'off',
  1: 'on',
  2: 'stand-by',
  3: 'ble-connecting',
  4: 'charging',
  5: 'ptu-error',
  6: 'ptu-error',
};

class Device extends Component {

  constructor(props) {
    super(props);
    const { data } = this.props.navigationState;
    const client = new net.Socket();
    client.connect(8848, data.ip, () => {
      console.log('connected ptu');
    })
    client.on('data', (data) => {
      const info = data.toString().match(/WCTC_\w+ Vs1: (\d+) mV, Is1: (\d+) mA, T: (\d+) DegC, PRUs: (\d+), PTU_ST: (\d+)/)
      if (info) {
        const status = {
          Vs1: info[1],
          Is1: info[2],
          T: info[3],
          PRUs: info[4],
          PTU_ST: info[5]
        }
        this.setState({
          status: status
        })
      }
    });
    this.state = {
      info: data,
      status: {},
      PTUClient: client
    };
    this.powerCtrl = this.powerCtrl.bind(this);
    this.activate = this.activate.bind(this);
  }

  componentWillUnmount() {
    this.state.PTUClient.end();
    this.state.PTUClient.destroy();
  }

  powerCtrl() {
    const { info, status, PTUClient } = this.state;
    if (status.PTU_ST !== "0") {
      PTUClient.write('WCTC_PTUOFF\r\n');
    } else {
      PTUClient.write('WCTC_PTUON\r\n');
    }
  }


  activate() {
    const client = new net.Socket()
    const { info, PTUClient } = this.state;
    PTUClient.write(`WCTC_${info.mac}_OK\r\n`)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.status, null, 2)}</Text>
        <TouchableHighlight
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={() => this.powerCtrl()}
          >
          <View>
            <Text>控制 {ptu[this.state.status.PTU_ST]}</Text>
          </View>
        </TouchableHighlight>
        {/* <TouchableHighlight
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={() => this.activate()}
          >
          <View>
            <Text>Start</Text>
          </View>
        </TouchableHighlight> */}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
