import React from 'react';
import { Link } from 'react-router-dom';
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

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postAddress: '209 14th Street, Hoboken NJ',
      postLat: null,
      postLng: null
    }

    this.onClickPanel = this.onClickPanel.bind(this);
  }

  onClickPanel() {
    axios.get('/job/location', {params: {address: this.state.postAddress}})
    .then((results) =>{
      this.setState({
        postLat: results.data.lat,
        postLng: results.data.lng
      });
    })
    .catch((error) => {
      console.log("There was an error getting coordinates", error)
    })
  }

  render() {
    return (
      <GrommetApp>
        <Accordion onActive={this.onClickPanel} animate={false}>
          {this.props.posts.map((post, i) =>
              <AccordionPanel heading={post.brief} key={i}>
              <Header>
                <Headline>Job Description</Headline>
              </Header>
              <Label>Where</Label>
                <Paragraph>{post.address}</Paragraph>
              <Label>Job details</Label>
                <Paragraph>{post.detailed}</Paragraph>
              <Label>Minimum Payment</Label>
                <Value icon={<MoneyIcon />}value={post.payment} units='Dollars'/>
              <Label>Pictures</Label>
              <img src={post.image} />
              <MapComponent lat={parseFloat(post.lat)} lng={parseFloat(post.lng)}/>
            </AccordionPanel>
          )}
        </Accordion>
      </GrommetApp>
    )
  }
}

export default Post;
