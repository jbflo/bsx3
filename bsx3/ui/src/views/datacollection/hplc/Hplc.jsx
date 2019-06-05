
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './hplc.css';

class HPLC extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return (
      <div className="" style={{ }}>
         Test
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HPLC);
