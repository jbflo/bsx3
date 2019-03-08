import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Form, Image, Nav, Alert
} from 'react-bootstrap';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import loader from '../../img/loader.gif';
import * as LoginAPI from '../../actions/login';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    // const redirectRoute = '/login';
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // let logini;
  }


  // handleSubmit(event) {
  //   event.preventDefault();
  //   const username = this.props.login.username.value;
  //   const password = this.password.value;

  //   console.log({ username }, '  ', { password });
  //   this.props.setLoading(true);
  //   this.props.signIn(username.toLowerCase(), password);
  // }


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
      this.props.login.username > 0
      && this.props.login.password > 0
    );
  }

  signIn() {
    const username = this.username.value;
    const password = this.password.value;
    console.log({ username }, '  ', { password });
    this.props.setLoading(true);
    this.props.signIn(username.toLowerCase(), password);
    return true;
  }

  render() {
    if (this.props.loading && !this.props.showProposalsForm) {
      return <img src={loader} className="centered" alt="Loading" />;
    }

    return [
      <div className="login">
        <Form>
          <Nav className="justify-content-center">
            <Image style={{ width: '80px', marginBottom: '40px', marginTop: '75px' }} src="holder.js/171x180" />
            <Nav.Item className="title"> BsxCube 3</Nav.Item>
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
            onClick={this.signIn}
          >
            Login
          </button>
          {(this.props.showError ? <Alert bsStyle="danger"><h4>Login failed</h4></Alert> : '')}
          {(<Alert bsStyle="danger"><h4>{this.username}</h4></Alert>,
            <Alert bsStyle="danger"><h4>{this.password}</h4></Alert>)}
        </Form>
      </div>
    ];
  }
}

function mapStateToProps({ login }) {
  return { login };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginAPI, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
