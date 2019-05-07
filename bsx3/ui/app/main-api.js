

// Action TYPE
export const INIT = 'app/INIT';
export const SHOW_NOTIFICATION_ACTION = 'main/SHOW_NOTIFICATION_ACTION';


const initialState = {
  compress: false,
  autoScale: true,
  showNotification: false
};


export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...initialState
      };
    case SHOW_NOTIFICATION_ACTION: {
      let showNotif = state.showNotification;
      if (showNotif !== action.value) {
        showNotif = action.value;
      }
      return (
        { ...state, showNotification: showNotif }
        // setTimeout(() => ({ ...state, showNotification: false }), 3000)
      );
    }
    default:
      return state;
  }
};

// ////////////////////  ACTIONS //////////////////
export function showNotificationAction(value) {
  return {
    type: SHOW_NOTIFICATION_ACTION,
    value
  };
}


// /////////////// Dispatch Action ///////////////////////////////

export function showNotification(value) {
  return (dispatch) => {
    dispatch(showNotificationAction(value));
  };
}
