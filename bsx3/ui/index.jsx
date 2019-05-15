import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './app/redux-store';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'mdbreact/dist/css/mdb.css';
import './index.css';

import { initAppRequest } from './app/main-api';
import { loginSuccess } from './login/login-api';

const target = document.querySelector('#root');

const loader = document.querySelector('#loader');
const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');

window.showLoader = showLoader;
window.hideLoader = hideLoader;

store.dispatch(initAppRequest());

const accessToken = localStorage.getItem('access_token');

if (accessToken) {
  store.dispatch(loginSuccess(), localStorage.getItem('username'));
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App
        hideLoader={hideLoader}
      />
    </ConnectedRouter>
  </Provider>,
  target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
