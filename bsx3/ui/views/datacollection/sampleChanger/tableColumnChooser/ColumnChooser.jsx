/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  OverlayTrigger, Popover
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import { MdViewColumn } from 'react-icons/md';
import * as SampleChangerAction from '../../../../app/actions/scSample';
import './style.css';

class ColumnChooser extends React.Component {
  constructor(props) {
    super(props);
    this.togleColumn = this.togleColumn.bind(this);
    this.toggleGroupColumn = this.toggleGroupColumn.bind(this);
  }

  togleColumn(columnName) {
    this.props.handleColumnChooser(columnName);
  }

  toggleGroupColumn() {
    this.props.handleGroupColumnChooser();
  }

  render() {
    const content = (
      <div className="row">
        <div className="ulheader">Check Column to be display </div>
        <ul className="list-group list-group-flush">
          {Object.entries(this.props.columns).map(([key, column]) => {
            return (
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
              </li>);
          })
          }
        </ul>
      </div>
    );
    return (
      <OverlayTrigger
        ref={(ref) => { this.OverlayTrigger = ref; }}
        rootClose
        trigger="click"
        placement="bottom"
        overlay={(<Popover className="colpopover" id={`${this.props.labelText} popover`}>{content}</Popover>)}
      >
        <div className="divch" onContextMenu={this.onLinkRightClick}>
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
function mapStateToProps(state) {
  return {
    columns: state.sample.columns,
    groupColumnVisibility: state.sample.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleColumnChooser: SampleChangerAction.toggleColumnChooserAction,
    handleGroupColumnChooser: SampleChangerAction.toggleGroupColumnChooserAction,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnChooser);
