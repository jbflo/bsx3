import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';
// import Confirmation from '../confirmation/Confirmation';


class PropertyButton extends React.Component {
  render() {
    // let notif = false;
    return (
      <div className="flexprop">
        {/* {notif
          ? (
            <Confirmation
              show
              message=" Are you sure you want to delete this Record?"
            />
          )
          : null
      } */}
        <Button
          variant="link"
          title="Edit row"
          className="edit-del edit-btn"
          align="right"
          onClick={() => this.props.handleSelectEditRow(this.props.row.id)}
        >
          <i className="far fa-edit" />
        </Button>
        <Button
          variant="link"
          title="Delete row"
          className="edit-del del-btn"
          onClick={() => {
            // notif = true;
            if (window.confirm(`Are you sure you want to delete this row? ${this.props.row.id} ${this.props.showNotification} `)) {
              this.props.handleDeleteRow(this.props.row);
              this.props.handleShowNotification(true);
            }
          }}
        >
          <i className="fas fa-trash" />
        </Button>
      </div>
    );
  }
}

export default PropertyButton;
