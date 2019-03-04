import axios from 'axios';

// import axios from 'axios';

// Actions
export const LOGIN_REQUESTED = 'counter/LOGIN_REQUESTED';
export const LOGIN = 'counter/LOGIN';

export const initialState = {
  username: '',
  password: '',
  remember: false,
};

const API_URL = '/api/auth';

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLogin: true
      };

    case LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password
      };

    default:
      return state;
  }
};

export function authenticate(username, password) {
  return { type: LOGIN, username, password };
}

export function loginRequest(username, password) {
  return (dispatch) => {
    axios.post(`${API_URL}/login`, { username, password })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        dispatch(authenticate(username, password));
      }).catch((error) => {
        throw (error);
      });
  };
}
