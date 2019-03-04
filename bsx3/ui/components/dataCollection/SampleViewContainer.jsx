import React, { Component } from 'react';
import { connect } from 'react-redux';
import BeamlineSetupContainer from './BeamlineSetupContainer';
// import SampleQueueContainer from './SampleQueueContainer';


class SampleViewContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12" style={{ marginTop: '0px', with: '100%' }}>
              <BeamlineSetupContainer />
            </div>
          </div>
          <div className="row" style={{ display: 'flex', marginTop: '1em' }}>
            <div className="col-xs-4" style={{ display: 'flex' }}>
              {/* <SampleQueueContainer /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {
    // sampleViewActions: bindActionCreators(SampleViewActions, dispatch),
    // updateTask: bindActionCreators(updateTask, dispatch),
    // showForm: bindActionCreators(showTaskForm, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleViewContainer);
