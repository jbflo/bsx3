/* eslint-disable no-param-reassign */

import {
  generateRows,
  scDeafaultRowValues,
} from '../../constant/generator';

// Reducer
export const INITIAL_STATE = {
  rows: generateRows({
    columnValues: { id: ({ index }) => index, ...scDeafaultRowValues },
    length: 3
  }),

  dataTable: {
    id: ['0', '1', '2'],
    samplename: {
      columnName: 'Sample Name',
      display: true,
      size: 105,
      columnValues: ['s1', 's2', 's3'],
    },
    buffer: {
      columnName: 'Buffer',
      display: true,
      size: 70,
      columnValues: ['B1', 'B21', 'B2'],
    },
    plate: {
      columnName: 'Plate',
      display: true,
      size: 70,
      columnValues: ['p1', 'p2', 'p3'],
    },
    row: {
      columnName: 'Row',
      display: true,
      size: 40,
      columnValues: ['r1', 'R2', 'r3'],
    },
    column: {
      columnName: 'Column',
      display: true,
      size: 60,
      columnValues: ['co1', 'co23', 'co3']
    },
    flow: {
      columnName: 'Flow',
      display: true,
      size: 50,
      columnValues: [true, false, true],
    },
    recap: {
      columnName: 'Recap',
      display: true,
      size: 55,
      columnValues: [false, false, true],
    },
    energy: {
      columnName: 'Energy',
      display: true,
      size: 75,
      columnValues: [17, 27, 38],
    },
    volume: {
      columnName: 'volume (μl)',
      display: true,
      size: 105,
      columnValues: [60, 70, 67],
    },
    seutemp: {
      columnName: 'SEU Temp.',
      display: true,
      size: 90,
      columnValues: [50, 6, 55],
    },
    stemp: {
      columnName: 'Storage Temp.',
      display: true,
      size: 110,
      columnValues: [6, 7, 99],
    },
    concentration: {
      columnName: 'Concentration',
      display: true,
      size: 105,
      columnValues: [0, 0, 0],
    },
    viscovity: {
      columnName: 'viscovity',
      display: true,
      size: 80,
      columnValues: ['low', 'medium', 'high'],
    },
    frame: {
      columnName: 'Frames No.',
      display: true,
      size: 90,
      columnValues: [0, 0, 0],
    },
    exposuretime: {
      columnName: 'Exp Time(ms)',
      display: true,
      size: 105,
      columnValues: [0, 0, 0],
    },
    transmission: {
      columnName: 'Transmission %',
      display: true,
      size: 100,
      columnValues: [0, 50, 0],
    },
    attenuation: {
      columnName: 'Attenuation %',
      display: true,
      size: 115,
      columnValues: [0, 0, 100],
    },
    tools: {
      columnName: 'tools',
      display: true,
      size: 60,
      columnValues: [],
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
export const DUPLICATE_ROW_ACTION = 'sc/DUPLICATE_ROW_ACTION';
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
    case IS_ADDING_NEW_ROW_ACTION: {
      let AddingNewRow = state.isAddingNewRow;
      if (AddingNewRow !== action.value) {
        AddingNewRow = action.value;
      }
      return { ...state, isAddingNewRow: AddingNewRow };
    }
    case ADD_ROW_ACTION: {
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

    case DUPLICATE_ROW_ACTION: {
      let newrow = null;
      state.rows.map((row) => {
        if (row.id === action.rowId) {
          newrow = row;
        }
        return null;
      });
      const duplicaterow = { ...newrow, id: state.rows.length };
      return { ...state, rows: [duplicaterow, ...state.rows] };
    }

    case DELETE_ROW_ACTION: {
      const dataTable = state.dataTable.id.filter(({ id }) => id !== action.id);
      return { ...state, dataTable };
    }

    case SELECT_EDIT_ROW_ACTION: {
      const row = state.dataTable.id.find(({ id }) => id === action.id);
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
      const newState = state.dataTable.length ? { ...state, editingRow: {} } : { ...state };
      return newState;
    }
    case REORDER_ROW_ACTION: {
      const dataTable = [...state.dataTable];
      const [removed] = dataTable.splice(action.initialPosition, 1);
      dataTable.splice(action.newPosition, 0, removed);

      return { ...state, dataTable };
    }
    case TOGGLE_COLUMN_CHOOSER_ACTION: {
      const colums = state.dataTable[action.key];
      const dataTable = {
        ...state.dataTable,
        [action.key]: { ...colums, display: !colums.display }
      };
      return { ...state, dataTable };
    }
    default:
      return state;
  }
};

// ////////////////////  ACTIONS //////////////////
function isAddingNewRowAction(value) {
  return {
    type: IS_ADDING_NEW_ROW_ACTION,
    value
  };
}
function addRowAction(newRow) {
  return {
    type: ADD_ROW_ACTION,
    newRow,
  };
}
function duplicateRowAction(rowId) {
  return {
    type: DUPLICATE_ROW_ACTION,
    rowId,
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

export function isAddingNewRow(value) {
  return (dispatch) => {
    dispatch(isAddingNewRowAction(value));
  };
}
export function addNewRow(newRow) {
  return (dispatch) => {
    dispatch(addRowAction(newRow));
  };
}

export function duplicateNewRow(rowId) {
  return (dispatch) => {
    dispatch(duplicateRowAction(rowId));
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
