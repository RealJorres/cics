import React, { useState } from "react";
import "./Home.css";
import logo from "../images/logo.png";
import noti from "../images/Notification.png";
import avatar from "../images/avatar.jpg";
import SearchIcon from "../images/magnifying.png";
import Trending from "../Section-trending/Trending"
import Content from "../Content/Content"

const Home = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <ul className="header-container">
        <div className="header-container1">
          <li>
            <img src={logo} alt="" className="logo-header" />
          </li>
          <li className="header-input-container">
            <input type="text" className="header-input" />
            <img src={SearchIcon} alt="" className="header-search-icon" />
          </li>
        </div>
        <div className="header-container2">
          <li>
            <img src={noti} alt="" className="logo-noti" />
          </li>
          <li>
            <a href="" onClick={() => localStorage.clear()}><img
              src={avatar}
              alt=""
              className="logo-avatar"
            /></a>
            
            {!toggle && (
              <ul className="logout">
                <li>Log out</li>
              </ul>
            )}
          </li>
        </div>
      </ul>
      <Trending />
      <Content />
    </>
  );
};

export default Home;
