import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NoRequireAuth from '../login/NoRequireAuth';
import RequireAuth from '../login/RequireAuth';

// import NavLoggedOut from '../header/NavLoggedOut';
import NavLoggedIn from '../header/NavLoggedIn';
import LoginJSForm from '../login/LoginJSForm';
// import Datacollection from '../datacollection/DataCollection';
import './main.css';

const history = createBrowserHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { initialized: false };
  }

  componentWillMount() {
    this.setState({ initialized: true });
    if (!this.props.authenticated) {
      history.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      history.push('/');
    }
  }

  render() {
    if (!this.state.initialized) return <span>Loading...</span>;

    return [
      <div className="main">
        <Route exact path="/" component={RequireAuth(NavLoggedIn)} />
        <Route exact path="/login" component={NoRequireAuth(LoginJSForm)} />
      </div>
    ];
  }
}

export default Main;
