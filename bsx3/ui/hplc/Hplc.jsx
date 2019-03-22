
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Nav
} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import './hplc.css';

class SampleQueueContainer extends Component {
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
              <strong>Column Name : </strong>
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
)(SampleQueueContainer);
