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
  columns: [
    {
      name: 'id',
      title: 'No.',
    },
    {
      name: 'folder',
      title: 'Folder.',
    },
    {
      name: 'samplename',
      title: 'Sample Name.',
    },
    {
      name: 'concentration',
      title: 'Concentration.',
    },
    {
      name: 'plate',
      title: 'Plate.',
    },
    {
      name: 'row',
      title: 'Row.',
    },
    {
      name: 'frame',
      title: 'Frame.',
    },
    {
      name: 'exposuretime',
      title: 'Exposure Time.',
    },
    {
      name: 'attenuation',
      title: 'Attenuation.',
    },
    {
      name: 'buffer',
      title: 'Buffer.',
    },
    {
      name: 'flow',
      title: 'Flow.',
    },
    {
      name: 'temp',
      title: 'Temp.',
    },
  ],
  rows: [
    {
      id: '0',
      folder: 'test',
      samplename: 'test',
      concentration: 'test',
      plate: 'test',
      row: 'test',
      frame: 'test',
      exposuretime: 'test',
      attenuation: 'test',
      buffer: 'test',
      flow: 'test',
      temp: 'test'
    },
    {
      id: '1',
      folder: 'test2',
      samplename: 'test2',
      concentration: 'test2',
      plate: 'test2',
      row: 'test2',
      frame: 'test2',
      exposuretime: 'Ex',
      attenuation: 'test2',
      buffer: 'test2',
      flow: 'test2',
      temp: 'test2'
    } * 10000
  ]
};


export default (state = INITIAL_STATE, action) => {
  // let data = {};

  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
