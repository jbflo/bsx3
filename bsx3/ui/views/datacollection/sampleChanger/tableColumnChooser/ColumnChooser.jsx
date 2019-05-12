/* eslint-disable arrow-body-style */
import React from 'react';
// import PropTypes from 'prop-types';
import {
  OverlayTrigger, Popover
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import './style.css';

const columnChooserPropTypes = {
  // showNotification: PropTypes.bool.isRequired,
  // id: PropTypes.number.isRequired,
  // rowindex: PropTypes.number.isRequired,
  // handleSelectEditRow: PropTypes.func.isRequired,
  // handleDeleteRow: PropTypes.func.isRequired,
  // handleShowNotification: PropTypes.func.isRequired,
};

class ColumnChooser extends React.Component {
  constructor(props) {
    super(props);
    this.togleColumn = this.togleColumn.bind(this);
  }

  togleColumn(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  render() {
    const content = [
      <div className="row">
        <div className="ulheader">Check Column to be display </div>
        <ul className="list-group list-group-flush">
          {Object.entries(this.props.columns).map(([key, column]) => {
            return (
              <li className="list-group-item" key={key}>
                {column.name}
                <Label className="switch ">
                  <input
                    type="checkbox"
                    className="success"
                    checked={column.display}
                    onChange={() => {

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
          <Label className="btn columnCh" title="Choose Column to display">
            {/* Column */}
            <i className="fas fa-columns" />
          </Label>
        </div>
      </OverlayTrigger>
    );
  }
}

ColumnChooser.propTypes = columnChooserPropTypes;

export default ColumnChooser;
