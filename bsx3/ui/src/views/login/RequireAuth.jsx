import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    PropTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (!this.props.sessionid) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ session }) {
    return { sessionid: session.sessionid };
  }

  return connect(mapStateToProps)(RequireAuth);
}
