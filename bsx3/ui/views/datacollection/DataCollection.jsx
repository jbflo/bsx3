
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

      <div>
        <BeamlineStatus key="bmstatatus" />
      </div>,
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={{ marginLeft: '15px' }}>
            <div className="horizontal-tabs">
              <div className="cardtabs">
                <Tabs
                  className="nav nav-tabs nav-fill"
                  activeKey={this.state.valuetab2}
                  onSelect={valuetab2 => this.setState({ valuetab2 })}
                >
                  <Tab eventKey={0} title="RESULT" className="nav-item nav-link">
                     Home Tab will Be there
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="col-7" style={{ marginLeft: '-20px' }}>
            <div className="horizontal-tabs">
              <div className="cardtabs">
                <Tabs
                  className="nav nav-tabs nav-fill"
                  activeKey={this.state.valuetab1}
                  onSelect={valuetab1 => this.setState({ valuetab1 })}
                >
                  <Tab eventKey={0} title="SAMPLE CHANGER" className="nav-item">
                    <SampleChanger />
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
          <div className="col-2">
            <div className="horizontal-tabs spec">
              <div className="cardtabs">
                <Tabs
                  className="nav nav-tabs nav-fill"
                  activeKey={this.state.valuetab2}
                  onSelect={valuetab2 => this.setState({ valuetab2 })}
                >
                  <Tab eventKey={0} title="QUEUE" className="nav-item nav-link">
                    <Queue />
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
