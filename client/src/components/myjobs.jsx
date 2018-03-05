import React from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import 'grommet/scss/hpinc/index.scss';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
      acceptedPosts: [],
      claimedPosts: []
    }

    this.getMyPosts = this.getMyPosts.bind(this);
    this.getMyClaimed = this.getMyClaimed.bind(this);
  }

  componentDidMount() {
    this.getMyPosts();
    this.getMyClaimed();
  }

  getMyPosts() {
    axios.get('/myPosted/jobs').then((results) => {
      this.setState({myPosts: results.data})
    }).catch((error) => {
      throw error;
    })
  }

  getMyClaimed() {
    axios.get('/myClaimed/jobs').then((results) => {
      this.setState({claimedPosts: results.data})
    }).catch((error) => {
      throw error;
    })
  }

  render() {
    return (<GrommetApp>
      <Box align='start'>
        <Menu responsive={true} inline={true} size='large' closeOnClick={false} primary={false}>
          <Anchor>
            <Link to={'/secure'}>
              Back
            </Link>
          </Anchor>
          <Anchor>
            <Link to={'/job/create'}>
              Create Jobs
            </Link>
          </Anchor>
        </Menu>
        <Box direction='row' algin='center' justify='center'>
          <Box basis='1/2' align='start'>
            <Label>My Posted Jobs</Label>
            {
              this.state.myPosts.map((post) => <Tiles selectable={true} flush={false} onSelect={() => console.log('works')}>
                <Tile separator='top' align='end' basis='1/2'>
                  <Header size='small' pad={{
                      "horizontal" : "small"
                    }}>
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
              </Tiles>)
            }
          </Box>
          <Box basis='1/2' align='start'>
            <Label>Jobs Claimed</Label>
            {
              this.state.claimedPosts.map((post) => <Tiles selectable={true} flush={false} onSelect={() => console.log('works')}>
                <Tile separator='top' align='end' basis='1/2'>
                  <Header size='small' pad={{
                      "horizontal" : "small"
                    }}>
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
              </Tiles>)
            }
          </Box>
        </Box>
      </Box>
    </GrommetApp>)
  }
}

export default withRouter(MyJobs);
