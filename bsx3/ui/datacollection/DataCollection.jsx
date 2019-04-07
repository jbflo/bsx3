
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
// import Tabs from 'react-responsive-tabs';
import Tab from 'react-bootstrap/Tab';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';
import Queue from '../queue/Queue';
import Hplc from '../hplc/Hplc';
import Sc from '../sc/Sc';
// import 'react-responsive-tabs/styles.css';
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

// const tab1 = <Sc />;
// const tabs = [{ name: 'George Washington', biography: [tab1] },
//   { name: 'Theodore Roosevelt', biography: '...' }];

// function getTabs() {
//   return tabs.map((president, index) => ({
//     title: president.name,
//     // getContent: () => president.biography,
//     getContent: () => (
//       <div className="tab-container">
//         <div className="tab-name">{president.biography}</div>
//       </div>
//     ),
//     /* Optional parameters */
//     key: index,
//     tabClassName: 'nav-tabs',
//     panelClassName: 'panel',
//   }));
// }
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
                {/* <Tabs items={getTabs()} /> */}
                <Tabs
                  className="tabs"
                  id="controlled-tab-example"
                  activeKey={this.state.valuetab1}
                  onSelect={valuetab1 => this.setState({ valuetab1 })}
                >
                  <Tab className="tab" eventKey={0} title="Home" style={styles.default_tab}>
                    Code Home Panel Here
                  </Tab>
                  <Tab className="tab" eventKey={1} title="Sample Changer" style={styles.default_tab}>
                    <Sc />
                  </Tab>
                  <Tab className="tab" eventKey={2} title="HPLC" style={styles.default_tab}>
                    <Hplc />
                  </Tab>
                  <Tab className="tab" eventKey={3} title="Work Flow" style={styles.default_tab}>
                    Content Work Flow Panel Here
                  </Tab>
                  <Tab className="tab" eventKey={4} title="Set Up" style={styles.default_tab}>
                    Content Set Up PanelHere
                  </Tab>

                  {/* {valuetab1 === 4 ? <Tab title="Set Up" style={styles.active_tab} />
                    : <Tab title="Set Up" style={styles.default_tab} /> } */}
                </Tabs>
              </div>
            </div>
          </div>
          {/* Tab for messages and Queue  */}
          <div className="col-md-4 col-sm-12">
            <div className="horizontal-tabs spec">
              <div className="card">
                <Tabs
                  className="tabs"
                  activeKey={this.state.valuetab2}
                  onSelect={valuetab2 => this.setState({ valuetab2 })}
                >
                  <Tab className="tab" eventKey={0} title="Queue" style={styles.default_tab}>
                    <Queue />
                  </Tab>
                  <Tab className="tab" eventKey={1} title="Sample Changer" style={styles.default_tab}>
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
