
import twitterIcon from "../assets/icons/twitter.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import youtubeIcon from "../assets/icons/youtube.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import mediumIcon from "../assets/icons/medium.svg";
import CircularGallery from "../Components/AdditionStyles/CircularGallery";
import SpotlightCard from "../Components/AdditionStyles/SpotlightCard";

const About = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          flex: "0 0 100vw",
          background: "linear-gradient(to left,rgb(0, 0, 0),rgb(0, 26, 31))",
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
            display: "flex",
            top: "150px",
            left: "200px",
            zIndex: 10,
          }}
        >
          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
            github
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
            leetcode
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
            hackerrack
          </SpotlightCard>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "300px",
              left: "50px",
              zIndex: 10,
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Education
            </h2>

            <ul style={{ paddingLeft: "1.2rem", marginLeft: "25px" }}>
              <li
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    color: "#007BFF",
                    fontWeight: "bold",
                    position: "relative",
                  }}
                  onMouseEnter={() => {
                    const el = document.getElementById("diploma-img");
                    if (el) el.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    const el = document.getElementById("diploma-img");
                    if (el) el.style.display = "none";
                  }}
                >
                  Diploma
                </span>{" "}
                &
                <span
                  style={{
                    color: "#007BFF",
                    fontWeight: "bold",
                    position: "relative",
                    marginLeft: "4px",
                  }}
                  onMouseEnter={() => {
                    const el = document.getElementById("be-img");
                    if (el) el.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    const el = document.getElementById("be-img");
                    if (el) el.style.display = "none";
                  }}
                >
                  Bachelor of Engineering
                </span>{" "}
                in Computers, Mumbai University <br />
                <span
                  style={{
                    color: "#007BFF",
                    fontWeight: "bold",
                    position: "relative",
                  }}
                  onMouseEnter={() => {
                    const el = document.getElementById("ai-img");
                    if (el) el.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    const el = document.getElementById("ai-img");
                    if (el) el.style.display = "none";
                  }}
                >
                  Generative AI{" "}
                </span>{" "}
                Certificate – Upgrad
                <img
                  id="diploma-img"
                  src="src/assets/certi.jpg"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "2rem",
                    left: "0",
                    width: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    zIndex: 999,
                  }}
                />
                <img
                  id="be-img"
                  src="src/assets/certi.jpg"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "2rem",
                    left: "60px",
                    width: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    zIndex: 999,
                  }}
                />
                <img
                  id="ai-img"
                  src="src/assets/certi.jpg"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "5rem",
                    left: "0",
                    width: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    zIndex: 999,
                  }}
                />
              </li>
            </ul>
          </div>
          <div
            style={{
              position: "absolute",
              top: "500px",
              left: "100px",
              zIndex: 10,
              display: "flex",
            }}
          >
            <div style={{ marginRight: "40px" }}>
              <h1
                style={{ fontSize: "3rem", margin: 0, fontWeight: "lighter" }}
              >
                4+
              </h1>
              <p style={{ fontSize: "1.2rem", margin: 0 }}>
                Years of <br /> Experience
              </p>
            </div>

            <div>
              <h1
                style={{ fontSize: "3rem", margin: 0, fontWeight: "lighter" }}
              >
                10+
              </h1>
              <p style={{ fontSize: "1.2rem", margin: 0 }}>
                Successful <br /> Projects
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "150px",
            right: "60px",
            display: "flex",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div style={{ height: "550px", width: "490px", zIndex: 10 }}>
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "90px",
            display: "flex",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <a
            href="https://twitter.com/your_handle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={twitterIcon}
              alt="Twitter"
              width="30"
              height="30"
              style={{ filter: "invert(100%) brightness(200%)" }}
            />
          </a>
          <a
            href="https://instagram.com/your_handle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              width="30"
              height="30"
              style={{ filter: "invert(100%) brightness(200%)" }}
            />
          </a>
          <a
            href="https://youtube.com/your_channel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={youtubeIcon}
              alt="YouTube"
              width="30"
              height="30"
              style={{ filter: "invert(100%) brightness(200%)" }}
            />
          </a>
          <a
            href="https://facebook.com/your_handle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              width="30"
              height="30"
              style={{ filter: "invert(100%) brightness(200%)" }}
            />
          </a>
          <a
            href="https://facebook.com/your_handle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={mediumIcon}
              alt="Medium"
              width="30"
              height="30"
              style={{ filter: "invert(100%) brightness(200%)" }}
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
