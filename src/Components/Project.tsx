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
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: domainsystem,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
    {
    image: einnosec,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: hirelytics,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
    {
    image: securetain,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
    {
    image: thefiftyelement,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
    {
    image: thesmartfellowship,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: workverse,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
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
          background: "linear-gradient(to left,rgb(0, 0, 0),rgb(0, 0, 0))",
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
