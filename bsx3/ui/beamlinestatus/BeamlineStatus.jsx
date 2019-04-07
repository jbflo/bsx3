import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Navbar, Nav, Badge
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import InOutSwitch from '../components/OnOffSwitch/OnOffSwitch';
import PopInput from '../components/PopInput/PopInput';
import LabeledValue from '../components/LabeledValue/LabeledValue';


import * as beamlineAPI
  from './beamline-api';

import './bscontainers.css';

class BeamlineStatus extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    // const API_URL = '/api/beamline'.bind(this);
  }

  componentDidMount() {
    this.props.getAllAttributes();
  }

  onSaveHandler(name, value) {
    this.props.setAttribute(name, value);
  }


  onCancelHandler(name) {
    this.props.abortCurrentAction(name);
  }


  setAttribute(name, value) {
    this.props.setAttribute(name, value);
  }

  render() {
    let variantStyle = 'success';
    if (this.props.data.state === 'out') {
      variantStyle = 'success';
    } else if (this.props.data.state === 'in') {
      variantStyle = 'danger';
    }

    return [
      <Navbar collapseOnSelect expand="lg" className="bmstatus ">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="collapse" id="responsive-navbar-nav" style={{ marginLeft: '0px' }}>
          {/* <Nav className="nav">
            <Form.Group controlId="formBasicPassword">
              <FormCheck
                type="checkbox"
                name="Shuter"
                pkey="shuter"
                suffix=""
              />
              <Form.Label>
                Shuter :
                {' '}
                { this.props.beamline.attributes.shutter.value}
              </Form.Label>
            </Form.Group>
          </Nav> */}

          <Nav className="nav">
            <Label className="name btn">
            Shutter
              {'  '}
              <Badge variant={variantStyle}>
                {' '}
                { this.props.beamline.attributes.shutter.readonly
                  ? (
                    <Nav.Item className="item">
                      <LabeledValue
                        suffix=""
                        key={1}
                        name=""
                        value={this.props.beamline.attributes.shutter.value}
                      />
                    </Nav.Item>
                  )
                  : (
                    <Nav.Item className="item">
                      <InOutSwitch
                        // onText={this.props.beamline.attributes.shutter.commanad[0]}
                        // offText={this.props.beamline.attributes.shutter.commanad[1]}
                        // labelText={this.props.beamline.attributes.shutter.state}
                        key={1}
                        data={this.props.beamline.attributes.shutter}
                        onSave={this.setAttribute}
                        // optionsOverlay={this.beamstopAlignmentOverlay()}
                      />
                    </Nav.Item>
                  )
               }
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav ">
            <Label className="name btn">
                Energy
              {'  '}
              <Badge variant={variantStyle}>
                {' '}
                { this.props.beamline.attributes.energy.readonly
                  ? (
                    <Nav.Item className="item">
                      <LabeledValue
                        suffix="keV"
                        key={2}
                        name=""
                        value={this.props.beamline.attributes.energy.value}
                      />
                    </Nav.Item>
                  )
                  : (
                    <Nav.Item className="item">
                      <PopInput
                        name="Energy"
                        key="energy"
                        suffix="keV"
                        data={this.props.beamline.attributes.energy}
                        onSave={this.setAttribute}
                        onCancel={this.onCancelHandler}
                      />
                    </Nav.Item>
                  )
               }

              </Badge>
            </Label>
          </Nav>

          <Nav className="nav mr-auto">
            <Label className="name btn">
             Ring Current
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
                    key={3}
                    suffix="mAmps"
                    name=""
                    value={this.props.beamline.attributes.machinfo.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav ">
            <Label className="name btn">
             Sample Name
              {'  '}
              <Badge variant={variantStyle} className="badge">
                <Nav.Item className="item">
                  <LabeledValue
                    key={4}
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.sampleName.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>
          {/* Pullright  */}
          <Nav className="nav">
            <Label className="name btn">
            Run No.
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
                    key={5}
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.attenuation.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav">
            <Label className="name btn">
            Attenuation
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
                    key={6}
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.attenuation.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav">
            <Label className="name btn">
            Time / frame
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
                    key={7}
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.attenuation.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav">
            <Label className="name btn">
             Frames No.
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
                    key="frame"
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.attenuation.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ];
  }
}

function mapStateToProps(state) {
  return {
    state,
    data: { value: 'undefined', state: 'IN', msg: 'UNKNOWN' },
    beamline: state.beamline,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllAttributes: beamlineAPI.sendGetAllAttributes,
    setAttribute: beamlineAPI.sendSetAttribute
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeamlineStatus);
