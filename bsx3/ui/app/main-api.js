import axios from 'axios';

const SCHEMA_API_URL = '/bsxcube/api/v0.1/schemas/';

export const INIT = 'app/INIT';

const initialState = {
  schemas: {}
};


export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state, schemas: { ...action.schemas }
      };
    default:
      return state;
  }
};


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
