import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/todo';
import * as TodoActions from '../actions/todo';

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...TodoActions,
}, dispatch);


class TodoFooter extends Component {

  render() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => this.props.reset()}>
          <Text style={styles.footerText}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFooter);
