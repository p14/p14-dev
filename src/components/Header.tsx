import React from 'react'
import { AppBar, Button, Container, Divider, Toolbar, Typography } from '@mui/material';
import { appBarStyles, toolBarStyles, headingStyles } from '../styles/header.styles';

const Header: React.FC = () => {
  return (
    <AppBar color='inherit' position='fixed' sx={appBarStyles}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={toolBarStyles}>
          <Typography component='h4' variant='h4' sx={headingStyles}>
            P14.dev
          </Typography>
          <Button href='mailto:joseph@p14.dev' variant='contained'>
            Contact
          </Button>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
};

export default Header;
