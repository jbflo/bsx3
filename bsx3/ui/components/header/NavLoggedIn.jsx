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
    // const proposal = this.props.userInfo.proposalList
    //   ? this.props.userInfo.proposalList.find(this.findProposal) : '';
    // const propInfo = (this.props.loggedIn && this.props.selectedProposal
    //   ? `Proposal: ${proposal.Proposal.code.toUpperCase()}${proposal.Proposal.number}` : '');
    // document.title = `BsxCuBE-3 ${propInfo}`;
    return (
      <Navbar className="Header" style={{ paddingBottom: '80' }}>
        <Nav.Link href="./" className="brand">BSXcube 3</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto" style={{ marginLeft: '18em' }}>
          <LinkContainer className="link " to="/logging" eventKey={1}><Nav.Link className="item1"> System log</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/datacollection" eventKey={2}><Nav.Link className="item1"> Data Collection</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/systemelog" eventKey={2}><Nav.Link className="item1"> System Log</Nav.Link></LinkContainer>
        </Nav>
        <Nav pullRight className="" style={{ }}>
          <LinkContainer className="link " to="/help" eventKey={3}><Nav.Link className="item all fas fa-info-circle"> Help</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/remoteaccess" eventKey={4}><Nav.Link className="item all fas fa-user-alt"> User Info</Nav.Link></LinkContainer>
          <LinkContainer className="link " to="/login" eventKey={5}><Nav.Link className="item all fas fa-sign-out-alt"> Sign out</Nav.Link></LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
