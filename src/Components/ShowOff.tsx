
import CircularText from "../Components/AdditionStyles/CircularText";


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
            top: "40px",
            right: "20px",
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
