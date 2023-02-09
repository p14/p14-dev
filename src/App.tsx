import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { appContainerStyles, standardFont } from './styles/global.styles';

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: standardFont,
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={appContainerStyles}>
        <Hero />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
