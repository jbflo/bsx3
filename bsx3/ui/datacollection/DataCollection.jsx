
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';
import Queue from '../queue/Queue';
import Hplc from '../hplc/Hplc';
import Sc from '../sc/Sc';

import './dataC.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  default_tab: {
    boxShadow: '0 2px 3px 1px rgba(165, 204, 130, 0.877)',
    borderRadius: 11,
    outline: 'none',
  }
};

class Datacollection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valuetab1: 0,
      // valuetab2: 0,
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
    // const { valuetab1, valuetab2 } = this.state;

    return [

      <div>
        <BeamlineStatus key="bmstatatus" />
      </div>,

      <div className="contain">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="horizontal-tabs">
              <div className="card">
                <Tabs
                  style={{ width: '100%' }}
                  className="tabs"
                  activeKey={this.state.valuetab1}
                  onSelect={valuetab1 => this.setState({ valuetab1 })}
                >
                  <Tab eventKey={0} title="HOME" className="tab" style={styles.active_tab}>
                    <Sc />
                    {/* Code Home Panel Here */}
                  </Tab>
                  <Tab eventKey={1} title="SAMPLE CHANGER" className="tab" style={styles.default_tab}>
                    TEMP
                  </Tab>
                  <Tab eventKey={2} title="HPLC" className="tab" style={styles.active_tab}>
                    <Hplc />
                  </Tab>
                  <Tab eventKey={3} title="WORK FLOW" style={styles.active_tab}>
                    Content Work Flow Panel Here
                  </Tab>
                  <Tab eventKey={4} title="SET UP" style={styles.active_tab}>
                    Content Set Up PanelHere
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          {/* Tab for messages and Queue  */}
          <div className="col-md-4 col-sm-12">
            <div className="horizontal-tabs spec">
              <div className="card">
                <Tabs
                  style={{ width: '100%' }}
                  className="tabs"
                  activeKey={this.state.valuetab2}
                  onSelect={valuetab2 => this.setState({ valuetab2 })}
                >
                  <Tab eventKey={0} title="QUEUE" className="tab" style={styles.active_tab}>
                    <Queue />
                  </Tab>
                  <Tab eventKey={1} title="MESSAGES" className="tab" style={styles.default_tab}>
                    Content Messages Panel Here
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
