import { SxProps } from '@mui/material';

const scriptFont = [
    'Covered By Your Grace',
    'sans-serif',
].join(', ');

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
    scriptFont,
    standardFont,
    mainContainer,
};
