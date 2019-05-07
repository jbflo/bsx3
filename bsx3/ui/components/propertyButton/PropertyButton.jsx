import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

const propertyButonPropTypes = {
  showNotification: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  rowindex: PropTypes.number.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleShowNotification: PropTypes.func.isRequired,
};

class PropertyButton extends React.Component {
  render() {
    return (
      <div className="flexclass">
        <div className="flexclass">
          <Button
            variant="link"
            title="Edit row"
            className="edit-del edit-btn"
            align="right"
            onClick={() => this.props.handleSelectEditRow(this.props.id)}
          >
            <i className="far fa-edit" />
          </Button>
        </div>
        <div className="flexclass">
          <Button
            variant="link"
            title="Delete row"
            className="edit-del del-btn"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete this row? ${this.props.rowindex} ${this.props.showNotification} `)) {
                this.props.handleDeleteRow(this.props.id);
                this.props.handleShowNotification(true);
              }
            }}
          >
            <i className="fas fa-trash" />
          </Button>
        </div>
      </div>
    );
  }
}

PropertyButton.propTypes = propertyButonPropTypes;

export default PropertyButton;
