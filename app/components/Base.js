import React, { Component, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import {
  View,
  Text
} from 'react-native'

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  }, dispatch)
});

class Base extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base);
