
import * as React from 'react';
import { connect } from 'react-redux';
import {
  SelectionState,
  IntegratedSelection,
  SortingState,
  EditingState,
  GroupingState, IntegratedGrouping,
  IntegratedSorting
} from '@devexpress/dx-react-grid';

import Nav from 'react-bootstrap/Nav';
import {
  Grid, VirtualTable, Toolbar, TableHeaderRow, TableColumnResizing,
  TableSelection,
  TableEditRow,
  TableEditColumn,
  DragDropProvider, TableGroupRow, TableColumnReordering, GroupingPanel,
  // TableFixedColumns,
} from '@devexpress/dx-react-grid-bootstrap4';
// import TableCell from '@material-ui/core/TableCell';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from 'react-bootstrap/Button';
import {
  MdEdit, MdDeleteSweep, MdCancel, MdSave
} from 'react-icons/md';
import * as action from './sc-api';
import SaveMenu from './SaveMenu';
import './sc.css';
import FolderUploader from './FolderUploader';

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      style={{ height: '35px', width: '50px', fontWeight: 'bold' }}
      onClick={onExecute}
      title="Create new row"
      variant="success"
    >
      +
    </Button>
    {/* <CommandButton icon="plus" text="New" hint="Create new row" onExecute={onExecute} /> */}
  </div>
);

const DuplicateButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      style={{ backgroundColor: '#4caf50', color: '#fff' }}
      onClick={onExecute}
      title="Create new row"
    >
      Duplicate
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  // <CommandButton icon="pencil" hint="Edit row" color="text-warning" onExecute={onExecute} />
  <MdEdit
    className="edit-icon md-icon"
    onClick={onExecute}
  />
);

const DeleteButton = ({ onExecute }) => (
  <MdDeleteSweep
    className="md-icon del-icon"
    color="dander"
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete row"
  />

);

const CommitButton = ({ onExecute }) => (
  <MdSave onClick={onExecute} title="Save changes" className="md-icon save-icon" />
);

const CancelButton = ({ onExecute }) => (
  <MdCancel color="secondary" onClick={onExecute} title="Cancel changes" className="md-icon cancel-icon" />
);

const commandComponents = {
  add: AddButton,
  duplicate: DuplicateButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const ButtonComponent = commandComponents[id];
  return (
    <ButtonComponent
      onExecute={onExecute}
    />
  );
};


const LookupEditCell = ({
  column, availableColumnValues, value, onValueChange,
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: 1
    }}
  >
    <select
      className="form-control"
      value={value}
      style={{ width: '100%', textAlign: column.align }}
      onChange={event => onValueChange(event.target.value)}
    >
      {availableColumnValues.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </td>
);

const Cell = (props) => {
  const { column } = props;
  if (column.name === '') {
    return '';
  }
  if (column.name === '') {
    return ' ';
  }
  return <VirtualTable.Cell {...props} />;
};


const getRowId = row => row.id;
const Root = props => <Grid.Root {...props} style={{ height: '100%', width: '100%' }} />;
const columns = [
  { name: 'id', title: 'No', },
  { name: 'samplename', title: 'Sample N.', },
  { name: 'concentration', title: 'Concentration', },
  { name: 'plate', title: 'Plate', },
  { name: 'row', title: 'Row', },
  { name: 'column', title: 'Column', },
  { name: 'frame', title: 'Frame', },
  { name: 'exposuretime', title: 'Exposure T', },
  { name: 'attenuation', title: 'Attenuation', },
  { name: 'buffer', title: 'Buffer', },
  { name: 'flow', title: 'Flow', },
  { name: 'temp', title: 'Temp', },
];

class ScTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // testbeam: [],
    };
  }

  render() {
    // const getStateRows = () => {
    //   const { rows } = this.props.sc.rows;
    //   return rows;
    // };
    const deleteRows = (deletedIds) => {
      const rows = this.props.sc.rows.slice();
      deletedIds.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      return rows;
    };
    const availableValues = {
      samplename: this.props.sc.scD.samplename,
    };
    const EditCell = () => {
      // const { column } = columns;
      const availableColumnValues = availableValues[columns.name];
      if (availableColumnValues) {
        return <LookupEditCell {...this.props} availableColumnValues={availableColumnValues} />;
      }
      return <TableEditRow.Cell {...this.props} />;
    };
    const changeAddedRows = () => ({
      addedRows: this.props.sc.addedRows.map(row => (Object.keys(row).length ? row : {
        samplename: availableValues.samplename[0],
      })),
    });

    const commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.props.sc.rows;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        rows = deleteRows(deleted);
      }
      return rows;
    };
    return [
      <Nav style={{ height: '470px', marginLeft: '0px', width: '100%' }}>
        <Grid
          rows={this.props.sc.rows}
          columns={columns}
          getRowId={getRowId}
          rootComponent={Root}
          className="gridtable"
        >
          <DragDropProvider />
          <SelectionState
            selection={this.props.sc.selection}
            onSelectionChange={this.props.sc.onSelectionChange}
          />
          <IntegratedSelection />
          <SortingState
            defaultSorting={[0]}
            sorting={this.props.sc.sorting}
            onSortingChange={this.props.sc.onSortingChange}
          />
          <GroupingState />
          <IntegratedSorting />
          <IntegratedGrouping />
          <EditingState
            editingRowIds={this.props.sc.editingRowIds}
            onEditingRowIdsChange={this.props.sc.onEditingRowIdsChange}
            rowChanges={this.props.sc.rowChanges}
            onRowChangesChange={this.props.sc.onRowChangesChange}
            addedRows={this.props.sc.addedRows}
            columnExtensions={this.props.sc.defaultColumnWidths}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <VirtualTable
            columnExtensions={this.props.sc.defaultColumnWidths}
            cellComponent={Cell}
            height="auto"
          />
          <TableColumnResizing
            defaultColumnWidths={this.props.sc.defaultColumnWidths}
            onColumnWidthsChange={this.props.sc.onColumnWidthsChange}
          />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <TableColumnReordering
            defaultOrder={columns.map(column => column.name)}
          />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={90}
            showAddCommand={!this.props.sc.addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showSortingControls />
          <Nav style={{ width: '100%', marginBottom: '0px' }}>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
              <SaveMenu className="menesavebtn" />
            </div>
            <div className="mr-auto" style={{ marginTop: '0px' }}>
              <FolderUploader className="folderup" />
            </div>
            <div style={{ }}>
              <Button variant="contained" className="btnaddqueue" align="right">
              Add to Queue
                <i className="fas fa-share-square" style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </Nav>
        </Grid>
      </Nav>
    ];
  }
}

function mapStateToProps(state) {
  return {
    state,
    sc: state.sc,
  };
}


const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(action.createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(action.createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(action.createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(action.createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(action.createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(action.createGridAction('filters', filters)),
  onColumnOrderChange: order => dispatch(action.createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(action.createGridAction('columnWidths', widths)),
  onRowChangesChange: rowChanges => dispatch(action.createGridAction('rowChanges', rowChanges)),
  onEditingRowIdsChange: editingRowIds => (action.createGridAction('editingRowIds', editingRowIds)),
  onAddedRowsChange: addedRows => (action.createGridAction('addedRows', addedRows)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScTable);
