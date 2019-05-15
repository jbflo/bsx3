import axios from 'axios';
import { history } from '../../app/redux-store';

// import axios from 'axios';

// Actions
export const LOGIN_REQUESTED = 'counter/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'counter/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'counter/LOGIN_ERROR';

export const initialState = {
  username: '',
  authenticated: false,
};

const API_URL = '/bsxcube/api/v0.1/auth';

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isLogin: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
        authenticated: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        username: null,
        authenticated: false,
        error: action.error
      };
    default:
      return state;
  }
};

export function loginSuccess(username) {
  return { type: LOGIN_SUCCESS, username };
}

export function loginFailed(error) {
  return { type: LOGIN_ERROR, error };
}


export function loginRequest(username, password) {
  return (dispatch) => {
    axios.post(`${API_URL}/login`, { username, password })
      .then((response) => {
        dispatch(loginSuccess(username));
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_name', username);
        history.push('/');
      }).catch((error) => {
        dispatch(loginFailed(error));
      });
  };
}
