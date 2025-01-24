import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { GitHub, LinkedIn, Send } from '@mui/icons-material';
import heroStyles from '../styles/hero.styles';

const Hero: React.FC = () => {
    const currentJob = (
        <Typography component='a' href='https://foliahealth.com' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
            Folia Health
        </Typography>
    );

    const buttonInfo = [
        { Icon: GitHub, href: 'https://github.com/p14', title: 'GitHub' },
        { Icon: LinkedIn, href: 'https://linkedin.com/in/p14', title: 'LinkedIn' },
        { Icon: Send, href: 'mailto:hello@p14.dev', title: 'Email' },
    ];

    return (
        <Container maxWidth='md' sx={heroStyles.container}>
            <Box sx={heroStyles.wrapper}>
                <Box
                    component='img'
                    src='./assets/profile.jpg'
                    alt='A head shot of Joseph in Chicago, Illinois'
                    sx={heroStyles.profileImage}
                />

                <Typography component='h1' variant='h4' sx={heroStyles.title}>
                    Joseph Perez
                </Typography>

                <Typography component='h2' variant='h6' sx={heroStyles.subtitle}>
                    Software Engineer
                </Typography>

                <Typography variant='body1' color='inherit'>
                    I am based out of Charleston, SC and I am working full-time at {currentJob}.
                    I primarily focus on web systems and infrastructure, but love learning about different technologies and paradigms.
                    Outside of tech, I enjoy capturing life through film photography and exploring local vintage record / book shops.
                </Typography>

                <Box sx={heroStyles.linksWrapper}>
                    {buttonInfo.map((info) => (
                        <Tooltip title={info.title}>
                            <IconButton color='inherit' href={info.href} target='_blank' rel='noopener noreferrer' sx={heroStyles.link}>
                                <info.Icon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Hero;
