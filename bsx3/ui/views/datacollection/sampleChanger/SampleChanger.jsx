
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import SampleChangerTable from './SampleChangerTable';
import SaveMenu from './SaveMenu';
import FolderUploader from './FolderUploader';
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

  componentDidMount = () => this.props.handleLoadStateLocalStorage();

  componentDidUpdate = () => this.props.handleSaveStateLocalStorage(this.props.Rows);

  handleAddRow = RowValue => this.props.handleAddRow(RowValue);

  handleCancelEditRow = () => this.props.handleCancelEditRow();

  handleDeleteRow = selectedRowId => this.props.handleDeleteRow(selectedRowId);

  handleEditRow = modifiedRow => this.props.handleEditRow(modifiedRow);

  handleRowCompletion = modifiedRow => this.props.handleRowCompletion(modifiedRow);

  handleSelectEditRow = id => this.props.handleSelectEditRow(id);

  handleReorderRow =
 (initialPosition, newPosition) => this.props.handleReorderRow(initialPosition, newPosition);

  render() {
    return [
      <div className="sc tab-content">
        <div className="flex">
          <Nav.Item className="fas fa-cogs justify-content-center">  Sample Configuration </Nav.Item>
        </div>
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
    // handleRowCompletion: SampleChangerAction.rowCompletion,
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
