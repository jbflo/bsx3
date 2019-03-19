import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import {
  Form, Image, Nav, Alert
} from 'react-bootstrap';
import * as LoginAPI from './login-api';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import loader from '../img/loader.gif';
import logo from '../img/logo.png'; // relative path to logo

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(LoginAPI.logout());
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // let logini;
  }


  handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (username && password) {
      this.props.dispatch(LoginAPI.loginRequest(username.toLowerCase(), password));
    }
    // this.props.setLoading(true);
  }


  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.signIn();
    }
    if (target.charCode === 13) {
      this.logini = true;
    }
  }

  validateForm() {
    return (
      this.props.username > 0
      && this.props.password > 0
    );
  }


  render() {
    if (this.props.loading && !this.props.showProposalsForm) {
      return <img src={loader} className="centered" alt="Loading" />;
    }
    // let isSuccess;
    // let msg;

    // // eslint-disable-next-line no-prototype-builtins
    // if (this.props.response.login.hasOwnProperty('response')) {
    //   isSuccess = this.props.response.login.response.success;
    //   msg = this.props.response.login.response.message;

    //   if (isSuccess) {
    //     localStorage.removeItem('token');
    //     localStorage.setItem('token', this.props.response.login.response.token);
    //     // setCookie('token', this.props.response.login.response.token, 1);
    //   }
    // }

    const { isLoginPending, isLoginSuccess, loginError } = this.props;
    const { loggingIn } = this.props;
    return [
      <div className="login">
        {/* {!isSuccess ? <div>{msg}</div> : <Redirect to="/" />} */}
        <Form name="Login" onSubmit={this.handleSubmit}>
          <Nav className="justify-content-center">
            <Image
              style={{
                width: '80px', height: '80px', marginBottom: '20px', marginTop: '35px', marginLeft: '11%'
              }}
              // src={logo}
              alt="LOGO"
            />
          </Nav>
          <Form.Group className="form-group" controlId="username" bsSize="large">
            <Form.Control
              required
              inputRef={(ref) => { this.username = ref; }}
              autoFocus
              type="text"
              name="username"
              placeholder="LoginID"
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="password" bsSize="large">
            <Form.Control
              required
              onKeyPress={this.handleKeyPress}
              inputRef={(ref) => { this.password = ref; }}
              type="password"
              name="password"
              placeholder="password"
            />
          </Form.Group>

          <button
            className="btn"
            // disabled={!this.validateForm()}
            type="submit"
          >
          Login
          </button>
          {loggingIn
              && <img src={logo} alt=" " />
          }
          <div className="message">
            { isLoginPending && <div>Please wait...</div> }
            { isLoginSuccess && <div>Success.</div> }
            { loginError && <div>{loginError.message}</div> }
          </div>
          {(this.props.showError ? <Alert bsStyle="danger"><h4>Login failed</h4></Alert> : '')}
          {(<Alert bsStyle="danger"><h4>{this.username}</h4></Alert>,
            <Alert bsStyle="danger"><h4>{this.password}</h4></Alert>)}
        </Form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  return {
    state
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     login: (email, password) => dispatch(login(email, password))
//   };
// }

export default connect(
  mapStateToProps,
)(Login);
