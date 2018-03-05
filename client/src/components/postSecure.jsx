import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import MapComponent from './map.jsx';

import 'grommet/scss/hpinc/index.scss';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Label from 'grommet/components/Label';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import MoneyIcon from 'grommet/components/icons/base/Money';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import Form from 'grommet/components/Form';
import Layer from 'grommet/components/Layer';

class PostSecure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      claimed: false,
      showLayer: false,
      postId: null
    }

    this.claimJob = this.claimJob.bind(this);
    this.checkConfirmation = this.checkConfirmation.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
  }

  claimJob() {
    axios.post('/claim', {postId: this.state.postId})
    .then(() => {
      this.setState({
        claimed: true
      })
    })
    .catch((error) => {
      throw error;
    })
  }

  checkConfirmation() {
    this.setState({
      cofirmed: true
    }, this.claimJob())
  }

  openConfirmation() {
    this.setState({
      showLayer: true
    })
  }

  render() {
    let showLayer;
    if (this.state.claimed === true) {
      return (<Redirect to={'/my/jobs'} />)
    }

    if (this.state.showLayer === true) {
      showLayer =
      <Layer
        flush={false}
        overlayClose={true}
        closer={true}
        onClose={() => this.setState({showLayer: false})}
        >
        <Box pad='medium' align='center'>
          <Form onSubmit={this.checkConfirmation}>
            <Header>
              <Headline>
                Please Confirm
              </Headline>
            </Header>
              <Label>
                Are you sure you want to claim this job?
              </Label> <br />
              <Button
                label='Confirm'
                primary={true}
                type='submit'
              />
          </Form>
        </Box>
      </Layer>;
    }
    return (
      <GrommetApp>
        {showLayer}
        <Accordion animate={false}>
          {this.props.posts.map((post, i) =>
              <AccordionPanel heading={post.brief} key={i}>
              <Header>
                <Headline>Job Description</Headline>
                <Button type='button' primary={true} onClick={() => this.setState({postId: post.id}, this.openConfirmation())}>Claim Job!</Button>
              </Header>
              <Label>Where</Label>
                <Paragraph>{post.address}</Paragraph>
              <Label>Job details</Label>
                <Paragraph>{post.detailed}</Paragraph>
              <Label>Minimum Payment</Label>
                <Value icon={<MoneyIcon />}value={post.payment} units='Dollars'/>
              <Label>Pictures</Label>
              <img src={post.image} />
              <Label>Location on the Map</Label>
              <MapComponent lat={parseFloat(post.lat)} lng={parseFloat(post.lng)}/>
            </AccordionPanel>
          )}
        </Accordion>
      </GrommetApp>
    )
  }
}

export default withRouter(PostSecure);
