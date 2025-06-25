import PixelTrail from '../Components/AdditionStyles/PixelTrail';
const About = () => {
    return (
        <>

            <section
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    flex: '0 0 100vw',
                    background: 'linear-gradient(to left,rgb(0, 0, 0),rgb(8, 0, 17))',
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
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    {/* PixelTrail only in this section */}
                    <PixelTrail
                        gooeyFilter={{ id: 'goo', strength: 10 }}
                        color="#ffffff"
                        className="pixel-overlay"
                    />

                    
                </div>

            </section>

        </>
    );
};

export default About;
