import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';

// Inititislize State Values //
export const INITIAL_STATE = {
  rows: [
    {
      id: 0,
      samplename: 's1',
      buffer: 'B1',
      plate: 'p1',
      row: 'r1',
      column: 'co1',
      concentration: 0,
      flow: true,
      extraflowt: '5',
      volume: 60,
      seutemp: 50,
      stemp: 6,
      energy: 17,
      viscovity: 0,
      frame: 7,
      exposuretime: 100,
      transmission: 0,
      buffermode: 'befor',
      recap: true,
      wait: '2',
    },
    {
      id: 1,
      samplename: 's2',
      buffer: 'B2',
      plate: 'p2',
      row: 'r3',
      column: 'co2',
      concentration: 0,
      flow: true,
      extraflowt: '5',
      volume: 67,
      seutemp: 58,
      stemp: 66,
      energy: 17,
      viscovity: 0,
      frame: 7,
      exposuretime: 70,
      transmission: 8,
      buffermode: 'After',
      recap: true,
      wait: '8',
    },
    {
      id: 2,
      samplename: 's3',
      buffer: 'B3',
      plate: 'p3',
      row: 'r3',
      column: 'co3',
      concentration: 0,
      flow: false,
      extraflowt: '7',
      volume: 60,
      seutemp: 50,
      stemp: 6,
      energy: 17,
      viscovity: 0,
      frame: 7,
      exposuretime: 100,
      transmission: 0,
      buffermode: 'Fisrt & after',
      recap: true,
      wait: '8',
    }
  ],

  columns: {
    samplename: {
      columnName: 'Name',
      display: true,
      size: 80,
      inputType: 'input',
    },
    buffer: {
      columnName: 'Buffer',
      display: true,
      size: 70,
    },
    plate: {
      columnName: 'Plate',
      display: true,
      size: 70,
      inputType: 'select',
      options: ['96 well Plate', '']
    },
    row: {
      columnName: 'Row',
      display: true,
      size: 40,
      inputType: 'select',
      options: []
    },
    column: {
      columnName: 'Column',
      display: true,
      size: 60,
      inputType: 'select',
      options: []
    },
    concentration: {
      columnName: 'c (mg/mL)',
      display: true,
      size: 80,
      inputType: 'input',
    },
    flow: {
      columnName: 'Flow',
      display: true,
      size: 50,
      inputType: 'checkbox',
    },
    extraflowt: {
      columnName: 'Extra Flow t(s)',
      display: true,
      size: 105,
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
    energy: {
      columnName: 'Energy',
      display: true,
      size: 75,
      inputType: 'input',
    },
    viscovity: {
      columnName: 'Viscovity',
      display: true,
      size: 80,
      inputType: 'select',
      options: ['low', 'medium', 'high']
    },
    frame: {
      columnName: 'No. Frames',
      display: true,
      size: 90,
      inputType: 'input',
    },
    exposuretime: {
      columnName: 'Exposure(s)',
      display: true,
      size: 105,
      inputType: 'input',
    },

    transmission: {
      columnName: 'Transmission %',
      display: true,
      size: 115,
      inputType: 'input',
    },
    buffermode: {
      columnName: 'Buffer mode',
      display: true,
      size: 95,
      inputType: 'select',
      options: ['Befor', 'Before & After', 'After']
    },
    recup: {
      columnName: 'Recuperation',
      display: true,
      size: 100,
      inputType: 'checkbox',
    },
    wait: {
      columnName: 'Wait(s)',
      display: true,
      size: 75,
      inputType: 'input',
    },
    tools: {
      columnName: 'Tools',
      display: true,
      size: 60,
      inputType: 'tools',
    },
  },
  groupColumnVisibility: false,
  Optimizition: ['None', 'Sample Temperature', 'Sample Name', 'Buffer'],
  editingRow: {},
  isAddingNewRow: true,
  addedRows: [],
  sorting: [],
  selections: {},
};

// //////////////////// ACTION CREATORS //////////////////
export const loadStateLocalStorageAction = createAction('sc/LOAD_STATE_LOCALSTORAGE_ACTION');
export const saveStateLocalStorageAction = createAction('sc/SAVE_STATE_LOCALSTORAGE_ACTION');
export const addNewRowAction = createAction('sc/ADD_ROW');
export const isAddingNewRowAction = createAction('sc/IS_ADDING_NEW_ROW_ACTION');
export const duplicateNewRowAction = createAction('sc/DUPLICATE_ROW_ACTION', (row, index) => ({ row, index }));
export const editRowAction = createAction('sc/EDIT_ROW');
export const selectEditRowAction = createAction('sc/SELECT_EDIT_ROW_ACTION');
export const cancelEditRowAction = createAction('sc/CANCEL_EDIT_ROW_ACTION');
export const deleteRowAction = createAction('sc/DELETE_ROW_ACTION');
export const reorderRowAction = createAction('sc/REORDER_ROW_ACTION', (initialPos, newPos) => ({ initialPos, newPos }));
export const toggleColumnChooserAction = createAction('sc/TOGGLE_COLUMN_CHOOSER_ACTION');
export const toggleGroupColumnChooserAction = createAction('sc/TOGGLE_GROUP_COLUMN_CHOOSER_ACTION');
export const rowSelection = createAction('sc/ROW_COMPLETION_ACTION');

// //////////////////// HANDLE ACTIONS / REDUCERS //////////////////
export default handleActions({
  [addNewRowAction]:
  (state, { row }) => R.evolve({ [state.rows]: R.append(row, state.rows) }, state),

  [duplicateNewRowAction](state, action) {
    const row = R.ifElse(R.propEq('id', action.payload.row.id), R.assoc('id', 666), item => item);
    const rows = R.insert(action.payload.index + 1, row(action.payload.row), state.rows);
    return { ...state, rows };
  },

  [reorderRowAction](state, action) {
    const rows = [...state.rows];
    const [removed] = rows.splice(action.payload.initialPos, 1);
    rows.splice(action.payload.newPos, 0, removed);
    return { ...state, rows };
  },

  [deleteRowAction](state, action) {
    const rows = R.remove(action.payload, action.payload, state.rows);
    console.log(rows);
    // const rows = state.rows.filter(({ id }) => id !== action.payload);
    return { ...state, rows };
  },
},
INITIAL_STATE);

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ROW_SELECTION_ACTION: {
//       const Temprows = state.rows.map((row) => {
//         if (row.id === action.selectedRow.id) {
//           row.selected = action.selectedRow.selected;
//         }
//         return row;
//       });
//       return { ...state, Temprows, selections: Temprows };
//     }
//     case IS_ADDING_NEW_ROW_ACTION: {
//       let AddingNewRow = state.isAddingNewRow;
//       if (AddingNewRow !== action.value) {
//         AddingNewRow = action.value;
//       }
//       return { ...state, isAddingNewRow: AddingNewRow };
//     }
//     case ADD_ROW_ACTION: {
//       const newrow = {
//         samplename: action.newRow.samplename,
//         concentration: action.newRow.concentration,
//         plate: action.newRow.plate,
//         row: action.newRow.row,
//         column: action.newRow.column,
//         frame: action.newRow.frame,
//         exposuretime: action.newRow.exposuretime,
//         attenuation: action.newRow.attenuation,
//         buffer: action.newRow.buffer,
//         flow: action.newRow.flow,
//         seutemp: action.newRow.seutemp,
//         stemp: action.newRow.stemp,
//         energy: action.newRow.energy,
//         volume: action.newRow.volume,
//         selected: action.newRow.selected,
//         id: state.rows.length,
//       };

//       return { ...state, rows: [newrow, ...state.rows] };
//     }

//     case DUPLICATE_ROW_ACTION: {
//       console.log('Why ? kaka:');
//       let newrow = null;
//       state.rows.map((row) => {
//         if (row.id === action.payload.rowId) {
//           newrow = row;
//         }
//         return null;
//       });
//       const duplicaterow = { ...newrow, id: state.rows.length };
//       return { ...state, rows: [duplicaterow, ...state.rows] };
//     }

//     case DELETE_ROW_ACTION: {
//       // const rows = state.rows.filter(({ row }) => row !== action.row);
//       console.log(state.rows.filter(({ row }) => row !== action.row));
//       const rows = R.without(action.row, state.rows);
//       return { ...state, rows };
//     }

//     case SELECT_EDIT_ROW_ACTION: {
//       const row = state.rows.find(({ id }) => id === action.id);
//       return { ...state, editingRow: row };
//     }

//     case EDIT_ROW_ACTION: {
//       const rows = state.rows.map((row) => {
//         if (row.id === action.modifiedRow.id) {
//           row.samplename = action.modifiedRow.samplename;
//           row.concentration = action.modifiedRow.concentration;
//           row.plate = action.modifiedRow.plate;
//           row.row = action.modifiedRow.row;
//           row.column = action.modifiedRow.column;
//           row.frame = action.modifiedRow.frame;
//           row.exposuretime = action.modifiedRow.exposuretime;
//           row.attenuation = action.modifiedRow.attenuation;
//           row.buffer = action.modifiedRow.buffer;
//           row.flow = action.modifiedRow.flow;
//           row.seutemp = action.modifiedRow.seutemp;
//           row.volume = action.modifiedRow.volume;
//           row.stemp = action.modifiedRow.stemp;
//           row.energy = action.modifiedRow.energy;
//           row.selected = action.modifiedRow.selected;
//         }
//         return row;
//       });
//       return { ...state, rows, editingRow: {} };
//     }

//     case CANCEL_EDIT_ROW_ACTION: {
//       const newState = state.rows.length ? { ...state, editingRow: {} } : { ...state };
//       return newState;
//     }
//     case REORDER_ROW_ACTION: {
//       const rows = [...state.rows];
//       const [removed] = rows.splice(action.initialPosition, 1);
//       rows.splice(action.newPosition, 0, removed);
//       return { ...state, rows };
//     }
//     case TOGGLE_COLUMN_CHOOSER_ACTION: {
//       const colum = state.columns[action.key];
//       const columns = {
//         ...state.columns,
//         [action.key]: { ...colum, display: !colum.display }
//       };
//       return { ...state, columns };
//     }
//     default:
//       return state;
//   }
// };
