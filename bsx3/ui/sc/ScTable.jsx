
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
import {
  Grid, VirtualTable, Toolbar, TableHeaderRow, TableColumnResizing,
  TableSelection,
  TableEditRow,
  TableEditColumn,
  DragDropProvider, TableGroupRow, TableColumnReordering, GroupingPanel,
  // TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import SaveMenu from './SaveMenu';
import './sc.css';
import {
  generateRows,
  scDeafaultValues,
} from '../constant/generator';
import FolderUploader from './FolderUploader';


const styles = {
  lookupEditCell: {
    // paddingTop: theme.spacing.unit * 0.875,
    // paddingRight: theme.spacing.unit,
    // paddingLeft: theme.spacing.unit,
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
};

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      style={{ backgroundColor: '#4caf50', color: '#fff' }}
      onClick={onExecute}
      title="Create new row"
    >
      New
    </Button>
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
  <IconButton onClick={onExecute} title="Edit row" color="primary">
    <EditIcon style={{ color: '#00695c' }} />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    color="secondary"
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
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
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const availableValues = {
  // product: globalSalesValues.product,
  // region: globalSalesValues.region,
  // customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
)}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

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

const EditCell = (props) => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;
const Root = props => <Grid.Root {...props} style={{ height: '90%', width: '100%' }} />;


class ScTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
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
      ],
      defaultColumnWidths: [
        { columnName: 'id', width: 60 },
        { columnName: 'samplename', width: 100 },
        { columnName: 'concentration', width: 120 },
        { columnName: 'plate', width: 80 },
        { columnName: 'row', width: 65 },
        { columnName: 'column', width: 85 },
        { columnName: 'frame', width: 80 },
        { columnName: 'exposuretime', width: 100 },
        { columnName: 'attenuation', width: 110 },
        { columnName: 'buffer', width: 80 },
        { columnName: 'flow', width: 70 },
        { columnName: 'temp', width: 70 },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...scDeafaultValues },
        length: 2,
      }),
      // selection: [],
      // sorting: [],
      // editingRowIds: [],
      addedRows: [],
      // rowChanges: {},
      // columnOrder: ['id', 'Sample Name.', 'Concentration.', 'Plate.', 'Row.',
      // 'Column', 'Frame.', 'exposuretime', 'attenuation', 'buffer', 'flow', 'temp'],
      // leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
    };
    const getStateRows = () => {
      const { rows } = this.state;
      return rows;
    };

    // this.changeSelection = selection => this.setState({ selection });
    // this.changeSorting = sorting => this.setState({ sorting });
    // this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        // amount: 0,
        // discount: 0,
        // saleDate: new Date().toISOString().split('T')[0],
        // product: availableValues.product[0],
        // region: availableValues.region[0],
        // customer: availableValues.customer[0],
      })),
    });
    // this.changeRowChanges = rowChanges => this.setState({ rowChanges });
    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
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
        rows = this.deleteRows(deleted);
      }
      this.setState({ rows });
    };
    this.deleteRows = (deletedIds) => {
      const rows = getStateRows().slice();
      deletedIds.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      return rows;
    };
    // this.changeColumnOrder = (order) => {
    //   this.setState({ columnOrder: order });
    // };
  }

  render() {
    const {
      rows,
      columns,
      defaultColumnWidths,
      // selection,
      // sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      // columnOrder,
      // leftFixedColumns,
    } = this.state;

    return (
      <Paper style={{ height: '510px' }}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          rootComponent={Root}
        >
          <DragDropProvider />
          <SelectionState
            defaultSelection={[]}
            // selection={selection}
            // onSelectionChange={this.changeSelection}
          />
          <IntegratedSelection />
          <SortingState
            defaultSorting={[]}
            // sorting={sorting}
            // onSortingChange={this.changeSorting}
          />
          <GroupingState />
          <IntegratedSorting />
          <IntegratedGrouping />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />
          <VirtualTable
            columnExtensions={defaultColumnWidths}
            cellComponent={Cell}
            height="auto"
          />
          <TableColumnResizing
            defaultColumnWidths={defaultColumnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <TableColumnReordering
            defaultOrder={columns.map(column => column.name)}
            // order={columnOrder}
            // onOrderChange={this.changeColumnOrder}
          />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={110}
            showAddCommand={!addedRows.length}
            showDuplicateCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showSortingControls />
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
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
          </div>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    sc: state.sc,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScTable); withStyles(styles, { name: 'ControlledModeDemo' });
