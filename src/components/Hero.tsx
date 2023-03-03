import React from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material';
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
          Web Developer & Photographer
        </Typography>

        <Typography variant='body1' color='black'>
          I'm based out of Seattle, Washington and I'm currently working at {currentJob}.
          I have a passion for building creative and functional websites.
          I focus on writing efficient, maintainable, and scalable code.
          When I'm not coding, I enjoy capturing the Pacific Northwest through film photography.
        </Typography>

        <Box sx={heroStyles.linksWrapper}>
          <IconButton color='inherit' href='https://github.com/p14' target='_blank' rel='noopener noreferrer'>
            <GitHub fontSize='large' />
          </IconButton>
          <IconButton color='inherit' href='https://linkedin.com/in/perezident14' target='_blank' rel='noopener noreferrer'>
            <LinkedIn fontSize='large' />
          </IconButton>
          <IconButton color='inherit' href='mailto:hello@p14.dev' target='_blank' rel='noopener noreferrer'>
            <Send fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
