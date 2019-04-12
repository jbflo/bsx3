import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar, Nav
} from 'react-bootstrap';

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
      <Navbar className="Header justify-content-between">
        <Navbar.Brand href="./" className="brand">BSXcube 3</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="justify-content-center" style={{ }}>
          <LinkContainer className="link " to="/logging" eventKey={1}><Nav.Link className="item1"> System log</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/datacollection" eventKey={2}><Nav.Link className="item1"> Data Collection</Nav.Link></LinkContainer>
        </Nav>
        <Nav className="justify-content-end" style={{ fontSize: '13px' }}>
          <LinkContainer className="link " to="/help" eventKey={4}><Nav.Link className="item all fas fa-info-circle"> Help</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/remoteaccess" eventKey={5}><Nav.Link className="item all fas fa-user-alt"> User Info</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/login" eventKey={6}><Nav.Link className="item all fas fa-sign-out-alt"> Sign out</Nav.Link></LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
