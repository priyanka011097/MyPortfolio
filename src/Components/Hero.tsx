// import { useState } from "react";
import Priyanka from "../assets/priyanka_new.png";
import SplitText from "../Components/SplitText";
// import ChatWidget from "../Components/ChatWidget";
import HoverReveal from "../Components/AdditionStyles/HoverReveal";
import CircularText from "../Components/AdditionStyles/CircularText";

const Hero = () => {
  // const [showChat, setShowChat] = useState(false);
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(5deg); }
            30% { transform: rotate(-5deg); }
            45% { transform: rotate(3deg); }
            60% { transform: rotate(-3deg); }
            75% { transform: rotate(2deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>

      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          flex: "0 0 100vw",
          background: "linear-gradient(to right,rgb(0, 0, 0),rgb(0, 26, 31))",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-210px",
            zIndex: 2,
            fontSize: "15rem",
          }}
        >
          <SplitText
            text="Priyanka"
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
        <a
          href="https://open.spotify.com/playlist/2MDMM1EPgbdxzQViDzWWuw?si=yGHFP3ZZRn-hgFGic4lrXA&pi=Ap5A_Pk_TiazJ"
          style={{ color: "#fff", textDecoration: "none" }}
          target="_blank"
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              left: "-30px",
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
        </a>

        <div
          style={{
            position: "absolute",
            bottom: "100px",
            left: "60px",
            maxWidth: "300px",
            fontSize: "1rem",
            lineHeight: "1.6",
            zIndex: 2,
          }}
        >
          <ul>
            <li>
              Proud of my own product <br />
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                <a
                  href="https://stopscrolling.life/"
                  target="_blank"
                  style={{ color: "#fff" }}
                  rel="noopener noreferrer"
                >
                  StopScrolling.life{" "}
                </a>
                <br />
              </span>
              and other. <br />
            </li>
          </ul>
        </div>
        <div className="hover-wrapper">
          <img
            src={Priyanka}
            alt="Priyanka"
            className="priyanka-img"
            style={{
              width: "100%",
              objectFit: "contain",
              borderRadius: "1rem",
              zIndex: 2,
              position: "relative",
            }}
          />
          <HoverReveal />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "100px",
            right: "50px",
            maxWidth: "300px",
            fontSize: "1rem",
            lineHeight: "1.6",
            zIndex: 2,
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            What I do
          </h2>
          <ul>
            <li style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              Engineering Bold Ideas Into Scalable Products With Lasting Social
              Impact.
            </li>
          </ul>
        </div>
        <div>
          {/* <button
            onClick={() => setShowChat((prev) => !prev)}
            style={{
              position: "absolute",
              bottom: "40px",
              right: "50px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              background:
                "radial-gradient(circle, rgb(255, 255, 255), rgb(0, 247, 255))",
              animation: "pulse 3s infinite",
              cursor: "pointer",
              zIndex: 2,
              boxShadow: "0 0 20px rgba(0, 247, 255, 0.)",
            }}
            aria-label="Schedule a Call"
          >
            {" "}
          </button> */}
          {/* <span
            style={{
              position: "absolute",
              whiteSpace: "nowrap",
              bottom: "50px",
              right: "110px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Schedule a Call
          </span> */}
          {/* {showChat && <ChatWidget />} */}
        </div>
      </section>
    </>
  );
};

export default Hero;
