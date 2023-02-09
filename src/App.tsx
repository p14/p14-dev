import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import { standardFont } from './styles/global.styles';

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: standardFont,
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero />
    </ThemeProvider>
  );
}

export default App;
