import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MdCancel, MdSave
} from 'react-icons/md';
// import './FormEdit.css';

export default class EditRowForm extends Component {
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
    this.handleEditAndResetForm = this.handleEditAndResetForm.bind(this);
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

  handleEditAndResetForm(event) {
    event.preventDefault();
    this.props.handleEditRow({
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
    return [
      <td>
        <div className="flexclass">
          <MdCancel
            className="cancel-icon md-icon"
            title="Cancel editing"
            onClick={this.props.handleCancelEditRow}
          />
          <MdSave
            className="save-icon md-icon"
            title="Save edit row"
            onClick={() => this.handleEditAndResetForm}
          />
        </div>
      </td>,
      <td><input className="form-control input_edit" name="samplename" type="text" onChange={this.handleRowChange} value={this.state.samplename} /></td>,
      <td><input className="form-control input_edit" name="concentration" type="text" onChange={this.handleRowChange} value={this.state.concentration} /></td>,
      <td><input className="form-control input_edit" name="plate" type="text" onChange={this.handleRowChange} value={this.state.plate} /></td>,
      <td><input className="form-control input_edit" name="row" type="text" onChange={this.handleRowChange} value={this.state.row} /></td>,
      <td><input className="form-control input_edit" name="column" type="text" onChange={this.handleRowChange} value={this.state.column} /></td>,
      <td><input className="form-control input_edit" name="frame" type="text" onChange={this.handleRowChange} value={this.state.frame} /></td>,
      <td><input className="form-control input_edit" name="exposuretime" type="text" onChange={this.handleRowChange} value={this.state.exposuretime} /></td>,
      <td><input className="form-control input_edit" name="attenuation" type="text" onChange={this.handleRowChange} value={this.state.attenuation} /></td>,
      <td><input className="form-control input_edit" name="buffer" type="text" onChange={this.handleRowChange} value={this.state.buffer} /></td>,
      <td><input className="form-control input_edit" name="flow" type="text" onChange={this.handleRowChange} value={this.state.flow} /></td>,
      <td><input className="form-control input_edit" name="temp" type="text" onChange={this.handleRowChange} value={this.state.temp} /></td>,
    ];
  }
}

EditRowForm.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  handleEditRow: PropTypes.func.isRequired,
  handleCancelEditRow: PropTypes.func.isRequired,
};

EditRowForm.defaultProps = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
