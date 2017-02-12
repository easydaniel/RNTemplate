import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux'
import store from '../store'

// Components
import Base from './Base'

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="base" component={Base} title="Base" initial/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
