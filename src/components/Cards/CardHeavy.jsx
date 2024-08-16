import React from "react";
import "../../styles/cardBasic.css";

export default function CardHeavy() {
  return (
    <>
      <div className="card">
        <div className="character_3">
          <div className="image-character_3"></div>
          <div className="detail_3">
            <h2>FALCON HEAVY</h2>
            <p>
            Falcon Heavy is composed of three reusable Falcon 9 nine-engine cores whose 27 Merlin engines together
             generate more than 5 million pounds of thrust at liftoff, equal to approximately eighteen 747 aircraft. 
            
            </p>
            <a href="https://www.spacex.com/vehicles/falcon-heavy/" target="_blank" className="boton">
              <h6>More Info</h6>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
