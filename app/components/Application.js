import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

// Store
import configureStore from '../store';

// Components
import Base from './Base';
import ModalScene from './ModalScene';

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
            {/* Base Scene */}
            <Scene
              key="base"
              component={Base}
              initial
            />
            {/* Modal Scene */}
            <Scene
              key="modal"
              component={ModalScene}
              direction="vertical"
              hideNavBar
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
