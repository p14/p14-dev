import { useState } from 'react';

const Hero: React.FC = () => {
    const [bear, setBear] = useState<string>('ʕ•ᴥ• ʔ');

    const currentJob = (
        <a href='https://www.collegeboard.org' target='_blank' rel='noopener noreferrer'>
            The College Board
        </a>
    );

    const freelanceJob = (
        <a href='https://greygiant.com' target='_blank' rel='noopener noreferrer'>
            Grey Giant Technologies
        </a>
    );

    const dot = (
        <span style={{ color: 'limegreen' }}>●</span>
    );

    const handleBearClick = (): void => {
        setBear('ʕ•̀ᴥ•́ ʔ');
        setTimeout(() => { setBear('ʕ•ᴥ• ʔ'); }, 2500);
    };

    return (
        <div className='hero-container'>
            <div className='hero-header'>
                <span>~/p14.dev</span>
                <span>{dot} charleston, sc</span>
            </div>

            <div className='hero-body'>
                <p>
                    My name is Joseph Perez and I am a software engineer.
                </p>

                <p>
                    I work full-time at {currentJob} and I do freelance web development at {freelanceJob}.
                </p>

                <p>
                    Outside of tech, I enjoy capturing life through film photography and exploring vintage record stores & book shops.
                </p>
            </div>

            <div className='hero-footer'>
                <div>
                    <a color='inherit' href='https://github.com/p14' target='_blank' rel='noopener noreferrer'>
                        GitHub
                    </a>

                    <span className='link-divider'>
                        |
                    </span>

                    <a color='inherit' href='https://linkedin.com/in/p14' target='_blank' rel='noopener noreferrer'>
                        LinkedIn
                    </a>

                    <span className='link-divider'>
                        |
                    </span>

                    <a color='inherit' href='mailto:hello@p14.dev' target='_blank' rel='noopener noreferrer'>
                        Email
                    </a>
                </div>

                <span className='emoticon' onClick={handleBearClick}>
                    {bear}
                </span>
            </div>
        </div>
    );
};

export default Hero;
