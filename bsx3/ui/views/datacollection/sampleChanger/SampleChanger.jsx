
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import SampleChangerTable from './tableSC/SampleChangerTable';
import SaveMenu from './menu/SaveMenu';
import FolderUploader from './folderDirectory/FolderDirectory';
import * as SampleChangerAction from './sampleChanger-api';
import * as globalAction from '../../../app/main-api';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './style.css';

class SampleChanger extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() { this.props.handleLoadStateLocalStorage(); }

  componentDidUpdate() { this.props.handleSaveStateLocalStorage(this.props.Rows); }

  render() {
    return [
      <div className="sc ">
        <Nav style={{ width: '100%', marginBottom: '0px' }}>
          <div style={{ marginRight: '10px' }}>
            <SaveMenu className="menesavebtn" />
          </div>
          <div className="mr-auto" style={{ marginTop: '0px' }}>
            <FolderUploader className="folderup" />
          </div>
        </Nav>
        <SampleChangerTable {...this.props} />
        <Nav style={{ width: '100%', marginTop: '20px' }}>
          <div style={{ marginRight: '10px' }}>
            <span>
              Plate Viewer will be there
              { ' ' }
              <i className="fas fa-arrow-circle-down" />
            </span>
          </div>
        </Nav>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    rows: state.sampleChanger.rows,
    columns: state.sampleChanger.columns,
    columnId: state.sampleChanger.columnId,
    editingRow: state.sampleChanger.editingRow,
    isAddingNewRow: state.sampleChanger.isAddingNewRow,
    showNotification: state.main.showNotification,
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
)(SampleChanger);
