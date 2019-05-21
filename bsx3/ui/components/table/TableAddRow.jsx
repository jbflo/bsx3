import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

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
      <tr className="add-row-tr">
        <td style={{ width: '70px' }}>
          <div style={{ width: '' }}>
            <Button
              className=" btn-success btnaddrow"
              style={{ fontWeight: 'bold' }}
              onClick={this.handleAddAndResetForm}
              title="Create new row"
            >
            +
            </Button>
          </div>
        </td>
        {Object.entries(this.props.dataTable).map(([key, column]) => (
          // eslint-disable-next-line no-nested-ternary
          column.display
            ? (
              // eslint-disable-next-line no-nested-ternary
              key === 'flow'
                ? (
                  <td key={key} style={{ width: column.size }}>
                    <input className="input_check" type="checkbox" onChange={this.handleRowChange} checked={column.columnValues[this.props.index]} />
                  </td>
                )
                : (
                  key === 'tools'
                    ? (
                      <td key={key} style={{ width: column.size }}>
                        <Button
                          className=" btn-success btnaddrow"
                          style={{ fontWeight: 'bold' }}
                          onClick={this.handleAddAndResetForm}
                          title="Create new row"
                        >
                        +
                        </Button>
                      </td>
                    )
                    : (
                      <td style={{ width: column.size }}>
                        <input className="form-control input_add" onChange={this.handleRowChange} value={column.columnValues[this.props.index]} />
                      </td>
                    )
                )

            )
            : null
        ))}
        {Object.entries(this.props.dataTable).map(([key, column]) => (
          column.display
            ? () => {
              switch (key) {
                case 'flow':
                  return (
                    <td key={key} style={{ Maxwidth: column.size }}>
                      <input className="input_check" type="checkbox" name={key} onChange={this.handleRowChange} checked={this.props.row.flow} />
                    </td>
                  );
                case 'tools':
                  return (
                    <td>
                      <Button
                        className=" btn-success btnaddrow"
                        style={{ fontWeight: 'bold' }}
                        onClick={this.handleAddAndResetForm}
                        title="Create new row"
                      >
                        +
                      </Button>
                    </td>
                  );
                default:
                  return (
                    <td key={key} style={{ width: column.size }}>
                      <input className="form-control input_add" name={key} onChange={this.handleRowChange} value={column.values[this.props.index]} />
                    </td>
                  );
              }
            }

            : null
        ))
      }
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
