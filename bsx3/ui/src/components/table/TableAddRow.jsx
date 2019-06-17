/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import './style.css';

export default class TableAddRow extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    const defaultValue = {};


    Object.entries(this.props.columns).map(
      ([keys, column]) => {
        if (column.inputType === 'select') {
          defaultValue[keys] = column.options[0];
        } else defaultValue[keys] = column.defaultValue;
        return defaultValue;
      }
    );
    this.state = defaultValue;

    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleAddAndResetForm = this.handleAddAndResetForm.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillMount() {
    // this.handlePlateRowColValue(1);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    // this.handlePlateRowColValue(1);
  }

  handleKeyUp(event) {
    // Handle ESC Key interaction
    if (event.code === 'Escape') {
      this.props.handleCancelEditRow(event);
    }
  }

  handlePlateRowColValue(plate) {
    this.props.gridPlate.map((grid) => {
      if (grid.name === plate) {
        const rows = [];
        const cols = [];
        for (let col = 1; col <= grid.col; col += 1) {
          cols.push(col);
          for (let row = 1; row <= grid.row; row += 1) {
            rows.push(`${grid.RowHeader[row]}${col}`);
          }
        }
        return this.props.handleLoadRowsColumns(rows, cols);
      }
      return null;
    });
  }

  handleRowChange(event) {
    const key = event.target.name;
    let val = null;
    if (event.target.value === 'true' || event.target.value === 'false') {
      val = event.target.checked;
    } else val = event.target.value;

    if (event.target.name === 'plate') {
      this.handlePlateRowColValue(event.target.value);
    }

    Object.entries(this.props.columns).map(
      ([keys]) => {
        if (key === keys) {
          return this.setState({ [keys]: val });
        }
        return null;
      }
    );
  }

  handleAddAndResetForm(event) {
    event.preventDefault();
    const row = this.state;
    this.props.handleAddRow(row);
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
                      <select value={this.state[key]} ref={key} name={key} className="form-control input_edit" onChange={this.handleRowChange}>
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
                    <select value={this.state[key]} name={key} ref={key} className="form-control input_edit" onChange={this.handleRowChange}>
                      { column.options.map(value => (
                        (<option value={value}>{value}</option>)
                      ))}
                    </select>
                  </div>
                </td>
              );
            } else if (column.inputType === 'number') {
              td = (
                <td key={key} style={{ width: column.size }}>
                  <div className="" style={{ margin: '5px' }}>
                    <NumericInput
                      name="whatever"
                      className="form-control"
                      value={this.state[key]}
                      min={column.minValue}
                      max={column.maxValue}
                      step={1}
                      precision={0}
                      size={5}
                      maxLength={2}
                      required
                      pattern="[0-9].[0-9][0-9]"
                      title={column.columnName}
                      snap
                      inputmode=""
                    />
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
                      value={this.state[key]}
                      checked={this.state[key]}
                      required
                    />
                    {/* {this.state} */}
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
