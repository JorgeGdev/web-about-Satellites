import React from "react";
import "../../styles/cardBasic.css";

export default function CardFalcon() {
  return (
    <>
      <div className="card">
        <div className="character_2">
          <div className="image-character_2"></div>
          <div className="detail_2">
            <h2>FALCON</h2>
            <p>
            Falcon 9 is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and 
            safe transport of people and payloads into Earth orbit and beyond. 
            Is the worlds first orbital class reusable rocket. 
            </p>
            <a target="_blank" href="https://www.spacex.com/vehicles/falcon-9/" className="boton">
              <h6>More Info</h6>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
