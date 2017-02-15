import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

// Store
import configureStore from '../store';

// Components
import Monitor from './Monitor';

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
              title="Monitor"
              key="monitor"
              component={Monitor}
              initial
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
