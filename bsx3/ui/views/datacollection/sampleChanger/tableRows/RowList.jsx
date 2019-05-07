import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
                onChange={this.handleRowChange}
                checked={this.props.row.selected}
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

RowList.propTypes = {
  index: {},
  showNotification: PropTypes.bool,
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    samplename: PropTypes.string.isRequired,
    concentration: PropTypes.number.isRequired,
    plate: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    frame: PropTypes.number.isRequired,
    exposuretime: PropTypes.string.isRequired,
    attenuation: PropTypes.number.isRequired,
    buffer: PropTypes.string.isRequired,
    flow: PropTypes.bool.isRequired,
    seutemp: PropTypes.number.isRequired,
    stemp: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    selected: PropTypes.bool,
  }),
  handleDeleteRow: PropTypes.func.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleShowNotification: PropTypes.func.isRequired,
};


RowList.defaultProps = {
  index: {},
  showNotification: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
    stemp: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    selected: PropTypes.bool,
  }),
};
