import React from 'react';
import PropTypes from 'prop-types';
import {
  MdEdit, MdDeleteSweep,
} from 'react-icons/md';
import './style.css';

const propertyButonPropTypes = {
  id: PropTypes.number.isRequired,
  rowindex: PropTypes.number.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

class PropertyButton extends React.Component {
  render() {
    return (
      <div className="flexclass">
        <div className="flexclass">
          <MdEdit
            className="edit-icon md-icon"
            onClick={() => this.props.handleSelectEditRow(this.props.id)}
          />
        </div>
        <div className="flexclass">
          <MdDeleteSweep
            className="md-icon del-icon"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete this row? ${this.props.rowindex} `)) {
                this.props.handleDeleteRow(this.props.id);
              }
            }}
            title="Delete row"
          />
        </div>
      </div>
    );
  }
}

PropertyButton.propTypes = propertyButonPropTypes;

export default PropertyButton;
