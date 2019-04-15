/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import app from './main-api';
import beamline from '../beamlinestatus/beamline-api';
import sc from '../sc/sc-api';
import login from '../login/login-api';

import counter from '../counter/counter-api';


export default function createRootReducer(history) {
    // if (action.type === 'SIGNOUT') {
    //     state = undefined; // eslint-disable-line no-param-reassign
    // }

    return combineReducers({
        router: connectRouter(history),
        app,
        counter,
        login,
        beamline,
        sc,
        form: formReducer
    });
}