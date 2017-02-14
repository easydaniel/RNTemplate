import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { Text } from 'react-native';

// Store
import configureStore from '../store';

// Components
import Counter from './Counter';

import styles from '../styles/application';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
    const { isLoading, store } = this.state;
    return isLoading ? null : (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key="counter"
              component={Counter}
              title="Counter App"
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
