import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

// const rowSchema = {
//   type: 'object',
//   required: ['samplename', 'concentration', 'plate', 'row', 'column', 'frame',
// 'exposuretime', 'attenuation', 'buffer', 'flow', 'temp'],
//   properties: {
//     samplename: { type: 'string' },
//     concentration: { type: 'string' },
//     plate: { type: 'string' },
//     row: { type: 'string' },
//     column: { type: 'string' },
//     frame: { type: 'string' },
//     exposuretime: { type: 'string' },
//     attenuation: { type: 'string' },
//     buffer: { type: 'string' },
//     flow: { type: 'string' },
//     temp: { type: 'string' },
//   }
// };
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
      volume: props.row.volume,
      seutemp: props.row.seutemp,
      stemp: props.row.stemp,
      energy: props.row.energy,
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
    const { name, value, checked } = event.target;
    this.setState({ [name]: value });
    this.setState({ flow: checked });
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
    return [
      <td> Editing....</td>,
      <td><input className="form-control input_edit" name="samplename" required onChange={this.handleRowChange} value={this.state.samplename} /></td>,
      <td><input className="form-control input_edit" name="buffer" onChange={this.handleRowChange} value={this.state.buffer} /></td>,
      <td><input className="form-control input_edit" name="plate" onChange={this.handleRowChange} value={this.state.plate} /></td>,
      <td><input className="form-control input_edit" name="row" onChange={this.handleRowChange} value={this.state.row} /></td>,
      <td><input className="form-control input_edit" name="column" onChange={this.handleRowChange} value={this.state.column} /></td>,
      <td><input className="input_check" type="checkBox" name="flow" onChange={this.handleRowChange} checked={this.state.flow} /></td>,
      <td><input className="form-control input_edit" name="energy" onChange={this.handleRowChange} value={this.state.energy} /></td>,
      <td><input className="form-control input_edit" name="volume" onChange={this.handleRowChange} value={this.state.volume} /></td>,
      <td><input className="form-control input_edit" name="seutemp" onChange={this.handleRowChange} value={this.state.seutemp} /></td>,
      <td><input className="form-control input_edit" name="stemp" onChange={this.handleRowChange} value={this.state.stemp} /></td>,
      <td><input className="form-control input_edit" name="concentration" onChange={this.handleRowChange} value={this.state.concentration} /></td>,
      <td><input className="form-control input_edit" name="frame" onChange={this.handleRowChange} value={this.state.frame} /></td>,
      <td><input className="form-control input_edit" name="exposuretime" onChange={this.handleRowChange} value={this.state.exposuretime} /></td>,
      <td><input className="form-control input_edit" name="attenuation" onChange={this.handleRowChange} value={this.state.attenuation} /></td>,
      <td>
        <Button
          variant="link"
          title="Cancel row editting"
          className="save-cancel cancel-btn"
          align="right"
          onClick={this.props.handleCancelEditRow}
        >
          <i className="fas fa-window-close" />
        </Button>
        <Button
          variant="link"
          title="Save edited row"
          className="save-cancel save-btn"
          align="right"
          onClick={this.handleEditAndResetForm}
        >
          <i className="far fa-save" />
        </Button>
      </td>
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
    flow: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    seutemp: PropTypes.number.isRequired,
    stemp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
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
    flow: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    seutemp: PropTypes.number.isRequired,
    stemp: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
  }),
};
