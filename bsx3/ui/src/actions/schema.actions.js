import { handleActions } from 'redux-actions';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import getClient from 'api/client';

export const schemaAPIClient = getClient('/bsxcube/api/v0.1/schema');

const initialState = {};

export const fetchSchemasRequest = createAsyncAction('schema/FETCH_SCHEMAS',
  async () => {
    const res = await schemaAPIClient.get('/all');
    return res.data;
  });

export default handleActions(
  {
    [fetchSchemasRequest.fulfilled]: (state, action) => (
      { ...state, ...action.payload }
    )
  },

  initialState
);
