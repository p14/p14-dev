export const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
};

export const wrapper = {
    textAlign: 'center',
};

export const profileImage = {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    height: {
        xs: 200,
        sm: 300,
    },
    my: 2,
    width: 'auto',
};

const heading = {
    letterSpacing: '2px',
    my: 1,
    textTransform: 'uppercase',
};

export const title = {
    ...heading,
    fontSize: {
        xs: '1.25rem',
        sm: '2rem',
    },
    fontWeight: {
        xs: 600,
    },
};

export const subtitle = {
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

export const textLink = {
    color: 'inherit',
    '&:hover': {
        color: '#c1121f',
    },
};

export const linksWrapper = {
    display: 'flex',
    justifyContent: 'center',
    my: 1,
};

export const link = {
    '&:hover': {
        color: '#c1121f',
    },
}
