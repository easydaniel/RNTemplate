import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux'
import store from '../store'

// Components
import Base from './Base'
import RedScene from './RedScene'
import BlueScene from './BlueScene'
import YellowScene from './YellowScene'
import TealScene from './TealScene'
import ModalScene from './ModalScene'

// TabIcon
import { Text } from 'react-native'
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs={true}
              initial
              tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Tab and it's scenes */}
              <Scene key="tabone" title="Tab one" icon={TabIcon}>
                <Scene key="red"
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
              <Scene key="tabtwo" title="Tab two" icon={TabIcon}>
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
              <Scene key="tabthree" title="Base" icon={TabIcon}>
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
