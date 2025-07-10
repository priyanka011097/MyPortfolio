import twitterIcon from "../assets/icons/twitter.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import youtubeIcon from "../assets/icons/youtube.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import mediumIcon from "../assets/icons/medium.svg";
import SpotlightCard from "../Components/AdditionStyles/SpotlightCard";
import Stack from "../Components/AdditionStyles/Stack";

import aws from "../assets/icons/aws.svg";
import css from "../assets/icons/css.svg";
import docker from "../assets/icons/docker.svg";
import dynatrace from "../assets/icons/dynatrace.svg";
import figma from "../assets/icons/figma.svg";
import github from "../assets/icons/git.svg";
import gitlab from "../assets/icons/gitlab.svg";
import html5 from "../assets/icons/html5.svg";
import javascript from "../assets/icons/javascript.svg";
import jira from "../assets/icons/jira.svg";
import kibana from "../assets/icons/kibana.svg";
import mongodb from "../assets/icons/mongodb.svg";
import mysql from "../assets/icons/mysql.svg";
import nodejs from "../assets/icons/nodejs.svg";
import postman from "../assets/icons/postman.svg";
import rancher from "../assets/icons/rancher.svg";
import react from "../assets/icons/react.svg";
import redux from "../assets/icons/redux.svg";
import slack from "../assets/icons/slack.svg";
import python from "../assets/icons/python.svg";
import linux from "../assets/icons/linux.svg";

import git from "../assets/icons/github.png";
import leetcode from "../assets/icons/leetcode.png";
import hackerrack from "../assets/icons/hackerrack.png";

import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
import event4 from "../assets/event4.jpg";
import event5 from "../assets/event5.jpg";
import event6 from "../assets/event6.jpg";
const images = [
  {
    id: 1,
    img: event1,
  },
  {
    id: 2,
    img: event2,
  },
  {
    id: 3,
    img: event3,
  },
  {
    id: 4,
    img: event4,
  },
  {
    id: 5,
    img: event5,
  },
  {
    id: 6,
    img: event6,
  },
];

const About = () => {
  return (
    <>
      <style>
        {`
      @keyframes verticalScroll {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(0%);
        }
      }

      .scrolling-icons-wrapper {
        height: 150vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .scrolling-icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        animation: verticalScroll 100s linear infinite;
      }
    `}
      </style>
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
            top: "60px",
            left: "-10px",
            zIndex: 10,
          }}
        >
          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.49)">
            <div style={{ display: "flex", alignItems: "center" }}>
              GitHub
              <img
                src={git}
                alt="GitHub"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "55px",
                  color: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              20+
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.49)">
            <div style={{ display: "flex", alignItems: "center" }}>
              LeetCode
              <img
                src={leetcode}
                alt="LeetCode"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "40px",
                  color: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              200+
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.49)">
            <div style={{ display: "flex", alignItems: "center" }}>
              HackerRack
              <img
                src={hackerrack}
                alt="HackerRack"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "25px",
                  color: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              50+
            </div>
          </SpotlightCard>
        </div>
        <div
          style={{
            position: "absolute",
            top: "280px",
            left: "12px",
            zIndex: 10,
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Education
          </h2>

          <ul style={{ paddingLeft: "1rem", marginLeft: "25px" }}>
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
                  if (el) {
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                  }
                }}
                onMouseLeave={() => {
                  const el = document.getElementById("diploma-img");
                  if (el) {
                    el.style.opacity = "0";
                    el.style.visibility = "hidden";
                  }
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
                  if (el) {
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                  }
                }}
                onMouseLeave={() => {
                  const el = document.getElementById("be-img");
                  if (el) {
                    el.style.opacity = "0";
                    el.style.visibility = "hidden";
                  }
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
                  if (el) {
                    el.style.opacity = "1";
                    el.style.visibility = "visible";
                  }
                }}
                onMouseLeave={() => {
                  const el = document.getElementById("ai-img");
                  if (el) {
                    el.style.opacity = "0";
                    el.style.visibility = "hidden";
                  }
                }}
              >
                Generative AI
              </span>{" "}
              Certificate – Upgrad
              {/* Diploma Certificate */}
              <img
                id="diploma-img"
                src="src/assets/certi.jpg"
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  position: "absolute",
                  top: "2rem",
                  left: "0",
                  width: "400px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  zIndex: 999,
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              />
              {/* BE Certificate */}
              <img
                id="be-img"
                src="src/assets/certi.jpg"
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  position: "absolute",
                  top: "2rem",
                  left: "60px",
                  width: "400px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  zIndex: 999,
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              />
              {/* AI Certificate */}
              <img
                id="ai-img"
                src="src/assets/certi.jpg"
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  position: "absolute",
                  top: "5rem",
                  left: "0",
                  width: "400px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  zIndex: 999,
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              />
            </li>
          </ul>
        </div>
        <div
          style={{
            position: "absolute",
            top: "440px",
            left: "12px",
            zIndex: 10,
            display: "flex",
          }}
        >
          <div style={{ marginRight: "40px" }}>
            <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: "lighter" }}>
              4+
            </h1>
            <p style={{ fontSize: "1.2rem", margin: 0 }}>
              Years of <br /> Experience
            </p>
          </div>

          <div>
            <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: "lighter" }}>
              10+
            </h1>
            <p style={{ fontSize: "1.2rem", margin: 0 }}>
              Successful <br /> Projects
            </p>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            height: "150vh",
            width: "80px",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            right: "475px",
            zIndex: 10,
            transform: "rotate(0deg)",
            transformOrigin: "center",
            overflow: "hidden",
          }}
        >
          <div className="scrolling-icons-wrapper">
            <div className="scrolling-icons">
              {[
                aws,
                css,
                docker,
                dynatrace,
                figma,
                github,
                gitlab,
                html5,
                javascript,
                jira,
                kibana,
                mongodb,
                mysql,
                nodejs,
                postman,
                rancher,
                react,
                redux,
                slack,
                python,
                linux,
                aws,
                css,
                docker,
                dynatrace,
                figma,
                github,
                gitlab,
                html5,
                javascript,
                jira,
                kibana,
                mongodb,
                mysql,
                nodejs,
                postman,
                rancher,
                react,
                redux,
                slack,
                python,
                linux,
                aws,
                css,
                docker,
                dynatrace,
                figma,
                github,
                gitlab,
                html5,
                javascript,
                jira,
                kibana,
                mongodb,
                mysql,
                nodejs,
                postman,
                rancher,
                react,
                redux,
                slack,
                python,
                linux,
                aws,
                css,
                docker,
                dynatrace,
                figma,
                github,
                gitlab,
                html5,
                javascript,
                jira,
                kibana,
                mongodb,
                mysql,
                nodejs,
                postman,
                rancher,
                react,
                redux,
                slack,
                python,
                linux,
              ].map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt={`icon-${index}`}
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "450px",
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
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "200px",
            display: "block",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              width: "100%",
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
              padding: "10px -150px",
            }}
          >
            My Moments
          </h1>
          <Stack
            randomRotation={true}
            sensitivity={100}
            sendToBackOnClick={false}
            cardDimensions={{ width: 350, height: 200 }}
            cardsData={images}
          />
        </div>
      </section>
    </>
  );
};

export default About;
