import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Store
import configureStore from '../store';

// Components
import Counter from './Counter';
import Todo from './Todo';
import RedScene from './RedScene';
import BlueScene from './BlueScene';
import YellowScene from './YellowScene';
import TealScene from './TealScene';
import ModalScene from './ModalScene';

import styles from '../styles/application';

// TabIcon
const TabIcon = ({ selected, title }) => (
  <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
);

// Counter Tab Icon
const CounterTabIcon = ({ selected }) => (
  <EntypoIcon name="calculator" size={26} style={{ color: selected ? 'red' : 'black' }} />
);
// Todo Tab Icon
const TodoTabIcon = ({ selected }) => (
  <MaterialIcon name="assignment" size={26} style={{ color: selected ? 'red' : 'black' }} />
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
              <Scene key="counterTab" title="Counter" icon={CounterTabIcon}>
                <Scene
                  key="counter"
                  component={Counter}
                  title="Counter App"
                />
              </Scene>
              <Scene key="todoTab" title="Counter" icon={TodoTabIcon}>
                <Scene
                  hideNavBar
                  key="todo"
                  component={Todo}
                  title="Todo App"
                />
              </Scene>
              {/* Tab and it's scenes */}
              <Scene key="two" title="Tab two" icon={TabIcon}>
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
              <Scene key="three" title="Tab three" icon={TabIcon}>
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
