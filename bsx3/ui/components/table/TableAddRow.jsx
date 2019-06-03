/* eslint-disable no-alert */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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
    alert();
    const key = event.target.name;
    let val = event.target.value;
    if (event.target.value === 'on') {
      val = event.target.checked;
    }
    Object.entries(this.props.columns).map(() => this.setState({ [key]: val }));
    // this.setState({ [key]: val });
  }

  handleAddAndResetForm(event) {
    event.preventDefault();
    // const { value } = event.target.value;
    alert(event.target.value);
    const row = this.state;
    this.props.handleAddRow(row);
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
            <button
              className=" btn btn-success btnaddrow"
              style={{ fontWeight: 'bold' }}
              onClick={this.handleAddAndResetForm}
              title="Add new row"
              type="submit"
            >
            +
            </button>
          </div>
        </td>
        {Object.entries(this.props.columns).map(([key, column]) => {
          let td = null;
          if (column.display) {
            if (key === 'tools') {
              td = (
                <td key={key} style={{ width: column.size }}>
                  <button
                    className="btn btn-success btnaddrow"
                    style={{ fontWeight: 'bold' }}
                    onClick={this.handleAddAndResetForm}
                    title="Add new row"
                    type="submit"
                  >
                  +
                  </button>
                </td>
              );
            } else if (key === 'buffer' && this.props.name === 'Sample') {
              if (this.props.bufferRows.length > 0) {
                td = (
                  <td key={key} style={{ width: column.size }}>
                    <div className="" style={{ margin: '5px' }}>
                      <select value="" ref={key} name={key} className="form-control input_edit" onChange={this.handleRowChange}>
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
                    <select value={column.options[0]} name={key} ref={key} className="form-control input_edit" onChange={this.handleRowChange}>
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
                      ref={key}
                      name={key}
                      type={column.inputType}
                      onChange={this.handleRowChange}
                      value={column.defaultValue}
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
