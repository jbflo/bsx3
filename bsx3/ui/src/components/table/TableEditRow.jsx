/* eslint-disable prefer-destructuring */
import React, { Component, Fragment } from 'react';
import { MdCancel, MdSave } from 'react-icons/md';
import './style.css';

export default class TableEditRow extends Component {
  constructor(props) {
    super(props);

    const defaultValue = {};

    Object.entries(this.props.columns).map(
      ([keys, column]) => {
        if (column.inputType === 'select') {
          defaultValue[keys] = column.options[0];
        } else defaultValue[keys] = this.props.row[keys];
        return defaultValue;
      }
    );
    this.state = defaultValue;

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
    const key = event.target.name;
    let val = null;
    if (event.target.value === 'true' || event.target.value === 'false') {
      val = event.target.checked;
    } else val = event.target.value;

    Object.entries(this.props.columns).map(
      ([keys]) => {
        if (key === keys) {
          return this.setState({ [keys]: val });
        }
        return null;
      }
    );
  }

  handleEditAndResetForm(event) {
    event.preventDefault();
    const row = this.state;
    this.props.handleEditRow(row, this.props.index);
  }

  render() {
    return (
      <Fragment>
        <td style={{ width: '70px' }}>
          Editing....
          <div className="flexclass" style={{ width: '', marginLeft: '5px' }}>
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
        {Object.entries(this.props.columns).map(([key, column]) => {
          // eslint-disable-next-line no-nested-ternary
          let td = null;
          if (column.display) {
            if (key === 'tools') {
              td = (
                <td key={key} style={{ width: column.size }}>
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
                    <select vvalue={this.state[key]} name={key} ref={key} className="form-control input_edit" onChange={this.handleRowChange}>
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
                      min={column.minValue}
                      max={column.maxValue}
                      value={this.state[key]}
                      checked={this.state[key]}
                      required
                    />
                  </div>
                </td>
              );
            }
          }

          return td;
        })}
      </Fragment>
    );
  }
}
