import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import {
//   MdCancel, MdSave
// } from 'react-icons/md';
// // import './Formadd.css';

export default class AddRowForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      samplename: props.row.samplename,
      concentration: props.row.concentration,
      plate: props.row.plate,
      row: props.row.row,
      column: props.row.column,
      frame: props.row.frame,
      exposuretime: props.row.exposuretime,
      attenuation: props.row.attenuation,
      buffer: props.row.buffer,
      flow: props.row.flow,
      volume: props.row.volume,
      seutemp: props.row.seutemp,
      stemp: props.row.stemp,
      energy: props.row.energy,
    };
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleAddAndResetForm = this.handleAddAndResetForm.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(event) {
    // Handle ESC Key interaction
    if (event.code === 'Escape') {
      this.props.handleCancelEditRow(event);
    }
  }

  handleRowChange(event) {
    const { name, value, checked } = event.target;
    this.setState({ [name]: value });
    this.setState({ flow: checked });
  }

  handleAddAndResetForm(event) {
    event.preventDefault();
    this.props.handleAddRow({
      ...this.props.row,
      samplename: this.state.samplename,
      concentration: this.state.concentration,
      plate: this.state.plate,
      row: this.state.row,
      column: this.state.column,
      frame: this.state.frame,
      exposuretime: this.state.exposuretime,
      attenuation: this.state.attenuation,
      buffer: this.state.buffer,
      flow: this.state.flow,
      volume: this.state.volume,
      seutemp: this.state.seutemp,
      stemp: this.state.stemp,
      energy: this.state.energy,
    });
    // Reset value
    return this.setState({
      samplename: '',
      concentration: '',
      plate: '',
      row: '',
      column: '',
      frame: '',
      exposuretime: '',
      attenuation: '',
      buffer: '',
      flow: '',
      volume: '',
      seutemp: '',
      stemp: '',
      energy: '',
    });
  }

  render() {
    return (
      <tr>
        <td>
          {/* <div className="flexclass"> */}
          {/* <MdCancel
            className="cancel-icon md-icon"
            title="Cancel adding"
            onClick={() => {
              this.props.handleIsAddingNewRow(false);
            }}
          /> */}
          {/* <MdSave
            className="save-icon md-icon"
            title="Save add row"
            // disabled={!this.state.itemValue}
            onClick={this.handleAddAndResetForm}
          /> */}
          {/* </div> */}
        </td>
        <td><input className="form-control input_add" name="samplename" required onChange={this.handleRowChange} value={this.state.samplename} /></td>
        <td><input className="form-control input_add" name="buffer" onChange={this.handleRowChange} value={this.state.buffer} /></td>
        <td><input className="form-control input_add" name="plate" onChange={this.handleRowChange} value={this.state.plate} /></td>
        <td><input className="form-control input_add" name="row" onChange={this.handleRowChange} value={this.state.row} /></td>
        <td><input className="form-control input_add" name="column" onChange={this.handleRowChange} value={this.state.column} /></td>
        <td><input className="input_check" type="checkBox" name="flow" onChange={this.handleRowChange} checked={this.state.flow} /></td>
        <td><input className="form-control input_add" name="energy" onChange={this.handleRowChange} value={this.state.energy} /></td>
        <td><input className="form-control input_add" name="volume" onChange={this.handleRowChange} value={this.state.volume} /></td>
        <td><input className="form-control input_add" name="seutemp" onChange={this.handleRowChange} value={this.state.seutemp} /></td>
        <td><input className="form-control input_add" name="stemp" onChange={this.handleRowChange} value={this.state.stemp} /></td>
        <td><input className="form-control input_add" name="concentration" onChange={this.handleRowChange} value={this.state.concentration} /></td>
        <td><input className="form-control input_add" name="frame" onChange={this.handleRowChange} value={this.state.frame} /></td>
        <td><input className="form-control input_add" name="exposuretime" onChange={this.handleRowChange} value={this.state.exposuretime} /></td>
        <td><input className="form-control input_add" name="attenuation" onChange={this.handleRowChange} value={this.state.attenuation} /></td>

        <td>
          <Button
            className=" btn-success btnadd"
            style={{ fontWeight: 'bold' }}
            onClick={this.handleAddAndResetForm}
            title="Create new row"
          >
            +
          </Button>
        </td>
      </tr>
    );
  }
}

AddRowForm.propTypes = {
  row: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    samplename: PropTypes.string.isRequired,
    concentration: PropTypes.string.isRequired,
    plate: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    frame: PropTypes.string.isRequired,
    exposuretime: PropTypes.string.isRequired,
    attenuation: PropTypes.string.isRequired,
    buffer: PropTypes.string.isRequired,
    flow: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
    seutemp: PropTypes.number.isRequired,
    stemp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
  }),
  handleAddRow: PropTypes.func.isRequired,
  // handleIsAddingNewRow: PropTypes.func.isRequired,
};

AddRowForm.defaultProps = {
  row: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    samplename: PropTypes.string.isRequired,
    concentration: PropTypes.string.isRequired,
    plate: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    frame: PropTypes.string.isRequired,
    exposuretime: PropTypes.string.isRequired,
    attenuation: PropTypes.string.isRequired,
    buffer: PropTypes.string.isRequired,
    flow: PropTypes.string.isRequired,
    seutemp: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    stemp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
  }),
};
