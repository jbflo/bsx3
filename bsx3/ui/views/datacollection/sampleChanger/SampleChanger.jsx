
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import SampleChangerTable from './SampleChangerTable';
import SaveMenu from './menu/SaveMenu';
import FolderUploader from './folderDirectory/FolderDirectory';
import * as SampleChangerAction from './sampleChanger-api';
import * as globalAction from '../../../app/main-api';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './style.css';

const SampleChangerPropTypes = {
  handleAddRow: PropTypes.func.isRequired,
  handleCancelEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleRowCompletion: PropTypes.func.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleLoadStateLocalStorage: PropTypes.func.isRequired,
  handleSaveStateLocalStorage: PropTypes.func.isRequired,
  handleReorderRow: PropTypes.func.isRequired,
  handleIsAddingNewRow: PropTypes.func.isRequired,
  handleShowNotification: PropTypes.func.isRequired,
};

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
          <div>
            {` Who are you  ${this.props.showNotification} `}
          </div>
        </Nav>
        <SampleChangerTable {...this.props} />
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    rows: state.sampleChanger.rows,
    editingRow: state.sampleChanger.editingRow,
    isAddingNewRow: state.sampleChanger.isAddingNewRow,
    showNotification: state.main.showNotification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleAddRow: SampleChangerAction.addNewRow,
    handleCancelEditRow: SampleChangerAction.CancelEditRow,
    handleDeleteRow: SampleChangerAction.deleteRow,
    handleEditRow: SampleChangerAction.editRow,
    handleSelectEditRow: SampleChangerAction.selectEditRow,
    handleSaveStateLocalStorage: SampleChangerAction.saveStateLocalStorage,
    handleLoadStateLocalStorage: SampleChangerAction.loadStateLocalStorage,
    handleReorderRow: SampleChangerAction.reorderRow,
    handleIsAddingNewRow: SampleChangerAction.isAddingNewRow,
    handleShowNotification: globalAction.showNotification,
  }, dispatch);
}

SampleChanger.propTypes = SampleChangerPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleChanger);
