import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './actions/app';
import beamline from './actions/beamline';
import sampleChanger from './actions/sampleChanger';
import queue from '../views/datacollection/queue/queue-api';
import login from './actions/login';

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
