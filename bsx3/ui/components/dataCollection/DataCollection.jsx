
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
import TabPane from 'react-bootstrap/TabPane';
import TabContent from 'react-bootstrap/TabContent';
import BeamlineSetupContainer from './BeamlineSetupContainer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import './dataC.css';

export default class Body extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    // key: 'home',
    };
  }

  render() {
    // const style = {
    //   maxWidth: '1090px',
    // };

    return [

      <Row className="col-md-8 col-sm-12">
        <BeamlineSetupContainer />
      </Row>,

      <Container className="contain" style={{ marginTop: '0px', with: '100%' }}>

        <Row className="row">

          <div className="col-md-8 col-sm-12">
            <div className="horizontal-tabs">
              <Nav className="nav nav-tabs" role="tablist">
                <Nav.Item><Nav.Link data-toggle="tab" href="#home-h" role="tab" aria-controls="home">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link data-toggle="tab" href="#seu-h" role="tab" aria-controls="profile">SEU</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link data-toggle="tab" href="#hplc-h" role="tab" aria-controls="settings">HPLC</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link data-toggle="tab" href="#work_flow-h" role="tab" aria-controls="profile">Work Flow</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link data-toggle="tab" href="#set_up-h" role="tab" aria-controls="settings">Set Up</Nav.Link></Nav.Item>
              </Nav>
              <TabContent className="tab-content">
                <TabPane className="active" id="home-h" role="tabpanel"><TabPane className="sv-tab-panel">Code Home Panel Here </TabPane></TabPane>
                <TabPane id="seu-h" role="tabpanel"><TabPane className="sv-tab-panel">Code SEU Panel Here </TabPane></TabPane>
                <TabPane id="hplc-h" role="tabpanel"><TabPane className="sv-tab-panel">Code HPLC Panel Here </TabPane></TabPane>
                <TabPane id="work_flow-h" role="tabpanel"><TabPane className="sv-tab-panel">Code Work Flow Panel Here </TabPane></TabPane>
                <TabPane id="set_up-h" role="tabpanel"><TabPane className="sv-tab-panel">Code Set Up PanelHere </TabPane></TabPane>
              </TabContent>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="horizontal-tabs">
              <Nav className="nav nav-tabs" role="tablist">
                <Nav.Item><Nav.Link data-toggle="tab" href="#messages-h" role="tab" aria-controls="home">Messages</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link data-toggle="tab" href="#queue-h" role="tab" aria-controls="messages">Queue</Nav.Link></Nav.Item>
              </Nav>
              <TabContent className="tab-content">
                <TabPane className="active" id="messages-h" role="tabpanel"><TabPane className="sv-tab-panel">Home Panel</TabPane></TabPane>
                <TabPane id="queue-h" role="tabpanel"><TabPane className="sv-tab-panel">Queue Panel</TabPane></TabPane>
              </TabContent>
            </div>
          </div>
        </Row>
      </Container>


    ];
  }
}
