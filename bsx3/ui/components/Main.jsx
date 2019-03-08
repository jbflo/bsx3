import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { IndexRoute } from 'react-router';
// import crosstabSync from 'redux-persist-crosstab';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import { persistStore } from 'redux-persist';
import NavLoggedOut from './header/NavLoggedOut';
import NavLoggedIn from './header/NavLoggedIn';
import Login from './login/Login';
import DataCollection from './dataCollection/DataCollection';
// import { serverIO } from '../serverIO';
// import { getLoginInfo } from '../actions/login_action';

import './main.css';

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
    // const persistor = persistStore(store,
    //   {
    //     blacklist: ['remoteAccess', 'beamline', 'sampleChanger',
    //       'form', 'login', 'general', 'logger', 'shapes',
    //       'sampleView', 'taskResult', 'sampleChangerMaintenance'],
    //     storage: new ServerStorage()
    //   },
    //   () => {
    /* eslint-disable react/no-set-state */
    this.setState({ initialized: true });
    /* eslint-enable react/no-set-state */
    // });

    // serverIO.connectStateSocket(persistor);

    // crosstabSync(persistor);
  }


  render() {
    const login = true;
    let headercontent;
    if (login) { headercontent = <NavLoggedIn />; } else { headercontent = <NavLoggedOut />; }
    if (!this.state.initialized) return <span>Loading...</span>;

    return [
      headercontent,
      <div className="main">
        <Route exact path="/login" component={Login} />
        <Route exact path="/datacollection" component={DataCollection} />
        {/* <Route exact path="/" component={DataCollection}>
          <IndexRoute component={SampleViewContainer} />
          <Route path="/datacollection" component={SampleViewContainer} />
        </Route> */}
      </div>
    ];
  }
}

export default Main;
