import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import { projectsCardWrapperStyles } from '../styles/projects.styles';
import ProjectCard from './cards/ProjectCard';
import { scriptFont } from '../styles/global.styles';

const Projects: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ backgroundColor: 'red' }}>
      <Typography variant='h4' sx={{ fontFamily: scriptFont }}>
        Portfolio:
      </Typography>
      <Box sx={projectsCardWrapperStyles}>
        <ProjectCard
          demoLink='https://github.com/p14'
          description='this is the description of this project built with this technology'
          imageAlt='hello world'
          imagePath='./assets/design.png'
          sourceCodeLink='https://github.com/p14'
          title='project title'
        />
        <ProjectCard
          demoLink='https://github.com/p14'
          description='this is the description of this project built with this technology'
          imageAlt='hello world'
          imagePath='./assets/design.png'
          sourceCodeLink='https://github.com/p14'
          title='project title'
        />
        <ProjectCard
          demoLink='https://github.com/p14'
          description='this is the description of this project built with this technology'
          imageAlt='hello world'
          imagePath='./assets/design.png'
          sourceCodeLink='https://github.com/p14'
          title='project title'
        />
      </Box>
    </Container>
  );
};

export default Projects;
