import { handleActions } from 'redux-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import getClient from 'api/client';

export const hardwareAPIClient = getClient('/bsxcube/api/v0.1/hardware');

const initialState = {};

export const fetchHardwareRequest = createAsyncAction('hardware/FETCH_HARDWARE',
  async () => {
    const res = await hardwareAPIClient.get('');
    return res.data;
  });


export const fetchHardwareGroupsRequest = createAsyncAction('hardware/FETCH_HARDWARE_GROUPS',
  async () => {
    const res = await hardwareAPIClient.get('/groups');
    return res.data;
  });


export default handleActions(
  {
    [fetchHardwareRequest.fulfilled]: (state, action) => (
      { ...state, hardware: action.payload }
    )
  },

  initialState
);
