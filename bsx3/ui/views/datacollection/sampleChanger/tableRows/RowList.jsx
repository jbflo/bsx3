import React, { Component, Fragment } from 'react';
import Notification from '../../../../components/notification/Notification';
import PropertyButton from '../../../../components/propertyButton/PropertyButton';
import './style.css';

export default class RowList extends Component {
  constructor(props) {
    super(props);
    this.onDuplicate = this.onDuplicate.bind(this);
  }

  onDuplicate(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.showNotification
          ? (
            <Notification
              level="success"
              message="Succesfully delete row"
              visible={this.props.showNotification}
              handleShowNotification={this.props.handleShowNotification}
            />
          )
          : null
        }
        <td>
          <div className="flexclass">
            <div className="flexclass">
              <span
                className="drag-icon"
                title="Drag row to change order"
              >
                <i className="fas fa-grip-vertical" />
              </span>
              <input
                type="checkbox"
                className="check-row"
                onChange={this.props.onSelectChange}
                checked={this.props.checked}
              />
              <span className="index-row">
                {this.props.index}
              </span>
            </div>
          </div>
        </td>
        <td>
          <input className="form-control input_form" readOnly value={this.props.row.samplename} />
        </td>
        <td><input className="form-control input_form" readOnly value={this.props.row.buffer} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.plate} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.row} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.column} /></td>
        <td><input className="input_check" type="checkbox" readOnly checked={this.props.row.flow} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.energy} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.volume} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.seutemp} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.stemp} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.concentration} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.frame} /></td>
        <td><input className="form-control input_form" readOnly value={this.props.row.exposuretime} /></td>
        <td><input className="form-control input_form" readOnly value={`${this.props.row.attenuation} %`} /></td>
        <td>
          <div className="">
            <PropertyButton
              key={this.props.row.id}
              id={this.props.row.id}
              rowindex={this.props.index}
              handleSelectEditRow={this.props.handleSelectEditRow}
              handleDeleteRow={this.props.handleDeleteRow}
              handleShowNotification={this.props.handleShowNotification}
              showNotification={this.props.showNotification}
            />
            {/* <MyMenu /> */}
          </div>
        </td>
      </Fragment>
    );
  }
}
