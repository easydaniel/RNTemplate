import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView,
  Text,
  View,
} from 'react-native';

import styles from '../styles/monitor';

const mapStateToProps = state => ({
  monitor: state.monitor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
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
            <View>
              <Text>{JSON.stringify(data)}</Text>
            </View>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
