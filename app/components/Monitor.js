import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  ListView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import styles from '../styles/monitor';
import * as MonitorActions from '../actions/monitor';

const mapStateToProps = state => ({
  monitor: state.monitor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...MonitorActions,
}, dispatch);

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Monitor extends Component {

  render() {
    const { devices } = this.props.monitor;
    const dataSource = ds.cloneWithRows(devices);
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={dataSource}
        renderRow={
          data => (
            <TouchableHighlight
              delayLongPress={1000}
              activeOpacity={0.3}
              underlayColor="transparent"
              onLongPress={() => this.props.remove(data)}
              onPress={() => Actions.device({ data })}
            >
              <View style={styles.rowContainer}>
                <Text>{`Device MAC: ${data.mac}`}</Text>
              </View>
            </TouchableHighlight>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
