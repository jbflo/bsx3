import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Menu, Item, contextMenu } from 'react-contexify';
import {
  MdOpenWith
} from 'react-icons/md';
import PropertyButton from './propertyButton/PropertyButton';

// const menuId = 'menu_id';
// const MyMenu = () => (
//   <Menu
//     id={menuId}
//   >
//     <Item>Copy</Item>
//   </Menu>
// );
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

  // handlContextMenu(e) {
  //   e.preventDefault();
  //   contextMenu.show({
  //     id: { menuId },
  //     event: e,
  //     props: {
  //       msg: 'hello'
  //     }
  //   });
  // }

  render() {
    return [
      <td>
        <div className="flexclass">
          <div className="flexclass">
            <MdOpenWith
              className="drag-icon md-icon"
              title="Drag row to change order"
            />
            <input
              type="checkbox"
              className="check-icon"
              checked={this.props.row.selected}
            />
            <span style={{ marginLeft: '0px' }}>
              {this.props.index}
            </span>
          </div>
        </div>
      </td>,
      <td>
        <input className="form-control input_form" readOnly value={this.props.row.samplename} />
      </td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.buffer} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.plate} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.row} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.column} /></td>,
      <td><input className="input_check" type="checkbox" readOnly checked={this.props.row.flow} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.energy} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.volume} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.seutemp} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.stemp} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.concentration} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.frame} /></td>,
      <td><input className="form-control input_form" readOnly value={this.props.row.exposuretime} /></td>,
      <td><input className="form-control input_form" readOnly value={`${this.props.row.attenuation} %`} /></td>,
      <td>
        <div className="">
          <PropertyButton
            key={this.props.row.id}
            id={this.props.row.id}
            rowindex={this.props.index}
            handleSelectEditRow={this.props.handleSelectEditRow}
            handleDeleteRow={this.props.handleDeleteRow}
          />
          {/* <MyMenu /> */}
        </div>
      </td>
    ];
  }
}

RowList.propTypes = {
  index: {},
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
};


RowList.defaultProps = {
  index: {},
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
