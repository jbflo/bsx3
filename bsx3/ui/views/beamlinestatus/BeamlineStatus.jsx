import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Navbar, Nav, Badge
} from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import SimpleInOut from '../../components/SimpleInOut/SimpleInOut';
import PopInput from '../../components/PopInput/PopInput';
import LabeledValue from '../../components/LabeledValue/LabeledValue';
import * as beamlineAPI
  from './beamline-api';

import './style.css';

// const API_URL = '/api/beamline';

class BeamlineStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // testbeam: [],
    };
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    // const API_URL = '/api/beamline'.bind(this);
  }

  componentDidMount() {
    this.props.getAllBLValues();
  }

  onSaveHandler(name) {
    this.props.toggleShutter(name);
  }

  onCancelHandler(name) {
    this.props.abortCurrentAction(name);
  }


  setAttribute(name, value) {
    this.props.setAttribute(name, value);
  }

  render() {
    const variantStyle = 'success';
    return [
      <Navbar collapseOnSelect expand="lg" className="bmstatus ">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="collapse" id="responsive-navbar-nav" style={{ marginLeft: '0px' }}>
          <Nav className="nav">
            <Label className="name btn">
              {this.props.beamline.shutters.fast_shutter.name}
              {'  '}
              <Badge
                className={this.props.beamline.shutters.fast_shutter.state === 'OPEN' ? 'btn-success' : 'bgdanger'}
              >
                <Nav.Item className="item">
                  <SimpleInOut
                    onText="OPEN"
                    offText="CLOSED"
                    key={this.props.beamline.shutters.fast_shutter.name}
                    data={this.props.beamline.shutters.fast_shutter}
                    onSave={() => {
                      this.onSaveHandler(this.props.beamline.shutters.fast_shutter.name);
                    }}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          {/* <Nav className="nav">
            <Label className="name btn">
              {this.props.beamline.shutters.safty_shutter.name}
              {'  '}
              <Badge
                className={this.props.beamline.shutters.safty_shutter.state
                  === 'OPEN' ? 'btn-success' : 'bgdanger'}
              >
                <Nav.Item className="item">
                  <SimpleInOut
                    onText="OPEN"
                    offText="CLOSED"
                    key={this.props.beamline.shutters.safty_shutter.name}
                    data={this.props.beamline.shutters.safty_shutter}
                    onSave={() => {
                      this.onSaveHandler(this.props.beamline.shutters.safty_shutter.name);
                    }}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav> */}
          <Nav className="nav ">
            <Label className="name btn">
                Energy
              <Badge variant={variantStyle} className="badge">
                <Nav.Item className="item">
                  {/* { this.props.beamline.energy.energy } */}
                  <PopInput
                    name="Energy"
                    key="energy"
                    suffix="keV"
                    value={this.props.beamline.energy.energy}
                    data={this.props.beamline.energy.energy}
                    onSave={() => this.setBLValue}
                    onCancel={this.onCancelHandler}
                  />
                </Nav.Item>
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
                    suffix=""
                    name=""
                    value={this.props.beamline.machine_info.current}
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
                    value={this.props.beamline.sampleName.value}
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
                    value={this.props.beamline.attenuation.value}
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
                    value={this.props.beamline.attenuation.value}
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
                    value={this.props.beamline.attenuation.value}
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
                    value={this.props.beamline.attenuation.value}
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
    beamline: state.beamline,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllBLValues: beamlineAPI.getBeamline,
    toggleShutter: beamlineAPI.toggleShutter,
    setBLValue: beamlineAPI.setBeamline,
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeamlineStatus);
