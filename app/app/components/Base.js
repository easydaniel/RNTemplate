import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import {
  View,
  Text,
} from 'react-native';

import styles from '../styles/base';
import * as BaseActions from '../actions/base';

const mapStateToProps = state => ({
  base: state.base,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...BaseActions,
}, dispatch);

class Base extends Component {

  render() {
    const { count } = this.props.base;
    return (
      <View style={styles.container}>
        <Text style={styles.box}>
          Base Component: Count = {count}
        </Text>
        <Button onPress={() => this.props.action()}>Increase</Button>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base);
