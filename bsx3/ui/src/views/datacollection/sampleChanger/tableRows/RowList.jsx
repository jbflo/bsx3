/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import {
  Menu, Item, Separator, MenuProvider
} from 'react-contexify';
import Notification from '../../../../components/notification/Notification';
import PropertyButton from '../../../../components/propertyButton/PropertyButton';
import 'react-contexify/dist/ReactContexify.min.css';

import './style.css';

export default class RowList extends Component {
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
          <td style={{ width: '90px' }}>
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
          {this.props.columns.samplename.display
            ? (
              <td>
                <input className="form-control input_form" readOnly value={this.props.row.samplename} />
              </td>
            )
            : null
          }
          {this.props.columns.buffer.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.buffer} /></td>
            : null
                  }
          {this.props.columns.plate.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.plate} /></td>
            : null
                  }
          {this.props.columns.row.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.row} /></td>
            : null
                  }
          {this.props.columns.column.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.column} /></td>
            : null
                  }
          {this.props.columns.flow.display
            ? <td><input className="input_check" type="checkbox" readOnly checked={this.props.row.flow} /></td>
            : null
                  }
          {this.props.columns.energy.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.energy} /></td>
            : null
                  }
          {this.props.columns.volume.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.volume} /></td>
            : null
                  }
          {this.props.columns.seutemp.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.seutemp} /></td>
            : null
                  }
          {this.props.columns.stemp.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.stemp} /></td>
            : null
                  }
          {this.props.columns.concentration.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.concentration} /></td>
            : null
                  }
          {this.props.columns.frame.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.frame} /></td>
            : null
                  }
          {this.props.columns.exposuretime.display
            ? <td><input className="form-control input_form" readOnly value={this.props.row.exposuretime} /></td>
            : null
                  }
          {this.props.columns.attenuation.display
            ? <td><input className="form-control input_form" readOnly value={`${this.props.row.attenuation} %`} /></td>
            : null
                  }
          {this.props.columns.tools.display
            ? (
              <td>
                <PropertyButton
                  key={this.props.row.id}
                  id={this.props.row.id}
                  {...this.props}
                />
              </td>
            )
            : null
                  }
        </MenuProvider>
      </Fragment>
    );
  }
}
