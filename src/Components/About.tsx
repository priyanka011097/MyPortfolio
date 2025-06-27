import CircularText from '../Components/AdditionStyles/CircularText';
import twitterIcon from '../assets/icons/twitter.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import facebookIcon from '../assets/icons/facebook.svg';

const About = () => {
    return (
        <>
            <section
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    flex: '0 0 100vw',
                    background: 'linear-gradient(to left,rgb(73, 70, 70),rgb(8, 0, 17))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {/* Move to top-left */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            zIndex: 10,
                        }}
                    >
                        <CircularText
                            text="CLICK*FOR*MY*PLAYLIST*  *"
                            onHover="speedUp"
                            spinDuration={20}
                            className="custom-class"
                        />
                    </div>

                    {/* Social media buttons bottom-right */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            right: '40px',
                            display: 'flex',
                            gap: '16px',
                            zIndex: 10,
                        }}
                    >
                        <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" width="30" height="30" style={{ filter: 'invert(100%) brightness(200%)' }} />
                        </a>
                        <a href="https://instagram.com/your_handle" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" width="30" height="30" style={{ filter: 'invert(100%) brightness(200%)' }} />
                        </a>
                        <a href="https://youtube.com/your_channel" target="_blank" rel="noopener noreferrer">
                            <img src={youtubeIcon} alt="YouTube" width="30" height="30" style={{ filter: 'invert(100%) brightness(200%)' }}/>
                        </a>
                        <a href="https://facebook.com/your_handle" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" width="30" height="30" style={{ filter: 'invert(100%) brightness(200%)' }} />
                        </a>
                    </div>

                </div>
            </section>
        </>
    );
};

export default About;
