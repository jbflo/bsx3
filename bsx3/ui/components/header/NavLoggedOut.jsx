
import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavLoggedout extends Component {
  render() {
    return (
      <Navbar className="Header" style={{ paddingBottom: '80' }}>
        <Nav.Link href="./" className="brand">BSXcube 3</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end" pullRight style={{ }}>
            <LinkContainer className="link " to="/help" eventKey={3}><Nav.Link className="item all fas fa-info-circle"> Help</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
