/* eslint-disable no-alert */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export default class TableAddRow extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.state = Object.entries(this.props.columns).map(([key]) => ({ [key]: '' }));


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
    const { keys, value } = event.target;
    this.setState({ [keys]: value });
    // this.setState({ flow: checked });
  }

  handleAddAndResetForm(event) {
    event.preventDefault();
    const { value } = event.target;
    let row = {};
    // Object.entries(this.props.columns).map(([key]) => (row.push({ [key]: value })));
    alert(Object.entries(this.props.columns).map(([key]) => {
      row = { [key]: value };
      return row[key];
    }));
    // alert(Object.keys(row).map((key) => {
    //   // row = { key: value };
    //   return row[key];
    // }));
    this.props.handleAddRow({
      ...this.props.row,
      // row
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
            } else if (key === 'buffer' && this.props.name === 'Sample') {
              if (this.props.bufferRows.length > 0) {
                td = (
                  <td key={key} style={{ width: column.size }}>
                    <div className="" style={{ margin: '5px' }}>
                      <select value="" ref={this.input} name={key} className="form-control input_edit" onChange={this.handleRowChange}>
                        {this.props.bufferRows.map(row => (
                          <option value={row.id}>
                            {row.bufferName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                );
              } else { td = (<span key={key} style={{ width: column.size, color: 'red' }}>No Buffer </span>); }
            } else if (column.inputType === 'select') {
              td = (
                <td key={key} style={{ width: column.size }}>
                  <div className="" style={{ margin: '5px' }}>
                    <select value="" ref={this.input} name={key} className="form-control input_edit" onChange={this.handleRowChange}>
                      { column.options.map(value => (
                        (<option value={value}>{value}</option>)
                      ))}
                    </select>
                  </div>
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
