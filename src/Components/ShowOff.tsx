import Stack from "../Components/AdditionStyles/Stack";
import CircularText from "../Components/AdditionStyles/CircularText";
const images = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
  },
];

const ShowOff = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          flex: "0 0 100vw",
          background: "linear-gradient(to right,rgb(0, 0, 0),rgb(0, 41, 48))",
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
            left: "0px",
            top: "90px",
            display: "flex",
            zIndex: 10,
          }}
        >
            <h1>Certificates </h1>
        </div>
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "250px",
            display: "flex",
            zIndex: 10,
          }}
        >
          <Stack
            randomRotation={true}
            sensitivity={100}
            sendToBackOnClick={false}
            cardDimensions={{ width: 500, height: 300 }}
            cardsData={images}
          />
        </div>
            <div
          style={{
            position: "absolute",
            top: "40px",
            left: "-5px",
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
 
      </section>
    </>
  );
};

export default ShowOff;
