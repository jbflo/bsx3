import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from 'actions/app.actions';
import beamline from 'actions/beamline.actions';
import session from 'actions/session.actions';
import hardware from 'actions/hardware.actions';
import schemas from 'actions/schema.actions';
import queue from 'actions/queue.actions';

import sample from 'actions/scSample';
import buffer from 'actions/scBuffer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app,
    beamline,
    queue,
    session,
    hardware,
    schemas,
    sample,
    buffer,
  });
}
