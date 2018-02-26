import React from 'react';
import ReactDOM from 'react-dom';

import 'grommet/scss/vanilla/index.scss';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Anchor from 'grommet/components/Anchor';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Box flex={true} justify='end' direction='row' response={false}>
        <Header size='small' fixed={false} splash={false}>
          <Title>
            OddJobs
          </Title>
        </Header>
        <Search inline={true} fill={true} size='medium' placeHolder='Search' dropAlign={{"right" : "right"}}/>
        <Menu icon={<MenuIcon />} dropAlign={{"right" : "right"}}>
          <Anchor href='#' className='active'>
            Login
          </Anchor>
          <Anchor href='#'>
            Sign Up
          </Anchor>
          <Anchor href='#'>
            My Jobs
          </Anchor>
        </Menu>
      </Box>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
