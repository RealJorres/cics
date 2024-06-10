import "../Section-trending/card.css";
import React from "react";

function cardTrending(props) {
  return (
    <>
      <div className="card-main-container">
        <h5 className="title">{props.title}</h5>
        <div className="card-images-container">
          <img src={props.image} alt="" className="card-img1" />
          {/* <img src={props.image1} alt="" className="new" />
          <img src={props.image2} alt="" className="new" />
          <img src={props.image2} alt="" className="card-img2" /> */}
        </div>
        <div className="subtitle">
          <p>
            {props.subtitle} <a href="">See more</a>
          </p>
        </div>
      </div>
    </>
  );
}
export default cardTrending;
