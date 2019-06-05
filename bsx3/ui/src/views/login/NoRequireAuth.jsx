import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NoRequireAuth extends Component {
    PropTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (this.props.sessionid) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.sessionid) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ session }) {
    return { sessionid: session.sessionid };
  }

  return connect(mapStateToProps)(NoRequireAuth);
}
