
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ScTable from './ScTable';

import './sc.css';

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
        <div>
          <h3 className="" style={{ paddingTop: '30px', with: '100%' }}> Sample Configuration </h3>
        </div>
        <hr style={{ marginBottom: '20px', with: '100%' }} />
        <div>
          <h6> Queue Name : ....</h6>
        </div>
        <ScTable />
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
