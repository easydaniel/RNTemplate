import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { Text } from 'react-native';

// Store
import configureStore from '../store';

// Components
import RedScene from './RedScene';
import BlueScene from './BlueScene';
import YellowScene from './YellowScene';
import TealScene from './TealScene';
import ModalScene from './ModalScene';
import Base from './Base';

import styles from '../styles/application';

// TabIcon
const TabIcon = ({ selected, title }) => (
  <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
);

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
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs
              initial
              tabBarStyle={styles.tabBar}
            >
              {/* Tab and it's scenes */}
              <Scene key="one" title="Tab one" icon={TabIcon}>
                <Scene
                  key="red"
                  component={RedScene}
                  title="Red Scene"
                />
                <Scene
                  key="blue"
                  component={BlueScene}
                  title="Blue Scene"
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="two" title="Tab two" icon={TabIcon}>
                <Scene
                  key="yellow"
                  component={YellowScene}
                  title="Yellow Scene"
                />
                <Scene
                  key="teal"
                  component={TealScene}
                  title="Teal Scene"
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="baseTab" title="Base" icon={TabIcon}>
                <Scene
                  key="base"
                  component={Base}
                  title="Base Component"
                />
              </Scene>
            </Scene>
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
