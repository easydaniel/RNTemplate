import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Picker,
} from 'react-native';

import styles from '../styles/animation';

import FadeAnimation from './FadeAnimation';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const AnimationComponents = {
  fade: <FadeAnimation />,
};

class Animation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation: 'fade',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.animation} >
          {AnimationComponents[this.state.animation]}
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={this.state.animation}
            onValueChange={animation => this.setState({ animation })}
          >
            <Picker.Item label="Fade" value="fade" />
            <Picker.Item label="Stretch" value="stretch" />
          </Picker>
        </View>

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animation);
