/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './style.css';

class FolderDirectory extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    if (this.folder) {
      // this.folder.directory = true;
      // this.folder.webkitdirectory = true;
    }
  }

  componentDidUpdate() {
    if (this.folder) {
      // this.folder.directory = true;
      // this.folder.webkitdirectory = true;
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    return (
      <div className="folderU">
        <Button className="btn labelinput" variant="primary" onClick={this.handleShow}>
            Saving  Path
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title custom_align">Path For Data Colection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="">
              <div className="form-group">
                <span className=""> Path: ...</span>
              </div>
              <div className="form-group">
                <span className=""> File Name: ...</span>
              </div>
              <div className="form-group">
                <input className="form-control " type="text" placeholder="Subdirectory" />
              </div>
              <div className="form-group">
                <input className="form-control " type="text" placeholder="Prefix" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-md" variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button className="btn btn-warning btn-md" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    Sc: state.Sc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
FolderDirectory.defaultProps = {
  classes: PropTypes.object.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderDirectory);
