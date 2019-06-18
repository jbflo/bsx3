
import React from 'react';
import {
  OverlayTrigger, Popover
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import { MdViewColumn } from 'react-icons/md';
import './style.css';

class TableColumnChooser extends React.Component {
  constructor(props) {
    super(props);
    this.togleColumn = this.togleColumn.bind(this);
  }

  togleColumn(columnName) {
    this.props.handleColumnChooser(columnName);
  }

  render() {
    const content = (
      <div className="row">
        <div className="ulheader">Check Column to be display </div>
        <ul className="list-group list-group-flush">
          {Object.entries(this.props.columns).map(([key, column]) => (
            <li className="list-group-item list-group-column" key={key}>
              {column.columnName}
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
            </li>))
          }
        </ul>
      </div>
    );
    return (
      <OverlayTrigger
        ref={(ref) => { this.OverlayTrigger = ref; }}
        rootClose
        trigger="click"
        placement="left"
        overlay={(<Popover className="colpopover" id={`${this.props.name} popover`}>{content}</Popover>)}
      >
        <div className="divch">
          <span className=""> Customize Columns : </span>
          <MdViewColumn className="columnCh" title="Choose Column to display">
            {/* Column */}
            <i className="fa fa-eye" />
          </MdViewColumn>
        </div>
      </OverlayTrigger>
    );
  }
}


export default TableColumnChooser;
