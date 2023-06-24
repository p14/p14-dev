import React from 'react'
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { GitHub, LinkedIn, Send } from '@mui/icons-material';
import * as heroStyles from '../styles/hero.styles';

const Hero: React.FC = () => {
    const currentJob = (
        <Typography component='a' href='https://inquired.org' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
            inquirED
        </Typography>
    );

    const mentorship = (
        <Typography component='a' href='https://bobatalks.com' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
            Boba Talks
        </Typography>
    );

    return (
        <Container maxWidth='md' sx={heroStyles.container}>
            <Box sx={heroStyles.wrapper}>
                <Box
                    component='img'
                    src='./assets/profile.jpg'
                    alt='A head shot of Joseph in Chicago, Illinois'
                    sx={heroStyles.profileImage}
                />

                <Typography component='h4' variant='h4' sx={heroStyles.title}>
                    Joseph Perez
                </Typography>

                <Typography component='h6' variant='h6' sx={heroStyles.subtitle}>
                    Software Engineer
                </Typography>

                <Typography variant='body1' color='inherit'>
                    I am based out of Charleston, SC and I am working full-time at {currentJob}.
                    I have a passion for building creative websites with scalable code and robust data solutions.
                    I also provide 1-on-1 software engineering mentorship with {mentorship}.
                    Outside of tech, I enjoy capturing the East Coast through film photography and exploring local vintage shops.
                </Typography>

                <Box sx={heroStyles.linksWrapper}>
                    <Tooltip title='GitHub'>
                        <IconButton color='inherit' href='https://github.com/p14' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
                            <GitHub fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='LinkedIn'>
                        <IconButton color='inherit' href='https://linkedin.com/in/p14' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
                            <LinkedIn fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Email'>
                        <IconButton color='inherit' href='mailto:hello@p14.dev' target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
                            <Send fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Container>
    );
};

export default Hero;
