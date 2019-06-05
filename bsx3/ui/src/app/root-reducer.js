import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from 'actions/app.actions';
import beamline from 'actions/beamline.actions';
import session from 'actions/session.actions';
import hardware from 'actions/hardware.actions';
import schemas from 'actions/schema.actions';
import sampleChanger from 'actions/sampleChanger.actions';
import queue from 'actions/queue.actions';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app,
    beamline,
    sampleChanger,
    queue,
    session,
    hardware,
    schemas
  });
}
