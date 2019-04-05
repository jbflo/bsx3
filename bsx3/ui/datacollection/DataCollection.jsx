
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Card from '@material-ui/core/Card';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import TabContainer from 'react-bootstrap/TabContainer';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';
// import Queue from '../queue/Queue';
import Hplc from '../hplc/Hplc';
import Sc from '../sc/Sc';

// import Wrapper from '../components/tabs/Wrapper';
// import Tab from '../components/tabs/Tab';
// import TabList from '../components/tabs/TabList';
// import TabPanel from '../components/tabs/TabPanel';


import './dataC.css';
import './tabStyle.css';

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const styles = {
  root: {
    flexGrow: 1,
  },
  default_tab: {
    boxShadow: '0 2px 3px 1px rgba(165, 204, 130, 0.877)',
  },
  active_tab: {
    backgroundColor: '#FFFFFF80',
    color: ' #004d40',
    borderRadius: 11,
    outline: 'none',
  }

};
// function demoTab(content) {
//   let cl = 'FancyTabs-tabInner';
//   cl += ' is-active';
//   return (
//     <div className={cl}>
//       {content}
//     </div>
//   );
// }

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
                <div
                  className="appbar"
                  position="static"
                  color="default"
                >
                  <Tabs
                    style={{ width: '100%' }}
                    className="tabs"
                    activeKey={this.state.valuetab1}
                    onSelect={valuetab1 => this.setState({ valuetab1 })}
                  >
                    <Tab eventKey={0} title="Home" className="tab" style={styles.active_tab}>
                     Code Home Panel Here
                    </Tab>
                    <Tab eventKey={1} title="Sample Changer" className="tab" style={styles.default_tab}>
                      <Sc />
                    </Tab>
                    <Tab eventKey={2} title="HPLC" className="tab" style={styles.active_tab}>
                      <Hplc />
                    </Tab>
                    <Tab eventKey={3} title="Work Flow" style={styles.active_tab}>
                     Content Work Flow Panel Here
                    </Tab>
                    <Tab eventKey={4} title="Set Up" style={styles.active_tab}>
                      Content Set Up PanelHere
                    </Tab>

                    {/* {valuetab1 === 4 ? <Tab title="Set Up" style={styles.active_tab} />
                      : <Tab title="Set Up" style={styles.default_tab} /> } */}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          {/* Tab for messages and Queue  */}
          <div className="col-md-4 col-sm-12">
            <div className="horizontal-tabs">
              <div className="card">
                <Nav
                  className="appbar"
                  position="static"
                  color="default"
                >
                  <Tabs
                    className="tabs"
                    // value={valuetab2}
                    onChange={this.handleChangeTab2}
                    variant="fullWidth"
                    TabIndicatorProps={{
                      style: {
                        width: 0,
                      }
                    }}
                  >
                    {/* {valuetab2 === 0 ? <Tab label="Queue" style={styles.active_tab} />
                      : <Tab label="Queue" style={styles.default_tab} /> }

                    {valuetab2 === 1 ? <Tab label="Messages" style={styles.active_tab} />
                      : <Tab label="Messages" style={styles.default_tab} /> } */}

                  </Tabs>
                </Nav>
                {/* {valuetab2 === 0 && <TabContainer><Queue /></TabContainer>}
                {valuetab2 === 1 && <TabContainer>Content Messages Panel Here</TabContainer>} */}
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
