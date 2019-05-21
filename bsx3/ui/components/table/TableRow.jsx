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
        id={this.props.id}
        onShown={() => { }}
        onHidden={() => { }}
      >
        <Item>Add to Queue</Item>
        <Separator />
        <Item onClick={() => this.props.handleDuplicateRow(this.props.id)}>
          <span>
            Duplicate
            { ' ' }
            <i className="far fa-copy" />
          </span>
        </Item>
        <Item onClick={() => this.props.handleSelectEditRow(this.props.id)}>
          <span>
            Edit row
            { ' ' }
            <i className="far fa-edit" />
          </span>
        </Item>
        <Item onClick={() => this.props.handleDeleteRow(this.props.id)}>
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
        <MenuProvider id={this.props.id} component="tr">
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
            <div className="flexclass" style={{ width: '' }}>
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
          {Object.entries(this.props.dataTable).map(([key, column]) => (
            // eslint-disable-next-line no-nested-ternary
            column.display
              ? (
                // eslint-disable-next-line no-nested-ternary
                key === 'flow'
                  ? (
                    <td key={key} style={{ width: column.size }}>
                      <input className="input_check" type="checkbox" readOnly checked={column.columnValues[this.props.index]} />
                    </td>
                  )
                  : (
                    key === 'tools'
                      ? (
                        <td key={key} style={{ width: column.size }}>
                          <PropertyButton
                            key={this.props.id}
                            id={this.props.id}
                            {...this.props}
                          />
                        </td>
                      )
                      : (
                        <td style={{ width: column.size }}>
                          <input className="form-control input_form" readOnly value={column.columnValues[this.props.index]} />
                        </td>
                      )
                  )

              )
              : null
          ))}
        </MenuProvider>
      </Fragment>
    );
  }
}
