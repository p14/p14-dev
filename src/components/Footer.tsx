import React from 'react'
import { Box, Typography } from '@mui/material';
import { footerLogoStyles } from '../styles/footer.styles';

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography component='h5' variant='h5' sx={footerLogoStyles}>
        P14.dev
      </Typography>
    </Box>
  );
};

export default Footer;
