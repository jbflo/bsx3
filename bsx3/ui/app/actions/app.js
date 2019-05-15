import axios from 'axios';

const SCHEMA_API_URL = '/bsxcube/api/v0.1/schemas/';

export const INIT = 'app/INIT';
export const SHOW_NOTIFICATION_ACTION = 'app/SHOW_NOTIFICATION_ACTION';

const initialState = {
  schemas: {},
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
  return (dispatch) => {
    axios.get(`${SCHEMA_API_URL}`)
      .then((response) => {
        dispatch(initAppAction(response.data));
      })
      .catch((error) => {
        throw new Error(`GET ${SCHEMA_API_URL} failed with ${error}`);
      });
  };
}
