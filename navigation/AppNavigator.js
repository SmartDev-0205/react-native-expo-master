import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import articlesReducer from '../store/reducers/articlesReducer';
import usersReducer from '../store/reducers/usersReducer';
import thunk from 'redux-thunk';

let Navigation = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);

const rootReducer = combineReducers({
  articles: articlesReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class AppNavigator extends Component {
  render() {
    return <Provider store={store}>
      <Navigation />
    </Provider>
  }
}
