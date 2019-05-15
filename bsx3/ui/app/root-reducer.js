import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './app-api';
import beamline from '../views/beamlinestatus/beamline-api';
import sampleChanger from '../views/datacollection/sampleChanger/sampleChanger-api';
import queue from '../views/datacollection/queue/queue-api';
import login from '../views/login/login-api';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app,
    beamline,
    sampleChanger,
    queue,
    login,
  });
}
