import React from 'react';
import axios from 'axios';

import 'grommet/scss/hpinc/index.scss';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
      acceptedPosts: []
    }

    this.getMyPosts = this.getMyPosts.bind(this);
  }

  componentDidMount() {
    this.getMyPosts();
  }

  getMyPosts() {
    axios.get('/myPosted/jobs')
    .then((results) => {
      this.setState({
        myPosts: results.data
      })
    })
    .catch((error) => {
      throw error;
    })
  }

  render() {
    return (<GrommetApp>
      <Box direction='row' algin='center' justify='center'>
        <Box basis='1/2' align='start'>
          <Label>My Posted Jobs</Label>
          {this.state.myPosts.map((post) =>
            <Tiles selectable={true} flush={false} onSelect={() => console.log('works')}>
              <Tile separator='top' align='start' basis='1/2'>
                <Header
                  size='small'
                  pad={{"horizontal" : "small"}}>
                  <Heading tag='h4' strong={true} margin='none'>
                    {post.address}
                  </Heading>
                </Header>
                <Box pad='small'>
                  <Paragraph margin='none'>
                    {post.brief}
                  </Paragraph>
                </Box>
              </Tile>
            </Tiles>
        )}
        </Box>
        <Box basis='1/2' align='end' >
          <Label>Jobs Claimed</Label>

        </Box>
      </Box>
    </GrommetApp>)
  }
}

export default MyJobs;
