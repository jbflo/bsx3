/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ScTable from './ScTable';

import './sc.css';
import LabeledValue from '../components/LabeledValue/LabeledValue';


const styles = {
  button: {
    backgroundColor: '#00695c',
    color: '#fff',
    width: '100px'
  },
  input: {
    display: 'none',
  },
};

class Sc extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    // const { classes } = this.props;
    return [
      <div className="sc">
        <hr style={{ marginTop: '20px', with: '100%' }} />
        <div style={{ }}>
          <LabeledValue>
            Add to Queue
          </LabeledValue>
        </div>
        <h2 style={{ marginTop: '10px', marginBottom: '20px', with: '100%' }}> Sample Configuration </h2>
        {/* <div>
          <input
            accept="image/*"
            className={classes.input}
            id="outlined-button-file"
            multiple
            type="file"
          />
        </div> */}
        <ScTable className="sctable" />
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    Sc: state.Sc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
Sc.defaultProps = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sc); withStyles(styles);
