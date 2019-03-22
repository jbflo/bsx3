
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Nav, Button
} from 'react-bootstrap';
import Seutable from './Seutable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import './seu.css';

class Seu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return [
      <div className="seut" style={{ marginTop: '0px', with: '100%', height: '1000px' }}>

        <Nav className="seuinfo well justify-content-start">
          <Nav.Item className="">
            <h4>
              <strong>Run No. :  </strong>
              <span className="label label-info">____________________</span>
            </h4>
            <h4>
              <strong>Buffer Name : </strong>
              <span className="label label-info">____________________</span>
            </h4>
            <h4>
              <strong>Buffer Ingredients : </strong>
              <span className="label label-info">____________________</span>
            </h4>
            <h4>
              <strong>Comments : </strong>
              <span className="label label-info">____________________</span>
            </h4>
          </Nav.Item>
        </Nav>


        <hr style={{ marginTop: '40px', with: '100%' }} />

        <Nav className="tableitem justify-content-center">
          <Nav.Item className="justify-content-start">
            <h4 className="page-title ">Queue Name</h4>
            <Nav className="justify-content-end navbtnseu">
              <Button column sm="2" type="button" className="btns btn-xs btn-info" onClick={this.save}>Save as</Button>
              <Button column sm="2" type="button" className="btns btn-xs btn-info" onClick={this.cancel}>Import</Button>
            </Nav>
            <Seutable className="justify-content-start tableseu" />
          </Nav.Item>
        </Nav>
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
)(Seu);
