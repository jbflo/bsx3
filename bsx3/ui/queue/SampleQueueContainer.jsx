
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar, Nav
} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

class DataCollection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return [
      <div className="contain" style={{ marginTop: '0px', with: '100%', height: '1000px' }}>
        <Navbar className="Header" style={{ paddingBottom: '80' }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav pullright className="" style={{ fontSize: '13px' }}>
           j
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
)(DataCollection);
