import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { connect } from 'react-redux';
import { testUser } from '../store/actions/userActions';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'app.json',
  };
  
  render() {
/**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <ExpoConfigView />;
  }
}

const mapStateToProps = state => {
  return {
      testData: state.users.testData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      testUser: ()=>dispatch(testUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
