/* eslint-disable no-param-reassign */

import {
  generateRows,
  scDeafaultRowValues,
} from '../../../constant/generator';

// Reducer
export const INITIAL_STATE = {
  rows: generateRows({
    columnValues: { id: ({ index }) => index, ...scDeafaultRowValues },
    length: 3
  }),

  columns: {
    samplename: {
      name: 'Sample Name',
      display: true,
    },
    buffer: {
      name: 'Buffer',
      display: true,
    },
    plate: {
      name: 'Plate',
      display: true,
    },
    row: {
      name: 'Row',
      display: true,
    },
    column: {
      name: 'Column',
      display: true,
    },
    flow: {
      name: 'Flow',
      display: true,
    },
    energy: {
      name: 'Energy',
      display: true,
    },
    volume: {
      name: 'volume (μl)',
      display: false,
    },
    seutemp: {
      name: 'SEU Temp.',
      display: false,
    },
    stemp: {
      name: 'Storage Temp.',
      display: false,
    },
    concentration: {
      name: 'Concentration',
      display: false,
    },
    frame: {
      name: 'Frames No.',
      display: false,
    },
    exposuretime: {
      name: 'Exp Time (ms)',
      display: false,
    },
    attenuation: {
      name: 'Attenuation %',
      display: false,
    },
    tools: {
      name: 'tools',
      display: false,
    },
  },
  editingRow: {},
  isAddingNewRow: true,
  addedRows: [],
  sorting: [],
  selections: {},
};

// Action TYPE
export const ADD_ROW_ACTION = 'sc/ADD_ROW';
export const IS_ADDING_NEW_ROW_ACTION = 'sc/IS_ADDING_NEW_ROW_ACTION';
export const EDIT_ROW_ACTION = 'sc/EDIT_ROW';
export const DELETE_ROW_ACTION = 'sc/DELETE_ROW';
export const CANCEL_EDIT_ROW_ACTION = 'sc/CANCEL_EDIT_ROW_ACTION';
export const LOAD_STATE_LOCALSTORAGE_ACTION = 'sc/LOAD_STATE_LOCALSTORAGE_ACTION';
export const REORDER_ROW_ACTION = 'sc/REORDER_ROW_ACTION';
export const TOGGLE_COLUMN_CHOOSER_ACTION = 'sc/TOGGLE_COLUMN_CHOOSER_ACTION';
export const SAVE_STATE_LOCALSTORAGE_ACTION = 'sc/SAVE_STATE_LOCALSTORAGE_ACTION';
export const SELECT_EDIT_ROW_ACTION = 'sc/SELECT_EDIT_ROW_ACTION';
export const ROW_SELECTION_ACTION = 'sc/ROW_COMPLETION_ACTION';


// //////////////// Reducer /////////////////////////////////////////////////
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROW_SELECTION_ACTION: {
      const Temprows = state.rows.map((row) => {
        if (row.id === action.selectedRow.id) {
          row.selected = action.selectedRow.selected;
        }
        return row;
      });
      return { ...state, Temprows, selections: Temprows };
    }
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
        seutemp: action.newRow.seutemp,
        stemp: action.newRow.stemp,
        energy: action.newRow.energy,
        volume: action.newRow.volume,
        selected: action.newRow.selected,
        id: state.rows.length,
      };

      return { ...state, rows: [newrow, ...state.rows] };
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
          row.seutemp = action.modifiedRow.seutemp;
          row.volume = action.modifiedRow.volume;
          row.stemp = action.modifiedRow.stemp;
          row.energy = action.modifiedRow.energy;
          row.selected = action.modifiedRow.selected;
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
      const rows = [...state.rows];
      const [removed] = rows.splice(action.initialPosition, 1);
      rows.splice(action.newPosition, 0, removed);

      return { ...state, rows };
    }
    case TOGGLE_COLUMN_CHOOSER_ACTION: {
      const column = state.columns[action.key];
      const columns = { ...state.columns, [action.key]: { ...column, display: !column.display } };

      return { ...state, columns };
    }
    default:
      return state;
  }
};

// ////////////////////  ACTIONS //////////////////
function addRowAction(newRow) {
  return {
    type: ADD_ROW_ACTION,
    newRow,
  };
}
function isAddingNewRowAction(value) {
  return {
    type: IS_ADDING_NEW_ROW_ACTION,
    value
  };
}
function editRowACtion(modifiedRow) {
  return {
    type: EDIT_ROW_ACTION,
    modifiedRow
  };
}
function deleteRowAction(id) {
  return {
    type: DELETE_ROW_ACTION,
    id
  };
}

function cancelEditrowAction() {
  return {
    type: CANCEL_EDIT_ROW_ACTION,
  };
}
function reorderRowAction(initialPosition, newPosition) {
  return {
    type: REORDER_ROW_ACTION,
    initialPosition,
    newPosition
  };
}

function toggleColumnChooserAction(key) {
  return {
    type: TOGGLE_COLUMN_CHOOSER_ACTION,
    key,
  };
}

export const loadStateLocalStorageAction = () => ({
  type: LOAD_STATE_LOCALSTORAGE_ACTION,
  payload: {},
});

export const saveStateLocalStorageAction = state => ({
  type: SAVE_STATE_LOCALSTORAGE_ACTION,
  payload: { state },
});

function selectEditRowAction(id) {
  return {
    type: SELECT_EDIT_ROW_ACTION,
    id
  };
}

export function rowSelection(selectedRow) {
  return {
    type: ROW_SELECTION_ACTION,
    selectedRow
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
    dispatch(reorderRowAction(initialPosition, newPosition));
  };
}

export function toggleColumnChooser(key) {
  return (dispatch) => {
    dispatch(toggleColumnChooserAction(key));
  };
}
