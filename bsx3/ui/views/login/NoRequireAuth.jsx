import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NoRequireAuth extends Component {
    PropTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ login }) {
    return { authenticated: login.authenticated };
  }

  return connect(mapStateToProps)(NoRequireAuth);
}
