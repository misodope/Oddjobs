import React from 'react';
import GoogleSearchBox from './googleSearchBox.jsx';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom'

import 'grommet/scss/hpinc/index.scss';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import NumberInput from 'grommet/components/NumberInput';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brief: '',
      detailed: '',
      payment: 10,
      image: null,
      submitted: false,
      submitError: false
    }

    this.submitPost = this.submitPost.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  submitPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brief',this.state.brief)
    formData.append('detailed',this.state.detailed)
    formData.append('payment',this.state.payment)
    formData.append('image',this.state.image)
    axios.post('/create/post', formData)
    .then((results) => {
      this.setState({
        submitted: true
      })
    })
    .catch((error) => {
      this.setState({
        submitError: true
      })
    })
  }

  changeImage(e) {
    const file = e.target.files[0];
    this.setState({
      image: file
    })
  }

  render() {
    let showToast;
    if (this.state.submitted === true) {
      return (<Redirect to='/secure' />)
    } else if (this.state.submitError === true) {
      showToast = <Toast status='warning' onClose={() => this.setState({submitError: false})}>
        There was an issue submitting your post. Please make sure you fill out all required sections and that you are logged in.
      </Toast>
    }

    return (
      <GrommetApp>
        <Box align='center' pad='medium' full='vertical'>
          {showToast}
          <Form onSubmit={this.submitPost}>
            <Header>
              <Headline>
                Job Posting
              </Headline>
            </Header>
            <FormFields>
              <Label>
                Enter Job Address.
              </Label>
              <GoogleSearchBox /><br />
              <Label>
                Brief Job Description
              </Label>
              <FormField label='Enter a brief description'>
                <TextInput onDOMChange={(e) => this.setState({brief: e.target.value})}/>
              </FormField><br />
              <Label>
                Detailed Description
              </Label>
              <FormField label='Enter a more detailed description of the job'>
                <textarea onChange={(e) => this.setState({detailed: e.target.value})}></textarea>
              </FormField><br />
              <Label>
                Minimum Pay Amount
              </Label>
              <FormField label="Enter the amount you're willing to pay. Minimum 10 dollars">
                <NumberInput step={1} min={10} defaultValue={10} onChange={(e) => this.setState({payment: e.target.value})}/>
              </FormField><br />
              <Label>
                Upload Images - Optional
              </Label>
              <FormField label='Upload a picture'>
                <input type='file' onChange={this.changeImage} accept='image/*' />
              </FormField>
            </FormFields><br />
            <Button
              label='Submit'
              primary={true}
              type='submit'
              fill={true}
            />
          </Form>
        </Box>
      </GrommetApp>
    )
  }
}

export default withRouter(Create);
