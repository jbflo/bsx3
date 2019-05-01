import React from 'react';
import PropTypes from 'prop-types';
import {
  MdEdit, MdDeleteSweep,
} from 'react-icons/md';
import './style.css';

const propertyButonPropTypes = {
  id: PropTypes.number.isRequired,
  check: PropTypes.bool.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};
function PropertyButton(props) {
  return (
    <div className="flexclass">
      <div className="flexclass">
        <MdEdit
          className="edit-icon md-icon"
          onClick={() => props.handleSelectEditRow(props.id)}
        />
      </div>
      <div className="flexclass">
        <MdDeleteSweep
          className="md-icon del-icon"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete this row? ${props.id} `)) {
              props.handleDeleteRow(props.id);
            }
          }}
          title="Delete row"
        />
      </div>
      <div className="flexclass">
        <input
          ref={props.check}
          type="checkbox"
          className="check-icon"
        />
      </div>
    </div>
  );
}

PropertyButton.propTypes = propertyButonPropTypes;

export default PropertyButton;
