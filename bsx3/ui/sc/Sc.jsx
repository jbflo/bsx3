
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ScTable from './ScTable';

import './sc.css';

// const styles = {
//   button: {
//     backgroundColor: '#00695c',
//     color: '#fff',
//     width: '100px'
//   },
//   input: {
//     display: 'none',
//   },
// };

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
          <Card.Title
            style={{ position: 'relative', top: '30px', marginLeft: '20px' }}
          >
            Sample Configuration
          </Card.Title>
          <Card.Text
            style={{ position: 'relative', top: '30px', marginLeft: '15px' }}
          >
            Queue Name : ....
          </Card.Text>
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
)(Sc);
