import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navBar.scss";
import logo from "./../../assets/images/logo.png";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/store";

function NavBar() {
  const [showNav, setNav] = useState(false);
  const [navStyle, setNavStyle] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (showNav) {
      setNavStyle({
        display: "block",
        transition: "0.5s",
      });
    } else {
      setNavStyle({
        transition: "0.5s",
        display: "none",
      });
    }
  }, [showNav]);

  return (
    <div className="navBar bg-dark">
      <div className="container-fluid  d-flex justify-content-between align-items-center">
        <img src={logo} alt="" className="logo" />
        {!showNav && (
          <i
            className="bi bi-list text-white"
            onClick={() => setNav(!showNav)}
          ></i>
        )}
        {showNav && (
          <i
            className="bi bi-x-lg text-white"
            onClick={() => setNav(!showNav)}
          ></i>
        )}
      </div>

      <ul className="text-white " style={navStyle}>
        <li>
          <Link className="link" to="home">
            <i className="bi bi-house-door"></i>
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="discover">
            <i className="bi bi-compass"></i>
            Discover
          </Link>
        </li>
        <li>
          <Link className="link" to="/watchlist">
            <i className="bi bi-bookmarks"></i>
            Watchlist
          </Link>
        </li>
        <li>
          <Link className="link" to="trending">
            <i className="bi bi-fire"></i>
            Trending
          </Link>
        </li>
        <li>
          <Link className="link" to="circle">
            <Diversity2Icon className="icons" />
            Circle
          </Link>
        </li>
        <li>
          <Link className="link" to="community">
            <Diversity3Icon className="icons" />
            Community
          </Link>
        </li>
        <li>
          <Link className="link" to="chat">
            <i className="bi bi-bell"></i>
            Notifications
          </Link>
        </li>
        <li
          onClick={() => {
            dispatch(setLogout());
          }}
        >
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
