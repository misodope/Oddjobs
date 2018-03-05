import React from 'react';
import { Switch, Link, Redirect, withRouter } from 'react-router-dom';
import AppFooter from './footer.jsx';
import axios from 'axios';

import MapComponent from './map.jsx';
import PostSecure from './postSecure.jsx';

import 'grommet/scss/hpinc/index.scss';
import GrommetApp from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Anchor from 'grommet/components/Anchor';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Label from 'grommet/components/Label';


class AppSecure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'New York, NY',
      search: '',
      posts: [],
      successfulSearch: false,
      loading: true,
      loggingOut: false,
      showLayer: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchEnter = this.onSearchEnter.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.logoutLayer = this.logoutLayer.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 1800)
  }

  onSearchChange(query) {
    this.setState({
      search: query
    })
  }

  onSearchEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      axios.post('/search/posts',{query: this.state.search})
      .then((results) => {
        this.setState({
          posts: results.data,
          successfulSearch: true
        })
      })
      .catch((error) => {
        console.log("Didn't work!", error);
      })
    }
  }

  onLogout() {
    axios.post('/logout')
    .then(() => {
      this.setState({
        loggingOut: true
      })
    })
    .catch((error) => {
      throw error;
    })
  }

  logoutLayer() {
    this.setState({
      showLayer: true
    })
  }

  render() {
    if (this.state.loading === true) {
      return (<Spinning size='xlarge' style={{display:'block', margin: 'auto', top:'0', bottom:'0', left:'0', right:'0', position:'absolute'}}/>)
    }

    let showLayer;
    if (this.state.showLayer === true) {
      showLayer =
      <Layer
        flush={false}
        overlayClose={true}
        closer={true}
        onClose={() => this.setState({showLayer: false})}
        >
        <Box pad='medium' align='center'>
          <Form onSubmit={this.onLogout}>
            <Header>
              <Headline>
                Logging Out
              </Headline>
            </Header>
              <Label>
                Are you sure you want to logout?
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

    if (this.state.loggingOut === true) {
      return (<Redirect to='/' />)
    }

    let mainRender;
    if (this.state.successfulSearch === true) {
      mainRender =
      <div>
        <PostSecure posts={this.state.posts}/>
      </div>
    } else {
      mainRender =
      <div>
        <Hero background={<Image src="http://www.handymanbc.ca/wp-content/uploads/2016/06/peak-services-icons.png"
          fit='contain'
          full={true} />}
          backgroundColorIndex='dark'
          size='medium'
        >
          <Box
            direction='row'
            align='center'
            justify='center'
            id='heroBox1'
            >
            <Box
              basis='1/2'
              align='end'
              pad='medium'
              >
            <Link to={'/signupPage'}>
              <Button
                label="Get Started"
                primary={true}
                onClick={() => console.log('Placeholder 1')}
              />
            </Link>
            </Box>
            <Box
              basis='1/2'
              align='start'
              pad='medium'
              >
              <Link to={'/job/create'}>
                <Button
                  label="Create Job"
                  primary={true}
                  onClick={() => console.log('Placeholder 2')}
                />
              </Link>
            </Box>
          </Box>
        </Hero>
        <AppFooter/>
      </div>;
    }

    return (
      <GrommetApp>
        {showLayer}
        <Box flex={true} justify='end' direction='row' >
          <Header size='small' fixed={false} splash={false}>
            <Title>
              OddJobs
            </Title>
          </Header>
          <Search
            onDOMChange={(e) => this.onSearchChange(e.target.value)}
            onKeyPress={this.onSearchEnter}
            inline={true}
            size='medium'
            placeHolder='Search'
            fill={true}
            dropAlign={{"right" : "right"}}
          />
          <Search
            inline={true}
            size='medium'
            placeHolder='Where'
            fill={true}
            dropAlign={{"right" : "right"}}
          />
          <Menu
            icon={<MenuIcon />}
            dropAlign={{"right" : "right"}}
            >
            <Anchor href='/my/jobs'>
              <Link to={'/my/jobs'}>
                My Jobs
              </Link>
            </Anchor>
            <Anchor href='/job/create'>
              <Link to={'/job/create'}>
                Create Job
              </Link>
            </Anchor>
            <Anchor onClick={this.logoutLayer}>
              Logout
            </Anchor>
          </Menu>
        </Box>
        {mainRender}
      </GrommetApp>
    )
  }
}

export default withRouter(AppSecure);
