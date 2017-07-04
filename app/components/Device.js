import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

import net from 'react-native-tcp';
import styles from '../styles/device';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

class Device extends Component {

  constructor(props) {
    super(props);
    const { data } = this.props.navigationState;
    const ptu = {
      0: 'off',
      1: 'on',
      2: 'stand-by',
      3: 'ble-connecting',
      4: 'charging',
      5: 'ptu-error',
      6: 'ptu-error',
    };
    const server = net.createServer(function(socket) {
      socket.on('data', (msg, rinfo) => {
        const str = Object.keys(msg).map(key => String.fromCharCode(msg[key])).join('');
        console.log(str);
      });
    }).listen(8848)
    this.state = {
      status: {},
      TCPServer: server
    };
  }

  componentWillUnmount() {
    this.state.TCPServer.close();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.status, null, 2)}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
