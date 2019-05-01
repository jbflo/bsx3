import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LoginAPI from './login-api';
import loader from '../../img/loader.gif';
import logo from '../../img/logo.png'; // relative path to logo

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

    const { isLoginPending, isLoginSuccess, loginError } = this.props;
    const { loggingIn } = this.props;
    return [
      <div className="login">
        <form name="Login" onSubmit={this.handleSubmit}>
          {/* <Image
            style={{
              width: '80px', height: '80px', marginBottom: '20px',
                marginTop: '35px', marginLeft: '11%'
            }}
            // src={logo}
            alt="LOGO"
          /> */}
          <input
            required
            id="outlined-dense"
            label="User Name"
            inputRef={(ref) => { this.username = ref; }}
            type="text"
            name="username"
            margin="dense"
            variant="outlined"
          />
          <input
            required
            id="outlined-password-input"
            label="Password"
            inputRef={(ref) => { this.password = ref; }}
            name="password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />

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
        </form>
        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Success.</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
        {/* {(this.props.showError ? <Alert bsStyle="danger"><h4>Login failed</h4></Alert> : '')}
        {(<Alert bsStyle="danger"><h4>{this.username}</h4></Alert>,
          <Alert bsStyle="danger"><h4>{this.password}</h4></Alert>)} */}
      </div>
    ];
  }
}

function mapStateToProps(state) {
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
