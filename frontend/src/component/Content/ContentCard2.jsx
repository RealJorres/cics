import React from "react";
import Icons from "./icons/Icons";

function ContentCard2(props) {
  return (
    <>
      <div className="main-container">
        <div className="content-wrapper imgWrapper">
          <img src={props.image1} alt="" className="img1" />
          {/* <img src={props.image2} alt="" className="img2" />
          <img src={props.image3} alt="" className="img3" /> */}
        </div>
        <div className="content-wrapper">
          <div className="content-title-wrapper">
            <a href="">
              {" "}
              <h1 className="content-title">{props.title}</h1>
            </a>
          </div>
          <div className="content-paragraph-wrapper">
            <span className="content-posted-time">{props.postedTime}</span>
            <p className="content-paragraph">
              {props.paragraph} <a href="">See more</a>
            </p>
          </div>
          <Icons />
        </div>
      </div>
    </>
  );
}

export default ContentCard2;
