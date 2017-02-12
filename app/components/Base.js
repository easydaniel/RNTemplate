import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import styles from '../styles/base'
import * as BaseActions from '../actions/base'

const mapStateToProps = state => ({
  base: state.base,
  route: state.route
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...BaseActions
}, dispatch)

class Base extends Component {

  render() {
    const { count } = this.props.base
    return (
      <View style={styles.container}>
        <Text style={styles.box}>
          Base Component: Count = {count}
        </Text>
        <TouchableHighlight onPress={() => this.props.action()}>
          <Text>Increase</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
