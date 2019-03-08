/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import counter from '../counter/counter-api';
import login from './login';
import beamline from './beamline';
import general from './general';
import taskForm from './taskForm';
import workflow from './workflow';
import remoteAccess from './remoteAccess';

export default function createRootReducer(history) {
    // if (action.type === 'SIGNOUT') {
    //     state = undefined; // eslint-disable-line no-param-reassign
    // }

    return combineReducers({
        router: connectRouter(history),
        counter,
        login,
        beamline,
        remoteAccess,
        general,
        taskForm,
        workflow,
        form: formReducer
    });
}