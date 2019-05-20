import axios from 'axios';
import { history } from '../redux-store';

// import axios from 'axios';

// Actions
export const LOGIN_REQUESTED = 'login/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';

export const initialState = {
  username: '',
  authenticated: false,
};

const API_URL = '/bsxcube/api/v0.1/authenticator';

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
        userData: action.data,
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

export function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, data };
}

export function loginFailed(error) {
  return { type: LOGIN_ERROR, error };
}

export function loginRequest(username, password) {
  return (dispatch) => {
    axios.post(`${API_URL}/login`, { username, password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user_name', username);
        history.push('/');
      }).catch((error) => {
        dispatch(loginFailed(error));
      });
  };
}
