import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios'

import 'grommet/scss/hpinc/index.scss';
import LoginForm from 'grommet/components/LoginForm';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import Toast from 'grommet/components/Toast';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loginError: false
    }
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(value) {
    axios.post('/check/account', {
      username: value.username,
      password: value.password
    })
    .then(() => {
      this.setState({
        isLoggedIn: true
      })
    })
    .catch((error) => {
      this.setState({
        loginError: true
      });
      throw error;
    })
  }

  render() {
    let showToast;
    if (this.state.isLoggedIn === true) {
      return (<Redirect to='/secure' />)
    } else if (this.state.loginError === true) {
      showToast = <Toast status='warning' onClose={() => this.setState({loginError: false})}>
        There was an issue logging in. Please try re-entering your username and password.
      </Toast>
    }
    return (
      <GrommetApp>
        <Box align='center'>
          {showToast}
          <LoginForm
            onSubmit={this.onLogin}
            rememberMe={true}
            title='Please Login'
          />
        </Box>
      </GrommetApp>
    )
  }
}

export default withRouter(Login);
