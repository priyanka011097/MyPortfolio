import { ChromaGrid } from "./AdditionStyles/ChromaItem";
import advisorxai from "../assets/sites/advisorxai.png";
import domainsystem from "../assets/sites/domainsystem.png";
import einnosec from "../assets/sites/einnosec.png";
import hirelytics from "../assets/sites/hirelytics.png";
import securetain from "../assets/sites/securetain.png";
import thefiftyelement from "../assets/sites/thefiftyelement.png";
import thesmartfellowship from "../assets/sites/thesmartfellowship.png";
import workverse from "../assets/sites/workverse.png";

const items = [
  {
    image: advisorxai,
    title: "AdvisorX AI",
    subtitle: "Frontend Developer",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://www.advisorx.ai",
  },
  {
    image: domainsystem,
    title: "Xneelo",
    subtitle: "Full Stack Developer",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://xneelo.co.za/",
  },
  {
    image: einnosec,
    title: "eInnoSec",
    subtitle: "Project Lead",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://www.einnosec.com/",
  },
  {
    image: hirelytics,
    title: "hirelytics",
    subtitle: "AI Engineer Support",
    handle: "Saas",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://saas.hirelytics.io/",
  },
  {
    image: securetain,
    title: "SecuRetain",
    subtitle: "Project Lead",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://www.securetain.com/",
  },
  {
    image: thefiftyelement,
    title: "The Fifty Element",
    subtitle: "Frontend Developer",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://portal.5thacademy.com/",
  },
  {
    image: thesmartfellowship,
    title: "The Smart Fellowship",
    subtitle: "Project Lead",
    handle: "@website",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://www.thesmartfellowship.com/",
  },
  {
    image: workverse,
    title: "Workverse",
    subtitle: "Solution Architect",
    handle: "@Game+AI",
    gradient: "rgba(0, 0, 0, 0.43)",
    url: "https://play.google.com/store/apps/details?id=com.Workverse.Simulator&pcampaignid=web_share",
  },
];

const Project = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          flex: "0 0 100vw",
          background: "linear-gradient(to right,rgb(0, 0, 0),rgb(0, 26, 31),rgb(0, 26, 31))",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="scroll-wrapper"
          style={{
            width: "80%",
            height: "70%",
            marginBottom: "50px",
            boxSizing: "border-box",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <h1 className="text">Projects</h1>
          <ChromaGrid
            items={items}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </section>
    </>
  );
};

export default Project;
