import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MdCancel, MdSave
} from 'react-icons/md';
// import './Formadd.css';

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
      temp: props.row.temp,
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
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
      temp: this.state.temp,
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
      temp: '',
    });
  }

  render() {
    return (
      <tr name="form_add" method="POST" onSubmit={this.handleAddAndResetForm}>
        <td>
          <div className="flexclass">
            <MdCancel
              className="cancel-icon md-icon"
              title="Cancel adding"
              onClick={() => {
                this.props.handleIsAddingNewRow(false);
              }}
            />
            <MdSave
              className="save-icon md-icon"
              title="Save add row"
              // disabled={!this.state.itemValue}
              onClick={this.handleAddAndResetForm}
            />
          </div>
        </td>
        <td><input className="form-control input_add" name="samplename" type="text" onChange={this.handleRowChange} value={this.state.samplename} /></td>
        <td><input className="form-control input_add" name="concentration" type="text" onChange={this.handleRowChange} value={this.state.concentration} /></td>
        <td><input className="form-control input_add" name="plate" type="text" onChange={this.handleRowChange} value={this.state.plate} /></td>
        <td><input className="form-control input_add" name="row" type="text" onChange={this.handleRowChange} value={this.state.row} /></td>
        <td><input className="form-control input_add" name="column" type="text" onChange={this.handleRowChange} value={this.state.column} /></td>
        <td><input className="form-control input_add" name="frame" type="text" onChange={this.handleRowChange} value={this.state.frame} /></td>
        <td><input className="form-control input_add" name="exposuretime" type="text" onChange={this.handleRowChange} value={this.state.exposuretime} /></td>
        <td><input className="form-control input_add" name="attenuation" type="text" onChange={this.handleRowChange} value={this.state.attenuation} /></td>
        <td><input className="form-control input_add" name="buffer" type="text" onChange={this.handleRowChange} value={this.state.buffer} /></td>
        <td><input className="form-control input_add" name="flow" type="text" onChange={this.handleRowChange} value={this.state.flow} /></td>
        <td><input className="form-control input_add" name="temp" type="text" onChange={this.handleRowChange} value={this.state.temp} /></td>
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
    temp: PropTypes.string.isRequired,
  }),
  handleAddRow: PropTypes.func.isRequired,
  handleIsAddingNewRow: PropTypes.func.isRequired,
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
    temp: PropTypes.string.isRequired,
  }),
};
