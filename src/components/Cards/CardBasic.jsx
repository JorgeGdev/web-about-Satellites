import React from "react";
import '../../styles/cardBasic.css'

export default function CardBasic() {
  return (
    <>
      <div className="card">
        <div className="character">
          <div className="image-character_1"></div>
          <div className="detail">
            <h2>DRAGON</h2>
            <p>
            The Dragon is capable of carrying up to 7 passengers to and from Earth orbit, 
            and beyond. It is the only spacecraft currently flying that is capable of returning significant 
            amounts of cargo to Earth, and is the first to take humans to the SS.
            </p>
            <a href="https://www.spacex.com/vehicles/dragon/" target="_blank" className="boton">
              <h6>More Info</h6>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
