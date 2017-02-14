import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  View,
  Text,
} from 'react-native';

import styles from '../styles/counter';
import * as CounterActions from '../actions/counter';

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...CounterActions,
}, dispatch);

class Counter extends Component {

  asyncIncrease () {
    setTimeout(this.props.increase, 1000);
  }

  render () {
    const { count } = this.props.counter;
    return (
      <View style={styles.container}>
        <Text style={styles.value}>
          Counter = {count}
        </Text>
        <View style={styles.actions}>
          <View>
            <EntypoIcon.Button backgroundColor="#073B4C" size={16} name="plus" onPress={() => this.props.increase()}>
              <Text style={{ color: 'white' }}>Add</Text>
            </EntypoIcon.Button>
          </View>
          <EntypoIcon.Button backgroundColor="#073B4C" size={16} name="minus" onPress={() => this.props.decrease()}>
            <Text style={{ color: 'white' }}>Minus</Text>
          </EntypoIcon.Button>
          <EntypoIcon.Button backgroundColor="#073B4C" size={16} name="cw" onPress={() => this.props.reset()}>
            <Text style={{ color: 'white' }}>Reset</Text>
          </EntypoIcon.Button>
          <EntypoIcon.Button backgroundColor="#073B4C" size={16} name="cycle" onPress={() => this.asyncIncrease()}>
            <Text style={{ color: 'white' }}>Async</Text>
          </EntypoIcon.Button>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
