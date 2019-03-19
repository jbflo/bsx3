/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import counter from '../counter/counter-api';
import beamline from '../beamlinestatus/beamline-api';

export default function createRootReducer(history) {
    // if (action.type === 'SIGNOUT') {
    //     state = undefined; // eslint-disable-line no-param-reassign
    // }

    return combineReducers({
        router: connectRouter(history),
        counter,
        beamline,
        form: formReducer
    });
}