import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StatusBar,
  ListView,
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import styles from '../styles/todo';
import * as TodoActions from '../actions/todo';

import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...TodoActions,
}, dispatch);

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Todo extends Component {

  render() {
    const { list } = this.props.todo;
    const dataSource = ds.cloneWithRows(list);
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={dataSource}
        renderRow={
          data => (
            <View style={styles.rowContainer} >
              <CheckBox
                label={data.title}
                checked={data.completed}
                onChange={() => this.props.toggleItem(data.id)}
                labelStyle={(data.completed ? styles.rowCompleted : styles.rowItem)}
              />
            </View>
        )}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderHeader={() => <TodoHeader />}
        renderFooter={() => <TodoFooter />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
