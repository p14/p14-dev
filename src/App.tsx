import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';

const App: React.FC = () => {
  return (
    <Box>
      <Header />
      <Hero />
      <Skills />
    </Box>
  );
}

export default App;
