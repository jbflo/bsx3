import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    PropTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ login }) {
    return { authenticated: login.authenticated };
  }

  return connect(mapStateToProps)(RequireAuth);
}
