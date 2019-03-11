import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import crosstabSync from 'redux-persist-crosstab';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import { persistStore } from 'redux-persist';
import NavLoggedOut from './header/NavLoggedOut';
import NavLoggedIn from './header/NavLoggedIn';
import Login from './login/Login';
import DataCollection from './dataCollection/DataCollection';
import './main.css';
// import { serverIO } from '../serverIO';
// import { getLoginInfo } from '../actions/login_action';
// eslint-disable-next-line import/prefer-default-export
// export const login = (user) => ({
//     type: types.LOGIN_USER,
//     user
// })
const history = createBrowserHistory();

// const store = createStore(rootReducer, applyMiddleware(thunk, createLogger()));

// function requireAuth(nextState, replace, callback) {
//   let state = store.getState();
//   store.dispatch(getLoginInfo()).then(() => {
//     state = store.getState();
//     if (!state.login.loggedIn) {
//       replace('/login');
//     } else {
//       serverIO.listen(store);
//       // store.dispatch(startSession());
//     }
//     return callback();
//   });
// }


// class ServerStorage {
//   setItem(key, value) {
//     if (store.getState().remoteAccess.master) {
//       serverIO.uiStorage.setItem(key, value);
//     }
//   }

//   getItem(key, cb) {
//     serverIO.uiStorage.getItem(key, cb);
//   }

//   removeItem(key) {
//     serverIO.uiStorage.removeItem(key);
//   }

//   getAllKeys(cb) {
//     serverIO.uiStorage.getAllKeys(cb);
//   }
// }

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
    // const login = true;
    // let headercontent;
    // if (login) {
    //   headercontent = <NavLoggedIn />;
    // } else { headercontent = <NavLoggedOut />; }
    if (!this.state.initialized) return <span>Loading...</span>;

    return [
    //  headercontent,
      <div className="main">
        { <Route exact path="/login" component={NavLoggedOut} />
        }
        { <Route exact path="/datacollection" component={NavLoggedIn} />
        }
        <Route exact path="/login" component={Login} />
        <Route exact path="/datacollection" component={DataCollection} />
        <Route exact path="/" component={NavLoggedIn} />
        <Route exact path="/" component={DataCollection} />
      </div>
    ];
  }
}

export default Main;
