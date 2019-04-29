/* eslint-disable no-param-reassign */

import {
  generateRows,
  scDeafaultValues,
} from '../../../constant/generator';

// Reducer
export const INITIAL_STATE = {

  rows: generateRows({
    columnValues: { id: ({ index }) => index, ...scDeafaultValues },
    length: 2,
  }),
  isAddingNewRow: false,
  addedRows: [],
  sorting: [],
  selection: [],

};

// Action TYPE
export const GRID_STATE_SET_ACTION = 'GRID_STATE_SET';
export const ADD_ROW_ACTION = 'sc/ADD_ROW';
export const IS_ADDING_NEW_ROW_ACTION = 'sc/IS_ADDING_NEW_ROW_ACTION';
export const EDIT_ROW_ACTION = 'sc/EDIT_ROW';
export const DELETE_ROW_ACTION = 'sc/DELETE_ROW';
export const CANCEL_EDIT_ROW_ACTION = 'sc/CANCEL_EDIT_ROW_ACTION';
export const LOAD_STATE_LOCALSTORAGE_ACTION = 'sc/LOAD_STATE_LOCALSTORAGE_ACTION';
export const REORDER_ROW_ACTION = 'sc/REORDER_ROW_ACTION';
export const SAVE_STATE_LOCALSTORAGE_ACTION = 'sc/SAVE_STATE_LOCALSTORAGE_ACTION';
export const SELECT_EDIT_ROW_ACTION = 'sc/SELECT_EDIT_ROW_ACTION';
export const ROW_COMPLETION_ACTION = 'sc/ROW_COMPLETION_ACTION';


// //////////////// Reducer /////////////////////////////////////////////////
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ROW_ACTION: {
      // let newRows = state.rows;
      // const startingAddedId = newRows.length > 0 ? newRows[newRows.length - 1].id + 1 : 0;
      // id: startingAddedId + index,
      const newrow = {
        samplename: action.newRow.samplename,
        concentration: action.newRow.concentration,
        plate: action.newRow.plate,
        row: action.newRow.row,
        column: action.newRow.column,
        frame: action.newRow.frame,
        exposuretime: action.newRow.exposuretime,
        attenuation: action.newRow.attenuation,
        buffer: action.newRow.buffer,
        flow: action.newRow.flow,
        temp: action.newRow.temp,
        id: state.rows.length,
      };

      return { ...state, rows: [...state.rows, newrow] };
    }
    case IS_ADDING_NEW_ROW_ACTION: {
      let AddingNewRow = state.isAddingNewRow;
      if (AddingNewRow !== action.value) {
        AddingNewRow = action.value;
      }
      return { ...state, isAddingNewRow: AddingNewRow };
    }
    case DELETE_ROW_ACTION: {
      const rows = state.rows.filter(({ id }) => id !== action.id);
      return { ...state, rows };
    }
    case SELECT_EDIT_ROW_ACTION: {
      const row = state.rows.find(({ id }) => id === action.id);
      return { ...state, editingRow: row };
    }
    case EDIT_ROW_ACTION: {
      const rows = state.rows.map((row) => {
        if (row.id === action.modifiedRow.id) {
          row.samplename = action.modifiedRow.samplename;
          row.concentration = action.modifiedRow.concentration;
          row.plate = action.modifiedRow.plate;
          row.row = action.modifiedRow.row;
          row.column = action.modifiedRow.column;
          row.frame = action.modifiedRow.frame;
          row.exposuretime = action.modifiedRow.exposuretime;
          row.attenuation = action.modifiedRow.attenuation;
          row.buffer = action.modifiedRow.buffer;
          row.flow = action.modifiedRow.flow;
          row.temp = action.modifiedRow.temp;
        }
        return row;
      });

      return { ...state, rows, editingRow: {} };
    }
    case CANCEL_EDIT_ROW_ACTION: {
      const newState = state.rows.length ? { ...state, editingRow: {} } : { ...state };
      return newState;
    }
    case REORDER_ROW_ACTION: {
      const clone = [...state.rows];
      const [removed] = clone.splice(action.initialPosition, 1);
      clone.splice(action.newPosition, 0, removed);
      return { ...state, rows: clone };
    }
    // case ROW_COMPLETION_ACTION: {
    //   const items = state.rows.map((row) => {
    //     if (row.id === action.modifiedRow.id) {
    //       row.completed = !row.completed;
    //     }

    //     return row;
    //   });

    //   return { ...state, items };
    // }
    default:
      return state;
  }
};

// ////////////////////  ACTIONS //////////////////
export function addRowAction(newRow) {
  return {
    type: ADD_ROW_ACTION,
    newRow,
  };
}
export function isAddingNewRowAction(value) {
  return {
    type: IS_ADDING_NEW_ROW_ACTION,
    value
  };
}
export function editRowACtion(modifiedRow) {
  return {
    type: EDIT_ROW_ACTION,
    modifiedRow
  };
}
export function deleteRowAction(id) {
  return {
    type: DELETE_ROW_ACTION,
    id
  };
}

export function cancelEditrowAction() {
  return {
    type: CANCEL_EDIT_ROW_ACTION,
  };
}

export const loadStateLocalStorageAction = () => ({
  type: LOAD_STATE_LOCALSTORAGE_ACTION,
  payload: {},
});

export const reorderRowActionAction = (initialPosition, newPosition) => ({
  type: REORDER_ROW_ACTION,
  initialPosition,
  newPosition
});

export const saveStateLocalStorageAction = state => ({
  type: SAVE_STATE_LOCALSTORAGE_ACTION,
  payload: { state },
});

export function selectEditRowAction(id) {
  return {
    type: SELECT_EDIT_ROW_ACTION,
    id
  };
}

export function ItemCompletion(modifiedRow) {
  return {
    type: ROW_COMPLETION_ACTION,
    modifiedRow
  };
}

// /////////////// Dispatch Action ///////////////////////////////
export function loadStateLocalStorage() {
  return (dispatch) => {
    dispatch(loadStateLocalStorageAction());
  };
}

export function saveStateLocalStorage() {
  return (dispatch) => {
    dispatch(loadStateLocalStorageAction());
  };
}

export function addNewRow(newRow) {
  return (dispatch) => {
    dispatch(addRowAction(newRow));
  };
}
export function isAddingNewRow(value) {
  return (dispatch) => {
    dispatch(isAddingNewRowAction(value));
  };
}

export function editRow(modifiedRow) {
  return (dispatch) => {
    dispatch(editRowACtion(modifiedRow));
  };
}

export function deleteRow(id) {
  return (dispatch) => {
    dispatch(deleteRowAction(id));
  };
}
export function CancelEditRow() {
  return (dispatch) => {
    dispatch(cancelEditrowAction());
  };
}

export function selectEditRow(id) {
  return (dispatch) => {
    dispatch(selectEditRowAction(id));
  };
}

export function reorderRow(initialPosition, newPosition) {
  return (dispatch) => {
    dispatch(reorderRowActionAction(initialPosition, newPosition));
  };
}
