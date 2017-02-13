import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import {
  View
} from 'react-native'

import styles from '../styles/tealScene'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

class TealScene extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => Actions.yellow()}>Go yellow</Button>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TealScene)
