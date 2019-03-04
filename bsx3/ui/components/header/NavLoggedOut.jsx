
import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';


export default class NavLoggedout extends Component {
  render() {
    return (
      <Navbar className="Header">
        <Nav.Link href="./" className="brand">BSXcube 3</Nav.Link>
        {/* <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>
    );
  }
}
