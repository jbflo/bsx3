
import * as React from 'react';
import { connect } from 'react-redux';
import {
  SortingState,
  EditingState,
  GroupingState, IntegratedGrouping,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid, VirtualTable, Toolbar, TableHeaderRow,
  TableEditRow,
  TableEditColumn, TableColumnResizing, TableColumnVisibility,
  DragDropProvider, TableGroupRow, TableColumnReordering, GroupingPanel,
  // TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import Grid1 from '@material-ui/core/Grid';
import { Card, Button, CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import './queue.css';

import {
  generateRows,
  queueDeafaultValues,
} from '../constant/generator';

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
    style={{ marginLeft: '0px' }}
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
  if (column.name === 'control') {
    return (
      <IconButton color="secondary" title="Cancel changes">
        <CancelIcon />
      </IconButton>
    );
  }
  if (column.name === 'queuetype') {
    return <span className="btn queuetype"> HPLC</span>;
  }
  if (column.name === 'sample') {
    return <span className="btn sample"> Queue.x </span>;
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

class Queue extends React.PureComponent {
  constructor(props) {
    super(props);

    this.startQueue = this.startQueue.bind(this);
    this.stopQueue = this.stopQueue.bind(this);
    this.state = {
      columns: [
        { name: 'id', title: 'No', },
        { name: 'queuetype', title: 'Current', },
        { name: 'sample', title: 'Sample', },
        { name: 'state', title: 'State', },
        { name: 'control', title: 'Control', },
      ],
      tableColumnExtensions: [
        { columnName: 'id', width: 10 },
        { columnName: 'queuetype', width: 80 },
        { columnName: 'sample', width: 120 },
        { columnName: 'state', width: 70 },
        { columnName: 'control', width: 70 },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...queueDeafaultValues },
        length: 2,
      }),
      hiddenColumnNames: ['id'],
      addedRows: [],
    };
    const getStateRows = () => {
      const { rows } = this.state;
      return rows;
    };
    this.changeColumnWidths = (tableColumnExtensions) => {
      this.setState({ tableColumnExtensions });
    };

    this.hiddenColumnNamesChange = (hiddenColumnNames) => {
      this.setState({ hiddenColumnNames });
    };
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {

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

  startQueue() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'in');
    }
  }


  stopQueue() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'out');
    }
  }

  render() {
    const {
      rows,
      columns,
      tableColumnExtensions,
      hiddenColumnNames,
      addedRows,
    } = this.state;

    let btn = <Button style={{ backgroundColor: '#4caf50', color: '#fff' }} disabled>No State yet---</Button>;
    if (this.props.data.state === 'stop') {
      btn = <Button title="Start Queue" style={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={this.sartQueue}>{this.props.startText}</Button>;
    } else if (this.props.data.state === 'start') {
      btn = <Button style={{ backgroundColor: '#f44336', color: '#fff' }} onClick={this.stopQueue}>{this.props.stopText}</Button>;
    }
    return [
      <Paper style={{ height: '546px' }}>
        <Grid
          container
          style={{ height: '100px' }}
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <DragDropProvider />
          <SortingState
            defaultSorting={[]}
            // sorting={sorting}
            // onSortingChange={this.changeSorting}
          />
          <GroupingState />
          <IntegratedSorting />
          <IntegratedGrouping />
          <EditingState
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />
          <VirtualTable
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnResizing
            columnWidths={tableColumnExtensions}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <TableHeaderRow showSortingControls />
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
          />
          <TableColumnReordering
            defaultOrder={columns.map(column => column.name)}
            // order={columnOrder}
            // onOrderChange={this.changeColumnOrder}
          />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={60}
            showDeleteCommand
            commandComponent={Command}
          />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showSortingControls />
        </Grid>
      </Paper>,
      <Grid1
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '' }}
      >
        <Card className="cardbtnqueue">
          <CardContent>{btn}</CardContent>
        </Card>
      </Grid1>
    ];
  }
}

function mapStateToProps(state) {
  return {
    queue: state.queue,
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
)(Queue); withStyles(styles, { name: 'ControlledModeDemo' });

Queue.defaultProps = {
  startText: 'Start Queue',
  stopText: 'Stop Queue',
  labelText: '',
  pkey: undefined,
  onSave: undefined,
  data: { value: 'undefined', state: 'START', msg: 'UNKNOWN' }
};
