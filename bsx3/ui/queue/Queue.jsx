
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar, Nav, Button
} from 'react-bootstrap';

import './queue.css';

class SampleQueueContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return [
      <div className="queue">
        <Navbar className="bar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="btnitem">
            <Button column sm="2" type="button" className="btnqs btn-xs btn-success " onClick={this.save}>Start Queue</Button>
            <Button column sm="2" type="button" className="btnqd btn-xs btn-danger " onClick={this.cancel}>Stop Queue</Button>
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
