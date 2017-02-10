import React, { Component, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';

const mapStateToProps = state => ({
  router: state.router,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ...routerActions,
  }, dispatch)
});

class Application extends Component {
  render() {
    return (
      <Router {...this.props} initial="signIn">
        
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
