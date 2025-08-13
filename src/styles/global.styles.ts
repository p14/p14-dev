import { SxProps } from '@mui/material';

const standardFont = [
    'Montserrat',
    'sans-serif',
].join(', ');

const mainContainer: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
};

export default {
    standardFont,
    mainContainer,
};
