import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import {
//   MdCancel, MdSave
// } from 'react-icons/md';
// // import './Formadd.css';

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
      <tr>
        <td>
          {/* <i className="fa fa-cog" /> */}
          <Button
            className=" btn-success btnaddrow"
            style={{ fontWeight: 'bold' }}
            onClick={this.handleAddAndResetForm}
            title="Create new row"
          >
            +
          </Button>
        </td>
        {this.props.columns.samplename.display
          ? (
            <td style={{ width: '133px' }}><input className="form-control input_add" name="samplename" onChange={this.handleRowChange} value={this.state.samplename} /></td>
          )
          : null
        }
        {this.props.columns.buffer.display
          ? <td style={{ width: '76px' }}><input className="form-control input_add" name="buffer" onChange={this.handleRowChange} value={this.state.buffer} /></td>
          : null
                }
        {this.props.columns.plate.display
          ? <td style={{ width: '65px' }}><input className="form-control input_add" name="plate" onChange={this.handleRowChange} value={this.state.plate} /></td>
          : null
                }
        {this.props.columns.row.display
          ? <td style={{ width: '58px' }}><input className="form-control input_add" name="row" onChange={this.handleRowChange} value={this.state.row} /></td>
          : null
                }
        {this.props.columns.column.display
          ? <td style={{ width: '83px' }}><input className="form-control input_add" name="column" onChange={this.handleRowChange} value={this.state.column} /></td>
          : null
                }
        {this.props.columns.flow.display
          ? <td style={{ width: '62px' }}><input className="input_check" type="checkBox" name="flow" onChange={this.handleRowChange} checked={this.state.flow} /></td>
          : null
                }
        {this.props.columns.energy.display
          ? <td style={{ width: '79px' }}><input className="form-control input_add" name="energy" onChange={this.handleRowChange} value={this.state.energy} /></td>
          : null
                }
        {this.props.columns.volume.display
          ? <td style={{ width: '112px' }}><input className="form-control input_add" name="volume" onChange={this.handleRowChange} value={this.state.volume} /></td>
          : null
                }
        {this.props.columns.seutemp.display
          ? <td style={{ width: '105px' }}><input className="form-control input_add" name="seutemp" onChange={this.handleRowChange} value={this.state.seutemp} /></td>
          : null
                }
        {this.props.columns.stemp.display
          ? <td style={{ width: '135px' }}><input className="form-control input_add" name="stemp" onChange={this.handleRowChange} value={this.state.stemp} /></td>
          : null
                }
        {this.props.columns.concentration.display
          ? <td style={{ width: '135px' }}><input className="form-control input_add" name="concentration" onChange={this.handleRowChange} value={this.state.concentration} /></td>
          : null
                }
        {this.props.columns.frame.display
          ? <td style={{ width: '110px' }}><input className="form-control input_add" name="frame" onChange={this.handleRowChange} value={this.state.frame} /></td>
          : null
                }
        {this.props.columns.exposuretime.display
          ? <td style={{ width: '134px' }}><input className="form-control input_add" name="exposuretime" onChange={this.handleRowChange} value={this.state.exposuretime} /></td>
          : null
                }
        {this.props.columns.attenuation.display
          ? <td style={{ width: '133px' }}><input className="form-control input_add" name="attenuation" onChange={this.handleRowChange} value={this.state.attenuation} /></td>
          : null
                }
        {this.props.columns.tools.display
          ? (
            <td style={{ width: '30px' }}>
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
          : null
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
