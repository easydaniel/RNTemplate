import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import dgram from 'react-native-udp';
import {
  ListView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
const Buffer = require('buffer').Buffer;

import styles from '../styles/monitor';
import * as MonitorAction from '../actions/monitor';

const mapStateToProps = state => ({
  monitor: state.monitor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...MonitorAction,
}, dispatch);

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class AddDevice extends Component {

  constructor(props) {
    super(props);
    const server = dgram.createSocket('udp4');
    server.bind(8080);
    this.state = {
      UDPServer: server,
    };
    const $this = this;
    server.on('message', (msg, rinfo) => {
      const str = Object.keys(msg).map(key => String.fromCharCode(msg[key])).join('');
      const info = str.toString().match(/WCTC_(\w+),(.*)/);
      if (info) {
        $this.props.newDevice({
          mac: info[1],
          ip: info[2],
        });
      }
    });
  }

  componentWillUnmount() {
    this.state.UDPServer.close();
  }

  addDevice(data) {
    const client = dgram.createSocket('udp4');
    const message = Buffer.from(`WCTC_${data.mac}_OK\r\n`);

    client.send(message, 0, message.length, 8849, data.ip, (err) => {
      client.close();
    });
    this.props.add(data);
    Actions.pop();
  }

  render() {
    const { search } = this.props.monitor;
    const dataSource = ds.cloneWithRows(search);
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={dataSource}
        renderRow={
          data => (
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor="transparent"
              onPress={() => this.addDevice(data)}
            >
              <View style={styles.rowContainer}>
                <Text>{`Device MAC: ${data.mac}`}</Text>
              </View>
            </TouchableHighlight>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);
