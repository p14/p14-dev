import { SxProps } from '@mui/material';

const standardFont = [
    'Montserrat',
    'sans-serif',
].join(', ');

const mainContainer: SxProps = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
};

export default {
    standardFont,
    mainContainer,
};
