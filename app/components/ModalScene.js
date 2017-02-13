import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import {
  View
} from 'react-native'

import styles from '../styles/modalScene'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

class ModalScene extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => Actions.pop()}>Close</Button>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalScene)
