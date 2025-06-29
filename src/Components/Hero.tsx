import Priyanka from '../assets/priyanka-Color.png';
import SplitText from '../Components/SplitText';
const Hero = () => {
    return (
        <>
            <style>
                {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
          }
        `}
            </style>

            <section
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    flex: '0 0 100vw',
                    background: 'linear-gradient(to right,rgb(0, 0, 0),rgb(8, 0, 17))',
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
                        position: 'absolute',
                        top: '-190px',
                        zIndex: 2,
                        fontSize: '15rem',
                    }}
                >
                    <SplitText
                        text="Priyanka_"
                        className=""
                        splitType="chars"
                        delay={250}
                        duration={0.6}
                        ease="power3.out"
                        from={{ opacity: 0, y: 50 }}
                        to={{ opacity: 1, y: 0 }}
                        textAlign="center"
                    />
                </div>


                <div
                    style={{
                        position: 'absolute',
                        bottom: '100px',
                        left: '60px',
                        maxWidth: '300px',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        zIndex: 2,
                    }}
                >
                    <ul>
                        <li>
                            <span style={{ fontWeight: 'bold' }}>
                                Proud of <br />
                            </span>
                            Architecting agent-based  AI in <br />Unity gaming platform <br />
                        </li>
                    </ul>
                </div>

                <img
                    src={Priyanka}
                    alt="Priyanka"
                    style={{
                        maxHeight: '70vh',
                        marginTop: '120px',
                        objectFit: 'contain',
                        borderRadius: '1rem',
                        zIndex: 2,
                        width: '100%',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '100px',
                        maxWidth: '300px',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        zIndex: 2,
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                        About
                    </h2>
                    <ul>
                        <li style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            Building smart, scalable apps with AI and cloud power
                        </li>

                    </ul>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '60px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle,rgb(42, 0, 82),rgb(40, 127, 240))',
                        animation: 'pulse 2s infinite',
                        zIndex: 2,
                    }}
                > <p style={{ margin: 0, transform: 'translateX(-100px) translateY(18px)' }}>"Call my PA"</p></div>
            </section>


        </>
    );
};

export default Hero;
