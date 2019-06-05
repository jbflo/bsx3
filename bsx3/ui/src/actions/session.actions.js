import { handleActions } from 'redux-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import getClient from 'api/client';
import { history } from 'app/redux-store';

export const LoginActionsClient = getClient('/bsxcube/api/v0.1/authenticator');
export const sessionAPIClient = getClient('/bsxcube/api/v0.1/session');

export const initialState = {
  username: null,
  client: null,
  operator: false,
  last_access: null,
  sessionid: null
};

function getSessionData(data) {
  return {
    username: data.data.username,
    client: data.data.username,
    operator: data.operator,
    last_access: data.operator,
    sessionid: data.sessionid
  };
}

export const loginRequest = createAsyncAction('login/LOGIN_REQUEST',
  async (username, password) => {
    const loginRes = await LoginActionsClient.post('/login', { username, password });

    if (loginRes.status === 201) {
      localStorage.setItem('token', JSON.stringify(loginRes.data.token));
      history.push('/');
    }

    return loginRes.data;
  });

export const fetchSessionRequest = createAsyncAction('session/FETCH_SESSION',
  async () => {
    const res = await sessionAPIClient.get('/current');
    return res.data;
  });

export default handleActions(
  {
    [loginRequest.fulfilled]: (state, action) => (
      { ...state, ...getSessionData(action.payload) }
    ),
    [loginRequest.rejected]: () => (
      { ...initialState }
    ),
    [fetchSessionRequest.fulfilled]: (state, action) => (
      { ...state, ...getSessionData(action.payload) }
    ),
    [fetchSessionRequest.rejected]: () => (
      { ...initialState }
    ),
  },
  initialState,
);
