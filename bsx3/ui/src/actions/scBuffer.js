import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';

import * as ID from 'shortid';

// Inititislize State Values //
export const INITIAL_STATE = {
  rows: [
    {
      id: 4,
      bufferName: 'bn',
      buffer: 'B1',
      plate: 'p1',
      row: 'r1',
      column: 'co1',
      concentration: 0,
      flow: true,
      extraflowt: 5,
      volume: 60,
      seutemp: 50,
      stemp: 6,
      energy: 12.5,
      viscovity: 0,
      frame: 7,
      exposuretime: 1,
      transmission: 100,
      buffermode: 'befor',
      recap: true,
      wait: 2,
    },
    {
      id: 5,
      bufferName: 'bn1',
      buffer: 'B2',
      plate: 'p2',
      row: 'r3',
      column: 'co2',
      concentration: 0,
      flow: true,
      extraflowt: 5,
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
      wait: 8,
    },
    {
      id: 6,
      bufferName: 'bn3',
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
      energy: 12.5,
      viscovity: 0,
      frame: 7,
      exposuretime: 1,
      transmission: 100,
      buffermode: 'Fisrt & after',
      recap: true,
      wait: 8,
    }
  ],

  columns: {
    buffer: {
      columnName: 'Buffer',
      display: true,
      width: 70,
      defaultValue: ''
    },
    plate: {
      columnName: 'Plate',
      display: true,
      width: 70,
      inputType: 'select',
      options: [1, 2, 3]
    },
    well: {
      columnName: 'Well',
      display: true,
      width: 45,
      inputType: 'select',
      options: []
    },
    row: {
      columnName: 'Row',
      display: true,
      width: 40,
      inputType: 'select',
      options: []
    },
    column: {
      columnName: 'Column',
      display: true,
      width: 60,
      inputType: 'select',
      options: []
    },
    concentration: {
      columnName: 'c (mg/mL)',
      display: true,
      width: 80,
      inputType: 'number',
      minValue: 0.01,
      maxValue: 999,
      defaultValue: 1
    },
    flow: {
      columnName: 'Flow',
      display: true,
      width: 50,
      inputType: 'checkbox',
      defaultValue: 'true'
    },
    extraflowt: {
      columnName: 'Extra Flow t(s)',
      display: true,
      width: 105,
      inputType: 'number',
      defaultValue: 5,
      minValue: 0.1,
      maxValue: 100,
    },
    volume: {
      columnName: 'volume (μl)',
      display: false,
      width: 105,
      inputType: 'number',
      defaultValue: 50,
      minValue: 10,
      maxValue: 200,
    },
    seutemp: {
      columnName: 'SEU Temp.',
      display: true,
      width: 90,
      inputType: 'number',
      defaultValue: 4,
      minValue: 4,
      maxValue: 60,
    },
    stemp: {
      columnName: 'Storage Temp.',
      display: true,
      width: 110,
      inputType: 'number',
      defaultValue: 4,
      minValue: 4,
      maxValue: 40,
    },
    energy: {
      columnName: 'Energy',
      display: false,
      width: 75,
      inputType: 'number',
      defaultValue: 12.5
    },
    viscovity: {
      columnName: 'Viscovity',
      display: false,
      width: 80,
      inputType: 'select',
      options: ['low', 'medium', 'high']
    },
    frame: {
      columnName: 'No. Frames',
      display: false,
      width: 90,
      inputType: 'number',
      defaultValue: 0
    },
    exposuretime: {
      columnName: 'Exposure(s)',
      display: false,
      width: 105,
      inputType: 'number',
      defaultValue: 1
    },

    transmission: {
      columnName: 'Transmission %',
      display: false,
      width: 115,
      inputType: 'number',
      defaultValue: 100
    },
    buffermode: {
      columnName: 'Buffer mode',
      display: false,
      width: 95,
      inputType: 'select',
      options: ['Befor', 'Before & After', 'After']
    },
    recup: {
      columnName: 'Recuperation',
      display: false,
      width: 100,
      inputType: 'checkbox',
      defaultValue: 'false'
    },
    wait: {
      columnName: 'Wait(s)',
      display: false,
      width: 75,
      inputType: 'number',
      defaultValue: '0'
    },
    tools: {
      columnName: 'Tools',
      display: true,
      width: 55,
      inputType: 'tools',
      defaultValue: '0'
    },
  },
  groupColumnVisibility: false,
  KeyVisibility: ['energy', 'viscovity', 'frame', 'exposuretime', 'transmission', 'buffermode', 'recup', 'wait'],
  Optimizition: ['None', 'Sample Temperature', 'Sample Name', 'Buffer'],
  editingRow: {},
  isAddingNewRow: true,
  addedRows: [],
  sorting: [],
  plate: [1, 2, 3],
  plateGrid: [
    {
      name: '1',
      col: 12,
      row: 8,
      heigh: 21,
      width: 18,
      RowHeader: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      type: 'square',
      title: 'Deep Well'
    },
    {
      name: '2',
      col: 11,
      row: 4,
      rowValue: [],
      heigh: 24,
      width: 20,
      RowHeader: ['A', 'B', 'C', 'D'],
      type: 'Block',
      title: '4 x ( 8 + 3 ) Block'
    },
    {
      name: '3',
      col: 12,
      row: 8,
      heigh: 20,
      width: 18,
      RowHeader: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      type: 'Round',
      title: '96 well Plate'
    }
  ],

  selections: {},
};

// //////////////////// ACTION CREATORS //////////////////
export const loadStateLocalStorageAction = createAction('bf/LOAD_STATE_LOCALSTORAGE_ACTION');
export const saveStateLocalStorageAction = createAction('bf/SAVE_STATE_LOCALSTORAGE_ACTION');
export const addNewRowAction = createAction('bf/ADD_ROW_ACTION');
export const isAddingNewRowAction = createAction('bf/IS_ADDING_NEW_ROW_ACTION');
export const duplicateNewRowAction = createAction('bf/DUPLICATE_ROW_ACTION', (row, index) => ({ row, index }));
export const editRowAction = createAction('bf/EDIT_ROW_ACTION', (row, index) => ({ row, index }));
export const selectEditRowAction = createAction('bf/SELECT_EDIT_ROW_ACTION');
export const cancelEditRowAction = createAction('bf/CANCEL_EDIT_ROW_ACTION');
export const deleteRowAction = createAction('bf/DELETE_ROW_ACTION');
export const reorderRowAction = createAction('bf/REORDER_ROW_ACTION', (initialPos, newPos) => ({ initialPos, newPos }));
export const loadPlateRowsAction = createAction('bf/LOAD_ROWS_COLUMN_ACTION');
export const loadPlateColumnsAction = createAction('bf/LOAD_COLUMN_ACTION');
export const toggleColumnChooserAction = createAction('bf/TOGGLE_COLUMN_CHOOSER_ACTION');
export const toggleGroupColumnChooserAction = createAction('bf/TOGGLE_GROUP_COLUMN_CHOOSER_ACTION', (keys, display) => ({ keys, display }));
export const rowSelection = createAction('bf/ROW_COMPLETION_ACTION');


export default handleActions({
  [addNewRowAction](state, action) {
    const row = { id: ID.generate(), ...action.payload };
    const rows = R.insert(0, row, state.rows);
    return { ...state, rows };
  },

  [duplicateNewRowAction](state, action) {
    const row = R.ifElse(R.propEq('id', action.payload.row.id), R.assoc('id', ID.generate()), item => item);
    const rows = R.insert(action.payload.index + 1, row(action.payload.row), state.rows);
    return { ...state, rows };
  },

  [selectEditRowAction](state, action) {
    const row = state.rows.find(({ id }) => id === action.payload);
    return { ...state, editingRow: row };
  },

  [cancelEditRowAction](state) {
    const newState = state.rows.length ? { ...state, editingRow: {} } : { ...state };
    return newState;
  },
  [editRowAction](state, action) {
    return R.evolve({ rows: R.update(action.payload.index, action.payload.row) }, state);
  },

  [deleteRowAction](state, action) {
    return R.evolve({ rows: R.remove(action.payload, action.payload + 1) }, state);
  },

  [reorderRowAction](state, action) {
    const rows = [...state.rows];
    const [removed] = rows.splice(action.payload.initialPos, 1);
    rows.splice(action.payload.newPos, 0, removed);
    return { ...state, rows };
  },
  [toggleColumnChooserAction](state, action) {
    const columns = R.map(
      R.when(R.propEq('columnName', state.columns[action.payload].columnName), R.assoc('display', !state.columns[action.payload].display)),
      state.columns
    );
    return { ...state, columns };
  },
  [toggleGroupColumnChooserAction](state, action) {
    const groupColumnVisibility = action.payload.display;
    const columnNames = action.payload.keys.map(key => (state.columns[key].columnName));

    const columns = R.map(
      R.when(R.propSatisfies(columnName => columnNames.includes(columnName), 'columnName'),
        R.assoc('display', groupColumnVisibility)),
      state.columns
    );
    return { ...state, columns, groupColumnVisibility };
  },
  // [loadPlateRowsAction](state, action) {
  //   const columnNames = ['row', 'column'].map(key => (state.columns[key].columnName));

  //   let options = null;
  //   if (action.payload.rows) {
  //     options = action.payload.rows;
  //   } else if (action.payload.cols) options = action.payload.cols;

  //   const columns = R.map(
  //     R.when(R.propSatisfies(columnName => columnNames.includes(columnName), 'columnName'),
  //       R.assoc('options', options)),
  //     state.columns
  //   );
  //   console.log(columns);
  //   return { ...state, columns };
  // },
  [loadPlateRowsAction](state, action) {
    const columns = R.map(
      R.when(R.propEq('columnName', 'Row'), R.assoc('options', action.payload)),
      state.columns
    );
    return { ...state, columns };
  },
  [loadPlateColumnsAction](state, action) {
    const columns = R.map(
      R.when(R.propEq('columnName', 'Column'), R.assoc('options', action.payload)),
      state.columns
    );
    return { ...state, columns };
  },
},
INITIAL_STATE);
