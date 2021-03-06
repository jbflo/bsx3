/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import createRootReducer from './root-reducer';

export const history = createHistory();

const initialState = {};
const enhancers = [];

// Logger MUST BE the last middleware
const middleware = [
    thunk,
    promiseMiddleware,
    routerMiddleware(history),
    logger
];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-underscore-dangle
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const rootReducer = createRootReducer(history);

export const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);