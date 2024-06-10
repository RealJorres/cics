import React from "react";
import "../AdminCSS/SideNav.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AnnouncementIcon from "../Images/Announcement.png";
import managePostIcon from "../Images/Managepost.png";
import SettingsIcon from "../Images/Settings.png";
import RecycleIcon from "../Images/Recycle.png";
import LogoutIcon from "../Images/Logout.png";
import NotiIcon from "../Images/Notification.png";

const SideNav = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="sideNavContainer">
        <div className="sidetitle">
          <span>Dashboard</span>
          <img src={NotiIcon} alt="" className="Annou" />
        </div>
        <hr />
        <ul className="ItemSideNav">
          <div className="itemLi">
            <Link to={"/announcement"}>
              <div className="item-items active">
                <img src={AnnouncementIcon} alt="" />
                <li  className="items-text">Announcement</li>
              </div>
            </Link>
            <Link to={"/managepost"}>
              <div className="item-items">
                <img src={managePostIcon} alt="" />
                <li>Manage post</li>
              </div>
            </Link>
            <div className="item-items">
              <img src={SettingsIcon} alt="" />
              <li>Settings</li>
            </div>
            <div className="item-items">
              <img src={RecycleIcon} alt="" />
              <li>Recycle</li>
            </div>
          </div>
          <div className="item-items">
            <img src={LogoutIcon} alt="" />
            <li>Log out</li>
          </div>
        </ul>
      </div>
      <Outlet />
    </>
  );
};
export default SideNav;
