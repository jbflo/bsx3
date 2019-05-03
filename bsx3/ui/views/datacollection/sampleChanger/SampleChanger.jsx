
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Notification from './notification/Notification';
import SampleChangerTable from './SampleChangerTable';
import SaveMenu from './menu/SaveMenu';
import FolderUploader from './folderDirectory/FolderDirectory';
import * as SampleChangerAction from './sampleChanger-api';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
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
};

class SampleChanger extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() { this.props.handleLoadStateLocalStorage(); }

  componentDidUpdate() { this.props.handleSaveStateLocalStorage(this.props.Rows); }

  handleReorderRow(initialPosition, newPosition) {
    this.props.handleReorderRow(initialPosition, newPosition);
  }

  handleAddRow(RowValue) { this.props.handleAddRow(RowValue); }

  handleDeleteRow(selectedRowId) { this.props.handleDeleteRow(selectedRowId); }

  handleSelectEditRow(id) { this.props.handleSelectEditRow(id); }

  handleCancelEditRow() { this.props.handleCancelEditRow(); }

  handleEditRow(modifiedRow) { this.props.handleEditRow(modifiedRow); }

  render() {
    const notif = true;
    return [
      <div className="sc ">
        <Notification
          level="success"
          message="Succesfully delete row"
          visible={notif}
        />
        <Nav style={{ width: '100%', marginBottom: '0px' }}>
          <div style={{ marginRight: '10px' }}>
            <SaveMenu className="menesavebtn" />
          </div>
          <div className="mr-auto" style={{ marginTop: '0px' }}>
            <FolderUploader className="folderup" />
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
  }, dispatch);
}

SampleChanger.propTypes = SampleChangerPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleChanger);
