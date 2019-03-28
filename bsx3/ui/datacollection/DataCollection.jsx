
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';
import Queue from '../queue/Queue';
import Hplc from '../hplc/Hplc';
import Sc from '../sc/Sc';


import './dataC.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
  }

};

class Datacollection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valuetab1: 0,
      valuetab2: 0,
    };
    this.handleChangeTab1 = this.handleChangeTab1.bind(this);
    this.handleChangeTab2 = this.handleChangeTab2.bind(this);
  }

  handleChangeTab1 = (event, valuetab1) => {
    this.setState({ valuetab1 });
  };

  handleChangeTab2 = (event, valuetab2) => {
    this.setState({ valuetab2 });
  };

  render() {
    const { classes } = this.props;
    const { valuetab1, valuetab2 } = this.state;

    return [

      <div>
        <BeamlineStatus />
      </div>,

      <div className="contain">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="horizontal-tabs">
              <Card className="card">
                <AppBar
                  className="appbar"
                  position="static"
                  color="default"
                >
                  <Tabs
                    className="tabs"
                    // inkBarStyle={{ background: 'green' }}
                    value={valuetab1}
                    onChange={this.handleChangeTab1}
                    indicatorColor="default"
                    variant="fullWidth"
                    scrollButtons="auto"
                    classes={{
                      root: classes.tabsRoot,
                      indicator: classes.displayNone,
                      // tabSelected: classes.tabSelected
                    }}

                  >
                    {/* We do that to Apply different style to the Tab Header */}
                    {valuetab1 === 0 ? <Tab label="Home" className="tab" style={styles.active_tab} />
                      : <Tab label="Home" className="tab" style={styles.default_tab} /> }

                    {valuetab1 === 1 ? <Tab label="Sample Changer" style={styles.active_tab} />
                      : <Tab label="Sample Changer" style={styles.default_tab} /> }

                    {valuetab1 === 2 ? <Tab label="HPLC" style={styles.active_tab} />
                      : <Tab label="HPLC" style={styles.default_tab} /> }

                    {valuetab1 === 3 ? <Tab label="Work Flow" style={styles.active_tab} />
                      : <Tab label="Work Flow" style={styles.default_tab} /> }

                    {valuetab1 === 4 ? <Tab label="Set Up" style={styles.active_tab} />
                      : <Tab label="Set Up" style={styles.default_tab} /> }
                  </Tabs>
                </AppBar>
                {valuetab1 === 0 && <TabContainer>Code Home Panel Here</TabContainer>}
                {valuetab1 === 1 && <TabContainer><Sc /></TabContainer>}
                {valuetab1 === 2 && <TabContainer><Hplc /></TabContainer>}
                {valuetab1 === 3 && <TabContainer>Content Work Flow Panel Here</TabContainer>}
                {valuetab1 === 4 && <TabContainer>Content Set Up PanelHere</TabContainer>}
              </Card>
            </div>
          </div>
          {/* Tab for messages and Queue */}
          <div className="col-md-4 col-sm-12">
            <div className="horizontal-tabs">
              <Card className="card">
                <AppBar
                  className="appbar"
                  position="static"
                  color="default"
                >
                  <Tabs
                    className="tabs"
                    value={valuetab2}
                    onChange={this.handleChangeTab2}
                    indicatorColor="default"
                    variant="fullWidth"
                    classes={{
                      root: classes.tabsRoot,
                      indicator: classes.displayNone,
                      scrollButtons: classes.displayNone,
                      // tabSelected: classes.tabSelected
                    }}
                  >
                    {valuetab2 === 0 ? <Tab label="Messages" style={styles.active_tab} />
                      : <Tab label="Messages" style={styles.default_tab} /> }

                    {valuetab2 === 1 ? <Tab label="Queue" style={styles.active_tab} />
                      : <Tab label="Queue" style={styles.default_tab} /> }
                  </Tabs>
                </AppBar>
                {valuetab2 === 0 && <TabContainer>Content Messages Panel Here</TabContainer>}
                {valuetab2 === 1 && <TabContainer><Queue /></TabContainer>}
              </Card>
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
)(Datacollection); withStyles(styles);
