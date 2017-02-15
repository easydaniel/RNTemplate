import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/animation';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

class FadeAnimation extends Component {

  render() {
    return (
      <View style={styles.animation}>
        <View style={styles.animationContainer}>
          <Text>
            Fade
          </Text>
        </View>
        <View style={styles.startAnim}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={'transparent'}
            onPress={() => console.log('run')}
          >
            <Text style={{ color: '#257FED' }}>Run animation</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FadeAnimation);
