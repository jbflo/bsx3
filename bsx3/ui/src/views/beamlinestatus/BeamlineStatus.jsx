import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as BeamlineActions from 'actions/beamline.actions';

import PopInput from '../../components/PopInput/PopInput';
import LabeledValue from '../../components/LabeledValue/LabeledValue';
import InOutSwitch from '../../components/InOutSwitch/InOutSwitch';

// import './bscontainers.css';

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
    return (
      <Row
        className="beamline-status"
        style={{
          background: 'rgba(126, 204, 226, 0.06)',
          paddingTop: '1em',
          paddingBottom: '0.5em',
          borderBottom: '1px solid #d2d2d2'
        }}
      >
        <Col>
          <span className="blstatus-item" style={{ marginLeft: '1em' }}>
            <InOutSwitch
              labelText={this.props.beamline.shutters.fast_shutter.name}
              onText={this.props.beamline.shutters.fast_shutter.on_text}
              offText={this.props.beamline.shutters.fast_shutter.off_text}
              state={this.props.beamline.shutters.fast_shutter.state}
              key={this.props.beamline.shutters.fast_shutter.name}
              data={this.props.beamline.shutters.fast_shutter}
              onSave={() => {
                this.onSaveHandler(this.props.beamline.shutters.fast_shutter.id);
              }}
            />
          </span>
          <span className="blstatus-item">
            <PopInput
              name="Energy"
              key="energy"
              suffix="keV"
              variant="vertical"
              placement="bottom"
              data={this.props.beamline.energy}
              onSave={this.setBLValue}
              onCancel={this.onCancelHandler}
            />
          </span>
          <span className="blstatus-item">
            <LabeledValue
              key={3}
              suffix=""
              name="Ring Current"
              value={this.props.beamline.machine_info.current}
            />
          </span>
        </Col>
        <Col xs="auto" />
        <Col className="d-flex justify-content-end">
          <span className="blstatus-item">
            <LabeledValue
              key={4}
              suffix=""
              name="Sample Name"
              value="Sample-1"
            />
          </span>
          <span className="blstatus-item">
            <LabeledValue
              key={5}
              suffix=""
              name="Run No."
              value="0"
            />
          </span>
          <span className="blstatus-item">
            <LabeledValue
              key={6}
              suffix="%"
              name="Attenuation"
              value="0"
            />
          </span>
          <span className="blstatus-item">
            <LabeledValue
              key={7}
              suffix="s/frame"
              name="Exp T."
              value="0"
            />
          </span>
          <span className="blstatus-item">
            <LabeledValue
              key="frame"
              suffix=""
              name="Frame No."
              value="1"
            />
          </span>
        </Col>
      </Row>
    );
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
    getAllBLValues: BeamlineActions.getBeamline,
    toggleShutter: BeamlineActions.toggleShutter,
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeamlineStatus);
