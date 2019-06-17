
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Plate from '../../../../components/plate/Plate';
// import * as sampleAction from '../../../app/actions/scSample';


// import './style.css';

class SamplePlate extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() { }

  componentDidUpdate() { }

  render() {
    return (
      <>
        {this.props.gridPlate.map((grid, index) => (
          <div className="col-4" style={{ marginRight: '0px' }} key={grid.title}>
            <span>
              { ' Plate ' }
              {index + 1}
              { ' : ' }
              {grid.title}
              { ' ' }
              {/* <i className="fas fa-arrow-circle-down" /> */}
            </span>
            <Plate grid={grid} />
          </div>
        ))}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridPlate: state.sample.plateGrid,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SamplePlate);
