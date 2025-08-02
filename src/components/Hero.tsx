import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { GitHub, LinkedIn, Send } from '@mui/icons-material';
import heroStyles from '../styles/hero.styles';

const Hero: React.FC = () => {
    const currentJob = (
        <Typography component='a' href='https://foliahealth.com' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
            Folia Health
        </Typography>
    );

    const freelanceJob = (
        <Typography component='a' href='https://greygiant.com' target='_blank' rel='noopener noreferrer' sx={heroStyles.textLink}>
            Grey Giant Technologies
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
                <Typography component='h1' variant='h4' sx={heroStyles.title}>
                    Joseph Perez
                </Typography>

                <Typography component='h2' variant='h6' sx={heroStyles.subtitle}>
                    Software Engineer
                </Typography>

                <Typography variant='body1' color='inherit'>
                    I am a software engineer based in Charleston, SC.
                    I work full-time at {currentJob} and I do freelance web development at {freelanceJob}.
                    Outside of tech, I enjoy capturing life through film photography and exploring vintage record stores & book shops.
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
