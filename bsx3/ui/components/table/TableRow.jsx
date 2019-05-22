/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import {
  Menu, Item, Separator, MenuProvider
} from 'react-contexify';
import Notification from '../notification/Notification';
import PropertyButton from '../propertyButton/PropertyButton';
import 'react-contexify/dist/ReactContexify.min.css';

import './style.css';

export default class TableRow extends Component {
  render() {
    const MyMenu = () => (
      <Menu
        id={this.props.row.id}
        onShown={() => { }}
        onHidden={() => { }}
      >
        <Item>Add to Queue</Item>
        <Separator />
        <Item onClick={() => this.props.handleDuplicateRow(this.props.row.id)}>
          <span>
            Duplicate
            { ' ' }
            <i className="far fa-copy" />
          </span>
        </Item>
        <Item onClick={() => this.props.handleSelectEditRow(this.props.row.id)}>
          <span>
            Edit row
            { ' ' }
            <i className="far fa-edit" />
          </span>
        </Item>
        <Item onClick={() => this.props.handleDeleteRow(this.props.row.id)}>
          <span>
            Delete row
            { ' ' }
            <i className="fas fa-trash-alt" />
          </span>
        </Item>
        <Item>
          <span>
            Order Top
            { ' ' }
            <i className="far fa-arrow-alt-circle-up" />
          </span>
        </Item>
      </Menu>
    );

    return (
      <Fragment>
        <MenuProvider id={this.props.row.id} component="tr">
          <MyMenu />
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
          <td style={{ width: '70px' }}>
            <div className="flexclass" style={{ width: '', marginLeft: '5px' }}>
              <span
                className="drag-icon"
                title="Drag row to change order"
              >
                <i className="fas fa-grip-vertical" />
              </span>
              <input
                type="checkbox"
                className="input_check"
                onChange={this.props.onSelectChange}
                checked={this.props.checked}
              />
              <span className="index-row">
                {this.props.index}
              </span>
            </div>
          </td>
          {Object.entries(this.props.columns).map(([key, column]) => {
            let res = null;

            if (column.display) {
              if (key === 'tools') {
                res = (
                  <td key={key} style={{ width: column.size }}>
                    <PropertyButton
                      {...this.props}
                    />
                  </td>
                );
              } else {
                res = (
                  <td key={key} style={{ width: column.size }}>
                    <input className="form-control input_form" type={column.inputType} readOnly checked={this.props.row[key]} value={this.props.row[key]} />
                  </td>
                );
              }
            }

            return res;
          })}
        </MenuProvider>
      </Fragment>
    );
  }
}
