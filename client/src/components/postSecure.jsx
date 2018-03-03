import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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

class PostSecure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postAddress: '209 14th Street, Hoboken NJ',
      postLat: null,
      postLng: null,
      confirmed: false,
      claimed: false,
      showLayer: false
    }

    this.claimJob = this.claimJob.bind(this);
  }

  claimJob() {
    axios.post('/claim')
    .then(() => {
      this.setState({
        claimed: true
      })
    })
    .catch((error) => {
      throw error;
    })
  }

  showConfirmation() {
    this.setState({
      cofirmed: true
    }, this.claimJob())
  }

  render() {
    let showLayer;
    if (this.state.claimed === true) {
      return (<Redirect to={'/my/jobs'} />)
    } else if (this.state.showLayover === true) {
      showLayer = <Layer></Layer>
    }
    return (
      <GrommetApp>
        <Accordion animate={false}>
          {this.props.posts.map((post, i) =>
              <AccordionPanel heading={post.brief} key={i}>
              <Header>
                <Headline>Job Description</Headline>
                <Button type='button' primary={true} onClick={() => console.log('Claimed!')}>Claim</Button>
              </Header>
              <Label>Where</Label>
                <Paragraph>{post.address}</Paragraph>
              <Label>Job details</Label>
                <Paragraph>{post.detailed}</Paragraph>
              <Label>Minimum Payment</Label>
                <Value icon={<MoneyIcon />}value={post.payment} units='Dollars'/>
              <Label>Pictures</Label>
              <Image src={post.image} />
              <MapComponent lat={parseFloat(post.lat)} lng={parseFloat(post.lng)}/>
            </AccordionPanel>
          )}
        </Accordion>
      </GrommetApp>
    )
  }
}

export default PostSecure;
