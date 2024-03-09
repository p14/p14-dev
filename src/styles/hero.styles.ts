import { SxProps } from '@mui/material';

const container: SxProps = {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
};

const wrapper: SxProps = {
    textAlign: 'center',
};

const profileImage: SxProps = {
    borderRadius: '50%',
    height: {
        xs: 200,
        sm: 300,
    },
    my: 2,
    width: 'auto',
};

const heading: SxProps = {
    letterSpacing: '2px',
    my: 1,
    textTransform: 'uppercase',
};

const title: SxProps = {
    ...heading,
    fontSize: {
        xs: '1.25rem',
        sm: '2rem',
    },
    fontWeight: {
        xs: 600,
    },
};

const subtitle: SxProps = {
    ...heading,
    color: '#669bbc',
    fontSize: {
        xs: '1rem',
        sm: '1.25rem',
    },
    fontWeight: {
        xs: 600,
    },
};

const textLink: SxProps = {
    color: 'inherit',
    '&:hover': {
        color: '#c1121f',
    },
};

const linksWrapper: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    my: 1,
};

const link: SxProps = {
    '&:hover': {
        color: '#c1121f',
    },
};

export default {
    container,
    wrapper,
    profileImage,
    title,
    subtitle,
    textLink,
    linksWrapper,
    link,
};
