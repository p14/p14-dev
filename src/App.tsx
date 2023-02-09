import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Hero from './components/Hero';
import { standardFont } from './styles/global.styles';
import Footer from './components/Footer';

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: standardFont,
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Hero />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
