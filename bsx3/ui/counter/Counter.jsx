import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import * as CounterAPI from './counter-api';

class Counter extends React.Component {
  render() {
    return (
      <p>
        {`Clicked ${this.props.count} times`}
        {' '}
        <Button type="button" onClick={this.props.incCounterRequest}>
          Hello +
        </Button>
        {' '}
        <Button type="button" onClick={this.props.decCounterRequest}>
          -
        </Button>
        {' '}
        <Button type="button" onClick={this.props.incrementAsync}>
          Increment async
        </Button>
        {' '}
        <Button type="button" onClick={this.props.decrementAsync}>
          Decrement async
        </Button>
      </p>
    );
  }
}


function mapStateToProps({ counter }) {
  return {
    count: counter.count,
    isIncrementing: counter.isIncrementing,
    isDecrementing: counter.isDecrementing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterAPI, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
