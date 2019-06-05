import React, { Component } from 'react';
import { MdCancel, MdSave } from 'react-icons/md';
import './style.css';

export default class TableEditRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <>
        <td style={{ width: '70px' }}>
          Editing....
          <div className="flexclass">
            <MdCancel
              onClick={this.props.handleCancelEditRow}
              className="save-cancel cancel-icon"
              title="Cancel row editting"
            />
            <MdSave
              onClick={this.handleEditAndResetForm}
              className="save-cancel save-icon"
              title="Save edited row"
            />
          </div>
        </td>
        {Object.entries(this.props.columns).map(([key, column]) => (
          // eslint-disable-next-line no-nested-ternary
          column.display
            ? (
              key === 'tools'
                ? (
                  <td>
                    <div className="flexclass">
                      <MdCancel
                        onClick={this.props.handleCancelEditRow}
                        className="save-cancel cancel-icon"
                        title="Cancel row editting"
                      />
                      <MdSave
                        onClick={this.handleEditAndResetForm}
                        className="save-cancel save-icon"
                        title="Save edited row"
                      />
                    </div>
                  </td>
                )
                : (
                  <td style={{ width: column.size }}>
                    <div className="" style={{ margin: '5px' }}>
                      <input className="form-control input_edit" type={column.inputType} name={key} onChange={this.handleRowChange} checked={this.props.row[key]} value={this.props.row[key]} />
                    </div>
                  </td>
                )
            )
            : null
        ))}
      </>
    );
  }
}
