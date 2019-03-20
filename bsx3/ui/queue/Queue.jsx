
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar, Nav, Button
} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import './queue.css';

class SampleQueueContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return [
      <div className="queue" style={{ marginTop: '0px', with: '100%', height: '1000px' }}>
        <Navbar className="bar" style={{ paddingBottom: '80' }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="btnitem">
            <Button column sm="2" type="button" className="btnq btn-xs btn-success img-circle" onClick={this.save}>Start Queue</Button>
            <Button column sm="2" type="button" className="btnq btn-xs btn-danger img-circle" onClick={this.cancel}>Stop Queue</Button>
          </Nav>
        </Navbar>
      </div>


    ];
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleQueueContainer);
