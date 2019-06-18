
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../../../components/table/Table';
import * as sampleAction from '../../../app/actions/scSample';
import * as globalAction from '../../../app/actions/app';


import './style.css';

class SampleTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.handleLoadStateLocalStorage();
    this.handlePlateRowColValue();
  }

  componentDidUpdate() { this.props.handleSaveStateLocalStorage(this.props.Rows); }

  handlePlateRowColValue() {
    this.props.gridPlate.map((grid) => {
      if (grid.name === '1') {
        const rows = [];
        const cols = [];
        for (let col = 1; col <= grid.col; col += 1) {
          cols.push(col);
          // for (let row = 1; row <= grid.row; row += 1) {
          //   // rows.push(`${grid.RowHeader[row]}${col}`);
          //   rows.push(`${grid.RowHeader[row]}$`);
          // }
        }
        for (let row = 0; row < grid.row; row += 1) {
          // rows.push(`${grid.RowHeader[row]}${col}`);
          rows.push(grid.RowHeader[row]);
        }
        return (
          this.props.handleLoadRows(rows),
          this.props.handleLoadColumns(cols)
        );
      }
      return null;
    });
  }

  render() {
    return (
      <div className="sctable">
        <Table {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rows: state.sample.rows,
    columns: state.sample.columns,
    groupColumnVisibility: state.sample.groupColumnVisibility,
    KeyVisibility: state.sample.KeyVisibility,
    editingRow: state.sample.editingRow,
    isAddingNewRow: state.sample.isAddingNewRow,
    showNotification: state.app.showNotification,
    bufferRows: state.buffer.rows,
    gridPlate: state.sample.plateGrid,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleIsAddingNewRow: sampleAction.isAddingNewRowAction,
    handleAddRow: sampleAction.addNewRowAction,
    handleDuplicateRow: sampleAction.duplicateNewRowAction,

    handleSelectEditRow: sampleAction.selectEditRowAction,
    handleEditRow: sampleAction.editRowAction,
    handleCancelEditRow: sampleAction.cancelEditRowAction,

    handleDeleteRow: sampleAction.deleteRowAction,

    handleSaveStateLocalStorage: sampleAction.saveStateLocalStorageAction,
    handleLoadStateLocalStorage: sampleAction.loadStateLocalStorageAction,

    handleReorderRow: sampleAction.reorderRowAction,
    handleColumnChooser: sampleAction.toggleColumnChooserAction,
    handleLoadRows: sampleAction.loadPlateRowsAction,
    handleLoadColumns: sampleAction.loadPlateColumnsAction,
    handleShowNotification: globalAction.showNotificationAction,

    handleColumnChooser: sampleAction.toggleColumnChooserAction,
    handleGroupColumnChooser: sampleAction.toggleGroupColumnChooserAction,

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleTable);
