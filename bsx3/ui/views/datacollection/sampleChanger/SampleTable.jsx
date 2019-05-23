
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

  componentDidMount() { this.props.handleLoadStateLocalStorage(); }

  componentDidUpdate() { this.props.handleSaveStateLocalStorage(this.props.Rows); }

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
    editingRow: state.sample.editingRow,
    isAddingNewRow: state.sample.isAddingNewRow,
    showNotification: state.app.showNotification,
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
    handleShowNotification: globalAction.showNotificationAction,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleTable);
