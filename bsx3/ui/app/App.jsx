import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NoRequireAuth from '../login/NoRequireAuth';
import RequireAuth from '../login/RequireAuth';

import Main from './Main';
import Login from '../login/Login';

import './app.css';

const history = createBrowserHistory();

class App extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      history.push('/');
    }
  }

  componentDidMount() {
    this.props.hideLoader();
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      history.push('/');
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={RequireAuth(Main)} />
        <Route exact path="/login" component={NoRequireAuth(Login)} />
      </div>
    );
  }
}

export default App;
