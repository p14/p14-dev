import React from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material';
import { GitHub, LinkedIn, Send } from '@mui/icons-material';
import { heroHeadingStyles, heroLinksWrapperStyles, heroWrapperStyles, profileImageStyles, heroContainerStyles } from '../styles/hero.styles';

const Hero: React.FC = () => {
  return (
    <Container maxWidth='md' sx={heroContainerStyles}>
      <Box sx={heroWrapperStyles}>
        <Box
          component='img'
          src='./assets/PFP2.jpg'
          alt='A head shot of Joseph in Chicago, Illinois'
          sx={profileImageStyles}
        />

        <Typography component='h4' variant='h4' sx={heroHeadingStyles}>
          Joseph Perez
        </Typography>

        <Typography component='h6' variant='h6' sx={heroHeadingStyles}>
          Web Developer & Photographer
        </Typography>

        <Typography variant='body1' color='black'>
          I have a passion for creating creative and functional websites.
          I focus on writing efficient, maintainable, scalable, and easy to read code.
          When I am not coding, I enjoy capturing the Pacific Northwest through film photography.
        </Typography>

        <Box sx={heroLinksWrapperStyles}>
          <IconButton color='inherit' href='https://github.com/p14' target='_blank' rel='noopener noreferrer'>
            <GitHub fontSize='large' />
          </IconButton>
          <IconButton color='inherit' href='https://linkedin.com/in/perezident14' target='_blank' rel='noopener noreferrer'>
            <LinkedIn fontSize='large' />
          </IconButton>
          <IconButton color='inherit' href='mailto:joseph@p14.dev' target='_blank' rel='noopener noreferrer'>
            <Send fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
