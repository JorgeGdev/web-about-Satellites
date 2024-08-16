import React from "react";
import "../../styles/cardBasic.css";

export default function StarShip() {
  return (
    <>
      <div className="card">
        <div className="character_4">
          <div className="image-character_4"></div>
          <div className="detail_4">
            <h2>STARSHIP</h2>
            <p>
            SpaceX Starship spacecraft and Super Heavy rocket represent a fully reusable transportation 
            system designed to carry both crew and cargo to Earth orbit, 
            the Moon, Mars and beyond.
            </p>
            <a href="https://www.spacex.com/vehicles/starship/" target="_blank" className="boton">
              <h6>More Info</h6>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
