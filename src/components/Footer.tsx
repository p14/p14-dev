import React from 'react'
import { Box, Typography } from '@mui/material';
import { footerLogoStyles, footerWrapperStyles } from '../styles/footer.styles';

const Footer: React.FC = () => {
  return (
    <Box sx={footerWrapperStyles}>
      <Typography component='h5' variant='h5' sx={footerLogoStyles}>
        P14.dev
      </Typography>
    </Box>
  );
};

export default Footer;
