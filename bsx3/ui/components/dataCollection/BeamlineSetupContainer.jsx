import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Navbar, Nav, Form, Badge
} from 'react-bootstrap';
import FormCheck from 'react-bootstrap/FormCheck';
import { Label } from 'react-bootstrap/Form';
import PopInput from './PopInput/PopInput';
import LabeledValue from './LabeledValue/LabeledValue';


import {
  sendGetAllAttributes,
  sendSetAttribute,
  sendAbortCurrentAction
}
  from '../../actions/beamline';

import './bscontainers.css';

class BeamlineSetupContainer extends React.Component {
  constructor(props) {
    super(props);

    // this.onSaveHandler = this.onSaveHandler.bind(this);
    // this.setAttribute = this.setAttribute.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
  }

  // componentDidMount() {
  //   this.props.getAllAttributes();
  // }

  // onSaveHandler(name, value) {
  //   this.props.setAttribute(name, value);
  // }


  onCancelHandler(name) {
    this.props.abortCurrentAction(name);
  }


  // setAttribute(name, value) {
  //   this.props.setAttribute(name, value);
  // }

  render() {
    let variantStyle = 'warning';
    if (this.props.data.state === 'out') {
      variantStyle = 'success';
    } else if (this.props.data.state === 'in') {
      variantStyle = 'danger';
    }

    return [
      <Navbar className="setup rounded-top">
        <Navbar.Collapse className="justify-content-start" style={{ marginLeft: '320px' }}>
          <Nav className="nav">
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
          </Nav>

          <Nav className="nav">
            <Label className="name btn">
                Energy :
              {'  '}
              <Badge variant={variantStyle}>
                {' '}
                { this.props.beamline.attributes.energy.readonly
                  ? (
                    <Nav.Item className="item">
                      <LabeledValue
                        suffix="keV"
                        name=""
                        value={this.props.beamline.attributes.energy.value}
                      />
                    </Nav.Item>
                  )
                  : (
                    <Nav.Item className="item">
                      <PopInput
                        name="Energy"
                        pkey="energy"
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

          <Nav className="nav">
            <Label className="name btn">
                Energy :
              {'  '}
              <Badge variant={variantStyle}>
                {' '}
                { this.props.beamline.attributes.energy.readonly
                  ? (
                    <Nav.Item className="item">
                      <LabeledValue
                        suffix="keV"
                        name=""
                        value={this.props.beamline.attributes.energy.value}
                      />
                    </Nav.Item>
                  )
                  : (
                    <Nav.Item className="item">
                      <PopInput
                        name="Energy"
                        pkey="energy"
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
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" style={{ marginLeft: '320px' }}>
          <Nav className="nav">
            <Label className="name btn" style={{ width: '180px' }}>
            Sample Name :
              {'  '}
              <Badge variant={variantStyle} className="badge">
                <Nav.Item className="item">
                  <LabeledValue
                    suffix=""
                    name=""
                    value={this.props.beamline.attributes.sampleName.value}
                  />
                </Nav.Item>
              </Badge>
            </Label>
          </Nav>

          <Nav className="nav">
            <Label className="name btn" style={{ width: '180px' }}>
            Attenuation :
              {'  '}
              <Badge variant={variantStyle}>
                <Nav.Item className="item">
                  <LabeledValue
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
    data: { value: 'undefined', state: 'IN', msg: 'UNKNOWN' },
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
