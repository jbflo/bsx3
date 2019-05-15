import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { FaInfoCircle, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

import './header.css';


export default class NavLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.findProposal = this.findProposal.bind(this);
  }

  findProposal(prop) {
    return `${prop.Proposal.code}${prop.Proposal.number}` === this.props.selectedProposal;
  }


  render() {
    return (
      <div>
        <Navbar className="header justify-content-between">
          <h3>
            BSXCuBE 3
          </h3>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="justify-content-end" style={{ fontSize: '15px' }}>
            <LinkContainer className="link " to="/help" eventKey={4}>
              <Nav.Link>
                <span className="icon"><FaInfoCircle /></span>
                Help
              </Nav.Link>
            </LinkContainer>
            <LinkContainer className="link " to="/remoteaccess" eventKey={5}>
              <Nav.Link>
                <span className="icon"><FaUserAlt /></span>
                User
              </Nav.Link>
            </LinkContainer>
            <LinkContainer className="link " to="/login" eventKey={6}>
              <Nav.Link>
                <span className="icon"><FaSignOutAlt /></span>
                Signout
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
