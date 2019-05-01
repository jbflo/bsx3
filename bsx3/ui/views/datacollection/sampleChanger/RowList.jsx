import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Menu, Item, contextMenu } from 'react-contexify';
// import {
//   MdOpenWith
// } from 'react-icons/md';
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
          <span style={{ marginRight: '20px', marginLeft: '0px' }}>
            {this.props.index}
          </span>
          <PropertyButton
            key={this.props.row.id}
            id={this.props.row.id}
            handleSelectEditRow={this.props.handleSelectEditRow}
            handleDeleteRow={this.props.handleDeleteRow}
          />
          {/* <MyMenu /> */}
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
      <td><input className="form-control input_form" type="text" value={this.props.row.temp} /></td>,
      // <td>
      //   <div className="flexclass">
      //     <MdOpenWith
      //       className="drag-icon md-icon"
      //       title="Drag row to change order"
      //     />
      //   </div>
      // </td>
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
