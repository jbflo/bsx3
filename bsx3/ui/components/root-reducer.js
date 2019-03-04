/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from '../counter/counter-api';
import login from './login/login-api';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        counter,
        login
    });
}