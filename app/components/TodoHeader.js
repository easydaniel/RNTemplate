import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
} from 'react-native';
import styles from '../styles/todo';
import * as TodoActions from '../actions/todo';

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...TodoActions,
}, dispatch);


class TodoHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  submitEditing(input) {
    this.props.addItem(input);
    this.setState({ input: '' });
  }

  render() {
    const { input } = this.state;
    return (
      <View style={styles.inputContainer}>
        <View style={styles.statusBar} />
        <TextInput
          style={styles.input}
          placeholder="Add todo..."
          blurOnSubmit
          autoCorrect={false}
          onChangeText={value => this.setState({ input: value })}
          value={input}
          onSubmitEditing={() => this.submitEditing(input)}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader);
