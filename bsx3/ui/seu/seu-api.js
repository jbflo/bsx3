/**
 *  Initial redux state for Seu (Sample Exposure unit ) attributes, object containing each Sample
 *  attribute (name, attribute object). Each attribute object in turn have the
 *  follwoing properties:
 *
 *     name:   name of Sample attribute
 *     value:  attributes current value
 *     state:  attributes current state, see STATE for more information
 *     msg:    arbitray message describing current state
 */

export const STATE = {
  IDLE: 'READY',
  BUSY: 'MOVING',
  ABORT: 'UNUSABLE'
};

// eslint-disable-next-line import/prefer-default-export
export const INITIAL_STATE = {
  attributes: {
    shutter: {
      limits: [
        0,
        1,
        1
      ],
      name: 'fast_shutter',
      value: 'undefined',
      state: 'undefined',
      msg: 'UNKNOWN',
      readonly: false
    },
    energy: {
      limits: [
        0,
        1000,
        0.1
      ],
      name: 'energy',
      value: '0',
      state: STATE.IDLE,
      msg: '',
      readonly: false
    },
    wavelength: {
      limits: [
        0,
        1000,
        0.1
      ],
      name: 'wavelength',
      value: '0',
      state: STATE.IDLE,
      msg: '',
      readonly: false
    },
    sampleName: {
      limits: [
        0,
        1000,
        0.1
      ],
      name: 'sampleName',
      value: '0',
      state: STATE.IDLE,
      msg: 'UNKNOWN',
      readonly: false
    },
    attenuation: {
      limits: [
        0,
        1000,
        0.1
      ],
      name: 'sampleName',
      value: '0',
      state: STATE.IDLE,
      msg: 'UNKNOWN',
      readonly: false
    },
  },
};
