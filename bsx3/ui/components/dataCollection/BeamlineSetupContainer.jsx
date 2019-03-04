import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Nav } from 'react-bootstrap';
import FormCheck from 'react-bootstrap/FormCheck';
// import { Label } from 'react-bootstrap/Form';
import PopInput from './PopInput/PopInput';
import LabeledValue from './LabeledValue/LabeledValue';


import {
  sendGetAllAttributes,
  sendSetAttribute,
  sendAbortCurrentAction
}
  from '../../actions/beamline_action';

import './bscontainers.css';

class BeamlineSetupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // key: 'home',
    };
  }

  render() {
    return [

      <Navbar className=" setup">
        <Navbar.Collapse className="justify-content-center">
          <Nav className="nav">
            <FormCheck
              type="checkbox"
              name="Shuter"
              pkey="shuter"
              suffix=""
            />
            {/* <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
                        </Form.Group> */}
          </Nav>

          <Nav className="nav">
            {/* { this.props.beamline.attributes.energy.readonly */}
            {/* ? ( */}
            <Nav.Item className="item">
              <LabeledValue
                // suffix="keV"
                name=""
                // value={this.props.beamline.attributes.energy.value}
              />
            </Nav.Item>
            <Nav.Item className="item">
              <PopInput
                // name=""
                // pkey="energy"
                // suffix="keV"
                // data={this.props.beamline.attributes.energy}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Nav.Item>
            {/* } */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    ];
  }
}

function mapStateToProps(state) {
  return {
    beamline: state.beamline,
    sampleview: state.sampleview,
    sampleChanger: state.sampleChanger
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getAllAttributes: bindActionCreators(sendGetAllAttributes, dispatch),
    // sampleViewActions: bindActionCreators(SampleViewActions, dispatch),
    setAttribute: bindActionCreators(sendSetAttribute, dispatch),
    abortCurrentAction: bindActionCreators(sendAbortCurrentAction, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeamlineSetupContainer);
