import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import 'grommet/scss/hpinc/index.scss';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import PasswordInput from 'grommet/components/PasswordInput';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      signedUp: false,
      signedUpError: false
    };
    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    axios.post('/create/account', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
    .then(() => {
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        signedUp: true
      })
    })
    .catch((error) => {
      this.setState({
        signedUpError: true,
        signedUp: false
      })
    })
  };

  render() {
    let showToast;
    if (this.state.signedUp === true) {
      return (<Redirect to='/loginPage' />)
      } else if (this.state.signedUpError === true) {
        showToast = <Toast status='warning' onClose={() => this.setState({signedUpError: false})}>
          Sorry we couldn't sign you up. Please check your username or password and try again.
        </Toast>
      }
    return (
      <GrommetApp>
        <Box align='center'>
          {showToast}
          <Form>
            <Heading strong={true} align='center'>
              Sign Up
            </Heading>
            <FormFields>
              <FormField label='First Name'>
                <TextInput
                  onDOMChange={(e) => this.setState({firstName: e.target.value})}
                />
              </FormField>
              <FormField label='Last Name'>
                <TextInput
                  onDOMChange={(e) => this.setState({lastName: e.target.value})}
                />
              </FormField>
              <FormField label='E-mail'>
                <TextInput
                  onDOMChange={(e) => this.setState({email: e.target.value})}
                />
              </FormField>
              <FormField label='Password'>
                <PasswordInput
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </FormField>
            </FormFields><br/>
            <Button
              label='Sign Up'
              primary={true}
              type='submit'
              onClick={this.onSignup}
              fill={true}
            /> <br/><br/>
              <Button
                label='Already have an account?'
                primary={true}
                onClick={() => this.setState({signedUp: true})}
                type='button'
                fill={true}
              />
          </Form>
        </Box>
      </GrommetApp>
    )
  }
}

export default withRouter(Signup);
