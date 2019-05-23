import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './actions/app';
import beamline from './actions/beamline';
import sample from './actions/scSample';
import buffer from './actions/scBuffer';
import queue from '../views/datacollection/queue/queue-api';
import login from './actions/login';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app,
    beamline,
    sample,
    buffer,
    queue,
    login,
  });
}
