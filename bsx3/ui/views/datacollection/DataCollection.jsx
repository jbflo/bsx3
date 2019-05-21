
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';
import Hplc from './hplc/Hplc';
import SampleChanger from './sampleChanger/SampleChanger';
import Queue from './queue/Queue';

import './dataC.css';

class Datacollection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valuetab1: 0,
      valuetab2: 0,
    };
    // this.handleChangeTab1 = this.handleChangeTab1.bind(this);
    // this.handleChangeTab2 = this.handleChangeTab2.bind(this);
  }

  // handleChangeTab1 = (event, valuetab1) => {
  //   this.setState({ valuetab1 });
  // };

  // handleChangeTab2 = (event, valuetab2) => {
  //   this.setState({ valuetab2 });
  // };

  render() {
    return [
      <div className="">
        <div>
          <BeamlineStatus key="bstatus" />
        </div>
        <div className="row">
          <div className="col-9 nopadding" style={{ }}>
            <div className="horizontal-tabs">
              <div className="cardtabs1">
                <Tabs
                  className="nav nav-tabs"
                  activeKey={this.state.valuetab1}
                  onSelect={valuetab1 => this.setState({ valuetab1 })}
                >
                  <Tab eventKey={0} title="SAMPLE CHANGER" className="nav-item">
                    <SampleChanger key="scTab" />
                  </Tab>
                  <Tab eventKey={1} title="HPLC" className="">
                    <Hplc key="hplc" />
                  </Tab>
                  <Tab eventKey={2} title="WORK FLOW" className="nav-item">
                    Content Work Flow Panel Here
                  </Tab>
                  <Tab eventKey={3} title="SET UP" className="nav-item">
                    Content Set Up PanelHere
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          {/* Tab for messages and Queue  */}
          <div className="col-3 nopadding" style={{ }}>
            <div className="horizontal-tabs">
              <div className="cardtabs2">
                <Tabs
                  className="nav nav-tabs"
                  activeKey={this.state.valuetab2}
                  onSelect={valuetab2 => this.setState({ valuetab2 })}
                >
                  <Tab title="QUEUE" eventKey={0} className="nav-item">
                    <Queue key="queueTab" />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}


function mapStateToProps() {
  return { };
}

function mapDispatchToProps() {
  return { };
}

Datacollection.defaultProps = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Datacollection);
