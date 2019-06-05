import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'views/login/PrivateRoute';
import Main from 'views/main/Main';
import Login from 'views/login/Login';

import './app.css';

class App extends Component {
  componentDidMount() {
    this.props.hideLoader();
  }

  render() {
    const token = localStorage.getItem('token');

    return (
      <div className="app">
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/"
            isAuthenticated={token !== null}
            component={Main}
            redirect="/login"
          />
        </Switch>
      </div>
    );
  }
}


export default App;
