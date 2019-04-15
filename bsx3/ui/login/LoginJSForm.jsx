import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import * as LoginAPI from './login-api';

import './login.css';

const uiSchema = {
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

class LoginJSForm extends Component {
  login(formData) {
    console.log(formData);
    debugger;
  }

  render() {
    if (!this.props.schema) {
      return null;
    }

    return (
      <div className="Login">
        <div className="LoginInner">
          <h3> Login </h3>
          <Form
            schema={this.props.schema}
            uiSchema={uiSchema}
            onChange={log('changed')}
            onSubmit={(e) => {
              this.props.dispatch(LoginAPI.loginRequest(e.formData.username, e.formData.password));
            }}
            onError={log('errors')}
            showErrorList={false}
            liveValidate
          />
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
)(LoginJSForm);
