import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, InputGroup, Form, Image, Nav, Alert
} from 'react-bootstrap';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import * as LoginAPI from './login-api';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);


    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    this.props.setLoading(true);
    this.props.loginRequest(username, password);
  }

  validateForm() {
    return (
      this.props.login.username > 0
      && this.props.login.password > 0
    );
  }

  signIn() {
    if (
      this.props.login.username.length > 0
      && this.props.login.password.length > 0
    ) {
      return true;
    }

    return false;
  }

  render() {
    return [
      <div className="login">
        <Form onSubmit={this.handleSubmit}>
          <Nav className="justify-content-center">
            <Image style={{ width: '80px', marginBottom: '60px' }} src="holder.js/171x180" />
            <Nav.Item className="title"> BsxCube 3</Nav.Item>
          </Nav>
          <Form.Group controlId="username" bsSize="large">
            <InputGroup>
              <Form.Control
                required
                inputRef={(usernameRef) => { this.username = usernameRef; }}
                autoFocus
                type="text"
                placeholder="LoginID"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              required
              inputRef={(passwordRef) => { this.password = passwordRef; }}
              type="password"
              placeholder="password"
            />
          </Form.Group>

          <Button
            className="btn-dark"
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          {(this.props.showError ? <Alert bsStyle="danger"><h4>Login failed</h4></Alert> : '')}
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
