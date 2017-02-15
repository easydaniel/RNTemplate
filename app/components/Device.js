import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

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
    this.state = {
      ...data,
      vs1: 25,
      is1: 60,
      temp: 25,
      pru: 2,
      status: ptu[2],
    };
    this.updateDevice = this.updateDevice.bind(this);
  }

  componentWillMount() {
    this.setState({
      routine: setInterval(this.updateDevice, 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.routine);
  }

  updateDevice() {
    this.setState({
      ...this.state,
      vs1: 25 + Math.floor(Math.random() * (60 - 25 + 1)),
      is1: 60 + Math.floor(Math.random() * (120 - 60 + 1)),
      temp: 20 + Math.floor(Math.random() * (80 - 20 + 1)),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
