import React from "react";
import InfocusLogo from "../Images/Ellipse.png";
import CicsLogo from "../Images/CICS.png";
import Avatar from "../Images/Avatar.png";
import "../AdminCSS/HeaderAdmin.css";

const Header = () => {

  const Logout = () =>{
    localStorage.clear();
  };

  return (
    <>
      <div className="headerContainer">
        <img src={InfocusLogo} alt="" className="InfocusLogo" />
        <img src={CicsLogo} alt="" className="CicsLogo" />
        <div className="AvatarAdmin">
          <span className="headerWtext">Welcome, Admin</span>
          <a href="" onClick={()=> Logout()}>
            <img src={Avatar} alt="" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
