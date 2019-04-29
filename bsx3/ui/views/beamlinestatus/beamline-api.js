import axios from 'axios';

const API_URL = '/api/beamline';

// import fetch from 'isomorphic-fetch';
// The different states a beamline attribute can assume.
export const STATE = {
  IDLE: 'READY',
  BUSY: 'MOVING',
  ABORT: 'UNUSABLE'
};

export const SET_BL_VALUE = 'BL_ATTR_SET';
export const GET_BEAMLINE = 'beamline/GET_BEAMLINE';
export const SET_BL_STATE = 'BL_ATTR_SET_STATE';
export const UPDATE_SHUTTER = 'beamline/UPDATE_SHUTTER';


/**
 *  Initial redux state for beamline attributes, object containing each beamline
 *  attribute (name, attribute object). Each attribute object in turn have the
 *  follwoing properties:
 *
 *     name:   name of beamline attribute
 *     value:  attributes current value
 *     state:  attributes current state, see STATE for more information
 *     msg:    arbitray message describing current state
 */
export const INITIAL_STATE = {
  shutters: {
    fast_shutter: {
      name: 'fast_shutter',
      is_valid: false,
      state: 'undefined',
    }
  },
  energy: {
    name: 'Energy',
    energy: 0,
    energy_limits: [0, 0],
    state: true,
    tunable: true,
    wavelength: 0,
    wavelength_limits: [0, 0]
  },
  machine_info: {
    limits: [],
    name: 'machinfo',
    current: '0',
    state: 'STATE.IDLE',
    message: 'UNKNOWN',
    readonly: false
  },
  sampleName: {
    name: 'sampleName',
    value: '0',
    state: STATE.IDLE,
    msg: 'UNKNOWN',
    readonly: true
  },
  attenuation: {
    limits: [0, 1000, 0.1],
    name: 'sampleName',
    value: '0',
    state: STATE.IDLE,
    msg: 'UNKNOWN',
    readonly: true
  },
};

// //////////////////////// Reducer ///////////////////
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BEAMLINE:
      return Object.assign({}, state, action.data);
    case UPDATE_SHUTTER:
    {
      return {
        ...state,
        shutters: {
          ...state.shutters,
          [action.shutter.name]: { ...action.shutter }
        }
      };
    }
    default:
      return state;
  }
};


// Action functions
export function setBeamlineAction(data) {
  return { type: SET_BL_VALUE, data };
}


export function getBeamlineAction(data) {
  return { type: GET_BEAMLINE, data };
}

export function updateShutterAction(shutter) {
  return { type: UPDATE_SHUTTER, shutter };
}


export function getBeamline() {
  return (dispatch) => {
    // debugger;
    axios.post(`${API_URL}/get-beamline`)
      .then((response) => {
        dispatch(getBeamlineAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}


export function setBeamline(name) {
  return (dispatch) => {
    axios.post(`${API_URL}/${name}`)
      .then((response) => {
        dispatch(setBeamlineAction(response.data.beamline));
      })
      .catch((error) => {
        throw (error);
      });
  };
}


export function toggleShutter(name) {
  return (dispatch) => {
    axios.post(`${API_URL}/toggle-shutter`, { name })
      .then((response) => {
        dispatch(updateShutterAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}
