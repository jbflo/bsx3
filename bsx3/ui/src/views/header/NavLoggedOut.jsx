
import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

import './header.css';

export default class NavLoggedout extends Component {
  render() {
    return (
      <Navbar className="header">
        <h3 className="brand">BSXcube 3</h3>
        <Navbar.Collapse className="justify-content-end">
          <LinkContainer className="link " to="/help" eventKey={3}>
            <Nav.Link className="">
              <span className="icon"><FaInfoCircle /></span>
              Help
            </Nav.Link>
          </LinkContainer>
          <LinkContainer className="link " to="/help" eventKey={4}>
            <Nav.Link>
              <span className="icon"><FaInfoCircle /></span>
              Help
            </Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
