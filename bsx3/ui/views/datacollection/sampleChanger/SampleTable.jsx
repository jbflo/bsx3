
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../../../components/table/Table';
import * as SampleChangerAction from '../../../app/actions/sampleChanger';
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
    rows: state.sampleChanger.rows,
    columns: state.sampleChanger.columns,
    editingRow: state.sampleChanger.editingRow,
    isAddingNewRow: state.sampleChanger.isAddingNewRow,
    showNotification: state.app.showNotification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleIsAddingNewRow: SampleChangerAction.isAddingNewRow,
    handleAddRow: SampleChangerAction.addNewRow,
    handleDuplicateRow: SampleChangerAction.duplicateNewRow,

    handleSelectEditRow: SampleChangerAction.selectEditRow,
    handleEditRow: SampleChangerAction.editRow,
    handleCancelEditRow: SampleChangerAction.CancelEditRow,

    handleDeleteRow: SampleChangerAction.deleteRow,

    handleSaveStateLocalStorage: SampleChangerAction.saveStateLocalStorage,
    handleLoadStateLocalStorage: SampleChangerAction.loadStateLocalStorage,

    handleReorderRow: SampleChangerAction.reorderRow,
    handleColumnChooser: SampleChangerAction.toggleColumnChooser,
    handleShowNotification: globalAction.showNotification,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleTable);
