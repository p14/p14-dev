import React from 'react'
import { Box, Container } from '@mui/material';
import { skillsCardWrapperStyles } from '../styles/skills.styles';
import SkillsCard from './cards/SkillsCard';

const Skills: React.FC = () => {
  const backEndSkills = [
    'NodeJS',
    'Express',
    'Inversify',
    'Ruby on Rails',
    'Python',
    'MongoDB',
    'PostgreSQL',
  ];

  const devOpsSkills = [
    'AWS S3',
    'Docker',
    'GitHub',
  ];

  const frontEndSkills = [
    'TypeScript',
    'JavaScript',
    'ReactJS',
    'Redux',
    'MaterialUI',
    'ChakraUI',
    'HTML5',
    'CSS3',
  ];

  return (
    <Container maxWidth='lg'>
      <Box sx={skillsCardWrapperStyles}>
        <SkillsCard
          imageAlt='hello world'
          imagePath='./assets/frontend.png'
          skills={frontEndSkills}
          title='Front-End Development'
        />
        <SkillsCard
          imageAlt='hello world'
          imagePath='./assets/backend.png'
          skills={backEndSkills}
          title='Back-End Development'
        />
        <SkillsCard
          imageAlt='hello world'
          imagePath='./assets/PFP2.jpg'
          skills={devOpsSkills}
          title='DevOps Engineering'
        />
      </Box>
    </Container>
  );
};

export default Skills;
