import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MdOpenWith
} from 'react-icons/md';
import PropertyButton from './PropertyButton';

// import Checkout from '../Checkout/Checkout';

export default class RowList extends Component {
  render() {
    return [
      <td>
        <div className="flexclass">
          <span style={{ marginRight: '20px', marginLeft: '0px' }}>
            {this.props.index}
          </span>
          <PropertyButton
            id={this.props.row.id}
            handleSelectEditRow={this.props.handleSelectEditRow}
            handleDeleteRow={this.props.handleDeleteRow}
          />
        </div>
      </td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.samplename} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.concentration} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.plate} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.row} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.column} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.frame} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.exposuretime} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.attenuation} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.buffer} /></td>,
      <td><input className="form-control input_form" type="text" value={this.props.row.flow} /></td>,
      <td>
        <div className="flexclass">
          <input className="form-control input_form" type="text" value={this.props.row.temp} />
          <MdOpenWith
            className="drag-icon md-icon"
            title="Drag row to change order"
          />
        </div>
      </td>
    ];
  }
}

RowList.propTypes = {
  index: {},
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
    temp: PropTypes.string.isRequired,
  }),
  handleDeleteRow: PropTypes.func.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  // handleItemCompletion: PropTypes.func.isRequired,
};


RowList.defaultProps = {
  index: {},
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
    temp: PropTypes.string.isRequired,
  }),
};
