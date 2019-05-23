/* eslint-disable no-param-reassign */
import * as R from 'ramda';
// Reducer
export const INITIAL_STATE = {
  rows: [
    {
      id: 10,
      Buffername: 'bn',
      plate: 'p1',
      row: 'r1',
      column: 'co14',
      flow: false,
      recap: true,
      energy: 17,
      volume: 60,
      seutemp: 50,
      stemp: 6,
      concentration: 0,
      viscovity: 0,
      frame: 7,
      exposuretime: 100,
      transmission: 0,
      attenuation: 23,
    },
    {
      id: 11,
      Buffername: 'b2',
      plate: 'p27',
      row: 'r83',
      column: 'co2',
      flow: true,
      recap: true,
      energy: 17,
      volume: 67,
      seutemp: 58,
      stemp: 66,
      concentration: 0,
      viscovity: 0,
      frame: 7,
      exposuretime: 70,
      transmission: 8,
      attenuation: 29,
    },
    {
      id: 22,
      Buffername: 'b3',
      plate: 'p83',
      row: 'r63',
      column: 'cor3',
      flow: false,
      recap: false,
      energy: 17,
      volume: 60,
      seutemp: 50,
      stemp: 6,
      concentration: 0,
      viscovity: 0,
      frame: 7,
      exposuretime: 160,
      transmission: 0,
      attenuation: 23,
    }
  ],

  columns: {
    Buffername: {
      columnName: 'Buffer Name',
      display: true,
      size: 105,
      inputType: 'input',
    },
    plate: {
      columnName: 'Plate',
      display: true,
      size: 70,
      inputType: 'input',
    },
    row: {
      columnName: 'Row',
      display: true,
      size: 40,
      inputType: 'input',
    },
    column: {
      columnName: 'Column',
      display: true,
      size: 60,
      inputType: 'input',
    },
    flow: {
      columnName: 'Flow',
      display: true,
      size: 50,
      inputType: 'checkbox',
    },
    recap: {
      columnName: 'Recap',
      display: true,
      size: 55,
      inputType: 'checkbox',
    },
    energy: {
      columnName: 'Energy',
      display: true,
      size: 75,
      inputType: 'input',
    },
    volume: {
      columnName: 'volume (μl)',
      display: true,
      size: 105,
      inputType: 'input',
    },
    seutemp: {
      columnName: 'SEU Temp.',
      display: true,
      size: 90,
      inputType: 'input',
    },
    stemp: {
      columnName: 'Storage Temp.',
      display: true,
      size: 110,
      inputType: 'input',
    },
    concentration: {
      columnName: 'Concentration',
      display: true,
      size: 105,
      inputType: 'input',
    },
    viscovity: {
      columnName: 'viscovity',
      display: true,
      size: 80,
      inputType: 'dropdown',
    },
    frame: {
      columnName: 'Frames No.',
      display: true,
      size: 90,
      inputType: 'input',
    },
    exposuretime: {
      columnName: 'Exp Time(ms)',
      display: true,
      size: 105,
      inputType: 'input',
    },
    transmission: {
      columnName: 'Transmission %',
      display: true,
      size: 100,
      inputType: 'input',
    },
    attenuation: {
      columnName: 'Attenuation %',
      display: true,
      size: 115,
      inputType: 'input',
    },
    tools: {
      columnName: 'tools',
      display: true,
      size: 60,
      inputType: 'tools',
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
      // const rows = state.rows.filter(({ row }) => row !== action.row);
      console.log(state.rows.filter(({ row }) => row !== action.row));
      const rows = R.without(action.row, state.rows);
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
      const columns = [...state.columns];
      const [removed] = columns.splice(action.initialPosition, 1);
      columns.splice(action.newPosition, 0, removed);

      return { ...state, columns };
    }
    case TOGGLE_COLUMN_CHOOSER_ACTION: {
      const colum = state.columns[action.key];
      const columns = {
        ...state.columns,
        [action.key]: { ...colum, display: !colum.display }
      };
      return { ...state, columns };
    }
    default:
      return state;
  }
};

// //////////////////// ACTION CREATORS //////////////////
export function isAddingNewRowAction(value) {
  return {
    type: IS_ADDING_NEW_ROW_ACTION,
    value
  };
}

export function addNewRowAction(newRow) {
  return {
    type: ADD_ROW_ACTION,
    newRow,
  };
}

export function duplicateNewRowAction(rowId) {
  return {
    type: DUPLICATE_ROW_ACTION,
    rowId,
  };
}

export function editRowAction(modifiedRow) {
  return {
    type: EDIT_ROW_ACTION,
    modifiedRow
  };
}

export function deleteRowAction(row) {
  return {
    type: DELETE_ROW_ACTION,
    row
  };
}

export function cancelEditRowAction() {
  return {
    type: CANCEL_EDIT_ROW_ACTION,
  };
}

export function reorderRowAction(initialPosition, newPosition) {
  return {
    type: REORDER_ROW_ACTION,
    initialPosition,
    newPosition
  };
}

export function toggleColumnChooserAction(key) {
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

export function selectEditRowAction(id) {
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
