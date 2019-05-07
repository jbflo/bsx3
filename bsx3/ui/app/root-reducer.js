/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import counter from '../counter/counter-api';
import main from './main-api';
import beamline from '../views/beamlinestatus/beamline-api';
import sampleChanger from '../views/datacollection/sampleChanger/sampleChanger-api';
import queue from '../views/datacollection/queue/queue-api';


export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        counter,
        main,
        beamline,
        sampleChanger,
        queue,
        form: formReducer
    });
}