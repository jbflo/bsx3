import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NavLoggedIn from '../header/NavLoggedIn';
import Login from '../login/Login';
import Datacollection from '../datacollection/DataCollection';
import Notification from '../../components/notification/Notification';
// import './main.css';

const history = createBrowserHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { initialized: false };
  }

  componentWillMount() {
    this.setState({ initialized: true });
    if (!this.props.authenticated) {
      history.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      history.push('/');
    }
  }

  render() {
    // const login = true;
    // let headercontent;
    // if (login) {
    //   headercontent = <NavLoggedIn />;
    // } else { headercontent = <NavLoggedOut />; }
    if (!this.state.initialized) return <span>Loading...</span>;

    return [
    //  headercontent,
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
        <Route exact path="/datacollection" component={NavLoggedIn} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/datacollection" component={Datacollection} />
        <Route exact path="/" component={NavLoggedIn} />
        <Route exact path="/" component={Datacollection} />
      </div>
    ];
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(
  mapStateToProps,
)(Main);
