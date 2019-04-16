/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import app from './main-api';
import beamline from '../beamlinestatus/beamline-api';
import sc from '../sc/sc-api';
import queue from '../queue/queue-api';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        app,
        counter,
        login,
        beamline,
        sc,
        queue,
        form: formReducer
    });
}