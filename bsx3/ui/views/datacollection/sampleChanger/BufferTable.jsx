
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../../../components/table/Table';
import * as bufferAction from '../../../app/actions/scBuffer';
import * as globalAction from '../../../app/actions/app';


import './style.css';

class BufferTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() { this.props.handleLoadStateLocalStorage(); }

  componentDidUpdate() { this.props.handleSaveStateLocalStorage(this.props.Rows); }

  render() {
    return [
      <div className="sctable">
        <Table {...this.props} />
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    rows: state.buffer.rows,
    columns: state.buffer.columns,
    groupColumnVisibility: state.buffer.groupColumnVisibility,
    KeyVisibility: state.buffer.KeyVisibility,
    editingRow: state.buffer.editingRow,
    isAddingNewRow: state.buffer.isAddingNewRow,
    showNotification: state.app.showNotification,
    bufferRows: state.buffer.rows,
    gridPlate: state.buffer.plateGrid,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleIsAddingNewRow: bufferAction.isAddingNewRowAction,
    handleAddRow: bufferAction.addNewRowAction,
    handleDuplicateRow: bufferAction.duplicateNewRowAction,

    handleSelectEditRow: bufferAction.selectEditRowAction,
    handleEditRow: bufferAction.editRowAction,
    handleCancelEditRow: bufferAction.cancelEditRowAction,

    handleDeleteRow: bufferAction.deleteRowAction,

    handleSaveStateLocalStorage: bufferAction.saveStateLocalStorageAction,
    handleLoadStateLocalStorage: bufferAction.loadStateLocalStorageAction,

    handleReorderRow: bufferAction.reorderRowAction,
    handleLoadRows: bufferAction.loadPlateRowsAction,
    handleLoadColumns: bufferAction.loadPlateColumnsAction,
    handleShowNotification: globalAction.showNotificationAction,

    handleColumnChooser: bufferAction.toggleColumnChooserAction,
    handleGroupColumnChooser: bufferAction.toggleGroupColumnChooserAction,
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BufferTable);
