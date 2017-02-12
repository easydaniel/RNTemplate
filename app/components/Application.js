import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store'

import Base from './Base'

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    );
  }
}
