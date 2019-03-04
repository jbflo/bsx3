import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
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
      <Navbar className="Header" style={{ paddingBottom: '100' }}>
        <Nav.Link href="./" className="brand">BSXcube 3</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto" style={{ marginLeft: '18em' }}>
          <Nav.Link href="/logging" eventKey={1}><Nav.Item className="item"> System log</Nav.Item></Nav.Link>
          <Nav.Link href="/datacollection" eventKey={1}><Nav.Item className="item"> Data Collection</Nav.Item></Nav.Link>
        </Nav>
        <Nav pullRight className="" style={{ }}>
          <Nav.Link className="link " href="/help" eventKey={2}><Nav.Item className="item fas fa-info-circle"> Help</Nav.Item></Nav.Link>
          <Nav.Link className="link " href="/remoteaccess" eventKey={3}><Nav.Item className="item fas fa-user-alt"> User Info</Nav.Item></Nav.Link>
          <Nav.Link className="link " href="/register" eventKey={4}><Nav.Item className="item fas fa-sign-out-alt"> Sign out</Nav.Item></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
