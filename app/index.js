import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';
import store from './store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        test
      </Provider>
    );
  }
}
