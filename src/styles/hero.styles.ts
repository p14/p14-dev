export const heroContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
};

export const heroWrapperStyles = {
  textAlign: 'center',
};

export const profileImageStyles = {
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '50%',
  height: {
    xs: 200,
    sm: 300,
  },
  my: 2,
  width: 'auto',
};

const heroHeadingStyles = {
  my: 1,
  textTransform: 'uppercase',
};

export const heroTitleStyles = {
  ...heroHeadingStyles,
  fontSize: {
    xs: '1.25rem',
    sm: '2rem',
  },
  fontWeight: {
    xs: 600,
  },
};

export const heroSubtitleStyles = {
  ...heroHeadingStyles,
  fontSize: {
    xs: '1rem',
    sm: '1.25rem',
  },
  fontWeight: {
    xs: 600,
  },
};

export const heroTextLinkStyles = {
  color: 'inherit',
  '&:hover': {
    color: '#636363',
  },
};

export const heroLinksWrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
  my: 1,
};
