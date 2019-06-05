import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { initAppRequest } from 'actions/app.actions';

import NavLoggedIn from '../header/NavLoggedIn';
import Datacollection from '../datacollection/DataCollection';
import Notification from '../../components/notification/Notification';

class Main extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.dispatch(initAppRequest());
    }
  }

  render() {
    return (
      <div className="main">
        {this.props.showNotification
          ? (
            <Notification
              level="success"
              message="Succesfully delete row"
              visible={this.props.showNotification}
              handleShowNotification={this.props.handleShowNotification}
            />
          )
          : null
        }
        { <Route exact path="/datacollection" component={NavLoggedIn} />
        }
        <Route exact path="/datacollection" component={Datacollection} />
        <Route exact path="/" component={NavLoggedIn} />
        <Route exact path="/" component={Datacollection} />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(
  mapStateToProps,
)(Main);
