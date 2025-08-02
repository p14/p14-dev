import { SxProps } from '@mui/material';

const accentColor = '#e7a597';

const hoverColor = '#e7a597';

const container: SxProps = {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
};

const wrapper: SxProps = {
    textAlign: 'center',
    py: 2,
};

const heading: SxProps = {
    letterSpacing: '2px',
    my: 1,
    textTransform: 'uppercase',
};

const title: SxProps = {
    ...heading,
    fontSize: '2rem',
    fontWeight: {
        xs: 600,
    },
};

const subtitle: SxProps = {
    ...heading,
    color: accentColor,
    fontSize: '1.25rem',
    fontWeight: {
        xs: 600,
    },
};

const textLink: SxProps = {
    color: 'inherit',
    '&:hover': {
        color: hoverColor,
    },
};

const linksWrapper: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    my: 1,
};

const link: SxProps = {
    '&:hover': {
        color: hoverColor,
    },
};

export default {
    container,
    wrapper,
    title,
    subtitle,
    textLink,
    linksWrapper,
    link,
};
