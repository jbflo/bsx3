
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Plate from '../../../../components/plate/Plate';
// import * as sampleAction from '../../../app/actions/scSample';


// import './style.css';

class Plate1 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() { }

  componentDidUpdate() { }

  render() {
    return (
      <div className="plate1">
        <span>
          4 x ( 8 + 3 ) Block
          { ' ' }
          {/* <i className="fas fa-arrow-circle-down" /> */}
        </span>
        <Plate {...this.props} />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    plateColumns: 8,
    plateRows: 4,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plate1);
