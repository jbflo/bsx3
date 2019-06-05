import { fetchSchemasRequest } from 'actions/schema.actions';
import * as HardwareActions from 'actions/hardware.actions';
import { fetchSessionRequest } from 'actions/session.actions';

export const INIT = 'app/INIT';
export const SHOW_NOTIFICATION_ACTION = 'app/SHOW_NOTIFICATION_ACTION';

const initialState = {
  showNotification: false
};


export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state, schemas: { ...action.schemas }
      };
    case SHOW_NOTIFICATION_ACTION: {
      let showNotif = state.showNotification;
      if (showNotif !== action.value) {
        showNotif = action.value;
      }
      return (
        { ...state, showNotification: showNotif }
      );
    }
    default:
      return state;
  }
};

export function showNotificationAction(value) {
  return {
    type: SHOW_NOTIFICATION_ACTION,
    value
  };
}

export function showNotification(value) {
  return (dispatch) => {
    dispatch(showNotificationAction(value));
  };
}

export function initAppAction(schemas) {
  return { type: INIT, schemas };
}

export function initAppRequest() {
  return function (dispatch) {
    const token = localStorage.getItem('token');

    dispatch(fetchSchemasRequest());

    // Only fetch these if authenticated
    if (token) {
      dispatch(HardwareActions.fetchHardwareRequest());
      dispatch(HardwareActions.fetchHardwareGroupsRequest());
      dispatch(fetchSessionRequest());
    }
  };
}
