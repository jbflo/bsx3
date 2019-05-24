/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export default class TableAddRow extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
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
    const { name, value, checked } = event.target;
    let row = {};
    row = { [name]: value };
    row = { name: checked };

    alert(Object.keys(row).map((key) => {
      row[key] = value;
      return row[key];
    }));
    this.props.handleAddRow({
      ...this.props.row,
      row
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
              title="Add new row"
            >
            +
            </Button>
          </div>
        </td>
        {Object.entries(this.props.columns).map(([key, column]) => {
          let td = null;
          if (column.display) {
            if (key === 'tools') {
              td = (
                <td key={key} style={{ width: column.size }}>
                  <Button
                    className=" btn-success btnaddrow"
                    style={{ fontWeight: 'bold' }}
                    onClick={this.handleAddAndResetForm}
                    title="Add new row"
                  >
                  +
                  </Button>
                </td>
              );
            } else {
              td = (
                <td key={key} style={{ width: column.size }}>
                  <div className="" style={{ margin: '5px' }}>
                    <input
                      className="form-control input_edit"
                      ref={this.input}
                      name={key}
                      type={column.inputType}
                      onChange={this.handleRowChange}
                    />
                  </div>
                </td>
              );
            }
          }

          return td;
        })}
      </tr>
    );
  }
}


TableAddRow.propTypes = {
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
  // handleAddRow: PropTypes.func.isRequired,
  // handleIsAddingNewRow: PropTypes.func.isRequired,
};

TableAddRow.defaultProps = {
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
