
import {
  generateRows,
  scDeafaultValues,
} from '../constant/generator';

// Reducer
export const INITIAL_STATE = {

  defaultColumnWidths: [
    { columnName: 'id', width: 60, editingEnabled: false },
    { columnName: 'samplename', width: 100 },
    { columnName: 'concentration', width: 110 },
    { columnName: 'plate', width: 70 },
    { columnName: 'row', width: 65 },
    { columnName: 'column', width: 85 },
    { columnName: 'frame', width: 80 },
    { columnName: 'exposuretime', width: 100 },
    { columnName: 'attenuation', width: 110 },
    { columnName: 'buffer', width: 50 },
    { columnName: 'flow', width: 80, align: 'right' },
    { columnName: 'temp', width: 80, align: 'right' },
  ],
  rows: generateRows({
    columnValues: { id: ({ index }) => index, ...scDeafaultValues },
    length: 2,
  }),
  scD: scDeafaultValues,
  addedRows: [],
};

// Action
export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export default (state = INITIAL_STATE, action) => {
  if (action.type === GRID_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
};

export const createGridAction = (partialStateName, partialStateValue) => ({
  type: GRID_STATE_CHANGE_ACTION,
  partialStateName,
  partialStateValue,
});
