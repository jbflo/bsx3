import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './style.css';

const ConfirmationPropTypes = {
  // visible: PropTypes.bool.isRequired,
  // level: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  // handleShowNotification: PropTypes.func.isRequired,
};
// const styles = {
//   display: {
//     display: 'visible',

//   },
//   none: {
//     display: 'none',

//   }
// };

class Confirmation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: this.props.show,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    return (
      <>
        {/* <Button className="btn labelinput" variant="primary" onClick={this.handleShow}>
          Saving  Path
        </Button> */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title custom_align">Delete this entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              <div className="modal-body">

                <div className="alert alert-danger">
                  <span className="glyphicon glyphicon-warning-sign" />
                  {this.props.message}
                </div>

              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success btn-md" variant="secondary" onClick={this.handleClose}>
            Yes
            </Button>
            <Button className="btn btn-warning btn-md" onClick={this.handleClose}>
            No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

Confirmation.propTypes = ConfirmationPropTypes;

export default Confirmation;
