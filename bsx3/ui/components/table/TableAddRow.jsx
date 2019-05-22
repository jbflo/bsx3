import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export default class AddRowForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // row: this.props.row
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
    // this.setState({ flow: checked });
  }

  handleAddAndResetForm(event) {
    event.preventDefault();
    this.props.handleAddRow({
      ...this.props.row,
      // samplename: this.state.samplename,
      // concentration: this.state.concentration,
      // plate: this.state.plate,
      // row: this.state.row,
      // column: this.state.column,
      // frame: this.state.frame,
      // exposuretime: this.state.exposuretime,
      // attenuation: this.state.attenuation,
      // buffer: this.state.buffer,
      // flow: this.state.flow,
      // volume: this.state.volume,
      // seutemp: this.state.seutemp,
      // stemp: this.state.stemp,
      // energy: this.state.energy,
    });
    // Reset value
    return this.setState({
      // samplename: '',
      // buffer: '',
      // plate: '',
      // row: '',
      // column: '',
      // flow: false,
      // recap: false,
      // energy: '',
      // volume: '',
      // seutemp: '',
      // stemp: '',
      // concentration: '',
      // viscovity: '',
      // frame: 7,
      // exposuretime: '',
      // transmission: '',
      // attenuation: '',
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
        {Object.entries(this.props.columns).map(([key, column]) => {
          let res = null;
          if (column.display) {
            if (key === 'tools') {
              res = (
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
              );
            } else {
              res = (
                <td key={key} style={{ width: column.size }}>
                  <div className="" style={{ margin: '5px' }}>
                    <input className="form-control input_edit" name={key} type={column.inputType} onChange={this.handleRowChange} />
                  </div>
                </td>
              );
            }
          }

          return res;
        })}
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
