import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { store, history } from 'app/redux-store';
import App from 'app/App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { initAppRequest } from 'actions/app.actions';

import * as serviceWorker from 'serviceWorker';

const target = document.querySelector('#root');

const loader = document.querySelector('#loader');
const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');

window.showLoader = showLoader;
window.hideLoader = hideLoader;

const token = localStorage.getItem('token');

if (!token) {
  store.dispatch(initAppRequest());
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
