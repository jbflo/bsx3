import React from 'react';
// import PropTypes from 'prop-types';
import {
  OverlayTrigger, Popover
} from 'react-bootstrap';
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
  render() {
    return (
      <OverlayTrigger
        ref={(ref) => { this.OverlayTrigger = ref; }}
        rootClose
        trigger="click"
        placement="bottom"
        overlay={(<Popover style={{ height: '38px' }} id={`${this.props.labelText} popover`}>j</Popover>)}
      >
        <div onContextMenu={this.onLinkRightClick}>
          Column
          <i className="fas fa-columns" />
        </div>
      </OverlayTrigger>
    );
  }
}

ColumnChooser.propTypes = columnChooserPropTypes;

export default ColumnChooser;
