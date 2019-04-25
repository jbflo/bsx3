
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import App from '../queue/index';
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

    return (
      <span className="datacollection-container">
        <div className="row" style={{ marginTop: '1em' }}>
          <div className="col-md-8 col-sm-12">
            <div className="horizontal-tabs">
              <div className="card">
                <Tabs
                  style={{ width: '100%' }}
                  className="tabs"
                  activeKey={this.state.valuetab1}
                  onSelect={valuetab1 => this.setState({ valuetab1 })}
                >
                  <Tab eventKey={0} title="SAMPLE CHANGER" className="tab" style={styles.default_tab}>
                    <Sc key="sc" />
                  </Tab>
                  <Tab eventKey={1} title="HPLC" className="tab" style={styles.active_tab}>
                    <Hplc key="hplc" />
                  </Tab>
                  <Tab eventKey={2} title="WORK FLOW" style={styles.active_tab}>
                    Content Work Flow Panel Here
                  </Tab>
                  <Tab eventKey={3} title="SET UP" style={styles.active_tab}>
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
                    <App />
                  </Tab>
                  <Tab eventKey={1} title="MESSAGES" className="tab" style={styles.default_tab}>
                    Content Messages Panel Here
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
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
