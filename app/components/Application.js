import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store'

import {
  View,
  Text
} from 'react-native'

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>Go back!</Text>
        </View>
      </Provider>
    );
  }
}
