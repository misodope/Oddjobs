import React from 'react';

import 'grommet/scss/hpinc/index.scss';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Title from 'grommet/components/Title'
import Footer from 'grommet/components/Footer';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer justify='between' separator='top'>
        <Box direction='row' align='center' pad={{ "between" : "medium"}}>
          <Paragraph margin='none'>
            © 2018 Jerry Chen - OddJobs
          </Paragraph>
        </Box>
      </Footer>
    )
  }
}

export default AppFooter;
