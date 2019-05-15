/* eslint-disable arrow-body-style */
import React from 'react';
// import PropTypes from 'prop-types';
import {
  OverlayTrigger, Popover, Button
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import './style.css';

class ColumnChooser extends React.Component {
  constructor(props) {
    super(props);
    this.togleColumn = this.togleColumn.bind(this);
  }

  togleColumn(columnName) {
    this.props.handleColumnChooser(columnName);
  }

  render() {
    const content = [
      <div className="row">
        <div className="ulheader">Check Column to be display </div>
        <ul className="list-group list-group-flush">
          {Object.entries(this.props.columns).map(([key, column]) => {
            return (
              <li className="list-group-item list-group-column" key={key}>
                {column.name}
                <Label className="switch ">
                  <input
                    type="checkbox"
                    className="success"
                    checked={column.display}
                    onChange={() => {
                      this.togleColumn(key);
                    }}
                  />
                  <span className="slider round" />
                </Label>
              </li>);
          })
          }
        </ul>
      </div>
    ];
    return (
      <OverlayTrigger
        ref={(ref) => { this.OverlayTrigger = ref; }}
        rootClose
        trigger="click"
        placement="bottom"
        overlay={(<Popover className="colpopover" id={`${this.props.labelText} popover`}>{content}</Popover>)}
      >
        <div onContextMenu={this.onLinkRightClick}>
          <Button variant="link" className="columnCh" title="Choose Column to display">
            {/* Column */}
            <i className="fa fa-eye" />
          </Button>
        </div>
      </OverlayTrigger>
    );
  }
}

export default ColumnChooser;
