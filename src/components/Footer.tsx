import React from 'react'
import { Box, Typography } from '@mui/material';
import * as footerStyles from '../styles/footer.styles';

const Footer: React.FC = () => {
  return (
    <Box sx={footerStyles.wrapper}>
      <Typography component='h5' variant='h5' sx={footerStyles.logo}>
        P14.dev
      </Typography>
    </Box>
  );
};

export default Footer;
