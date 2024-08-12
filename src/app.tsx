import { Container, ThemeProvider, createTheme } from '@mui/material';
import Hero from './components/Hero';
import appStyles from './styles/global.styles';

const App: React.FC = () => {
    const theme = createTheme({
        typography: {
            fontFamily: appStyles.standardFont,
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='lg' sx={appStyles.mainContainer}>
                <Hero />
            </Container>
        </ThemeProvider>
    );
}

export default App;
