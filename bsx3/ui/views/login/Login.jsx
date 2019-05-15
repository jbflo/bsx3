import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavLoggedOut from '../header/NavLoggedOut';

import * as LoginAPI from '../../app/actions/login';

import './login.css';

const uiSchema = {
  'ui:order': ['username', 'password'],
  username: {
    'ui:placeholder': 'Username',
    'ui:title': 'Username'
  },
  password: {
    'ui:widget': 'password',
    'ui:placeholder': 'Password',
    'ui:title': 'Password'
  }
};

const log = type => console.log.bind(console, type);

class Login extends Component {
  login(formData) {
    console.log(formData);
  }

  render() {
    if (!this.props.schema) {
      return null;
    }

    return (
      <div className="login">
        <NavLoggedOut />
        <div className="login-inner">
          <Card>
            <Card.Header>Login</Card.Header>
            <Form
              schema={this.props.schema}
              uiSchema={uiSchema}
              onChange={log('changed')}
              onSubmit={(e) => {
                this.props.dispatch(LoginAPI.loginRequest(
                  e.formData.username, e.formData.password
                ));
              }}
              onError={log('errors')}
              showErrorList={false}
            >
              <div>
                <Button className="pull-right" variant="info" type="submit">Login</Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    schema: app.schemas.user_login
  };
}

export default connect(
  mapStateToProps,
)(Login);
