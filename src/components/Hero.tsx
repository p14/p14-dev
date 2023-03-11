import React from 'react'
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { GitHub, LinkedIn, Send } from '@mui/icons-material';
import * as heroStyles from '../styles/hero.styles';

const Hero: React.FC = () => {
  const currentJob = (
    <Typography component='a' href='https://inquired.org' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
      inquirED
    </Typography>
  );

  return (
    <Container maxWidth='md' sx={heroStyles.container}>
      <Box sx={heroStyles.wrapper}>
        <Box
          component='img'
          src='./assets/profile.jpg'
          alt='A head shot of Joseph in Chicago, Illinois'
          sx={heroStyles.profileImage}
        />

        <Typography component='h4' variant='h4' sx={heroStyles.title}>
          Joseph Perez
        </Typography>

        <Typography component='h6' variant='h6' sx={heroStyles.subtitle}>
          Freelance Software Developer
        </Typography>

        <Typography variant='body1' color='inherit'>
          I'm based out of Seattle, Washington and I'm currently working at {currentJob}.
          I have a passion for building creative and functional websites.
          I focus on writing scalable code and data solutions.
          When I'm not coding, I enjoy capturing the Pacific Northwest through film photography.
        </Typography>

        <Box sx={heroStyles.linksWrapper}>
          <Tooltip title='GitHub'>
            <IconButton color='inherit' href='https://github.com/p14' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
              <GitHub fontSize='large' />
            </IconButton>
          </Tooltip>
          <Tooltip title='LinkedIn'>
            <IconButton color='inherit' href='https://linkedin.com/in/p14' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
              <LinkedIn fontSize='large' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Email'>
            <IconButton color='inherit' href='mailto:hello@p14.dev' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
              <Send fontSize='large' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
