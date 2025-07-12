import "./HoverReveal.css";
import book from "../../assets/elments/book.png";
import bottle from "../../assets/elments/bottle.png";
import brush from "../../assets/elments/brush.png";
import bug from "../../assets/elments/bug.png";
import camara from "../../assets/elments/camera.png";
import coffee from "../../assets/elments/coffee.png";
import duck from "../../assets/elments/duck.png";
import headphone from "../../assets/elments/headphone.png";
import laptop from "../../assets/elments/laptop.png";
import mobile from "../../assets/elments/mobile.png";
import photos from "../../assets/elments/photos.png";
import stickynotes from "../../assets/elments/Stickynotes.png";
import succulent from "../../assets/elments/succulent.png";


const HoverReveal = () => {
  return (
   <div className="hover-container">
      <img src={book} alt="book" className="reveal img-1" />
      <img src={bottle} alt="bottle " className="reveal img-2" />
      <img src={brush} alt="brush" className="reveal img-3" />
      <img src={bug} alt="bug" className="reveal img-4" />
      <img src={camara} alt="camara" className="reveal img-5" />
      <img src={coffee} alt="coffee" className="reveal img-6" />
      <img src={duck} alt="Revealed 7" className="reveal img-7" />
      <img src={headphone} alt="Revealed 8" className="reveal img-8" />
      <img src={laptop} alt="Revealed 9" className="reveal img-9" />
      <img src={mobile} alt="Revealed 10" className="reveal img-10" />
      <img src={photos} alt="Revealed 11" className="reveal img-11" />
      <img src={stickynotes} alt="Revealed 12" className="reveal img-12" />
      <img src={succulent} alt="Revealed 13" className="reveal img-13" />
    </div>
  );
};

export default HoverReveal;
