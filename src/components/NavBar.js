import React from "react";
import { Link } from "react-router-dom";
import beerMug from "../images/beerMug.png";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useWindowSize } from "./hooks/useWindowSize";

function NavBar() {
  const size = useWindowSize();
  const [iconStatus, setIconStatus] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuClicked, setMenuClicked] = useState(null);

  useEffect(() => {
    if (window.innerWidth !== windowWidth) {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 751) {
        setIconStatus(true);
        setMenuClicked(null);
      } else if (window.innerWidth > 751) {
        setIconStatus(false);
      }
    }
  }, [size]);

  return (
    <>
      <div id="navBarContainer">
        <nav id="navBar">
          <Link to="/">
            <span id="logoHolder">
              <img alt="Beer Mug Logo" src={beerMug} />
              <h1 id="logoFont">BREWERIER</h1>
            </span>
          </Link>
          <div id="rightNavContainer">
            <ul id="rightNav">
              <li className="listItem border">
                <Link to="/about">ABOUT</Link>
              </li>
              <li className="listItem border">
                <Link to="/signup">SIGN UP</Link>
              </li>
              <li className="listItem listBtn">
                <Link to="/login">
                  <button id="loginBtn">LOGIN</button>
                </Link>
              </li>
            </ul>
          </div>
          {iconStatus ? (
            <FontAwesomeIcon
              className="hamburger"
              onClick={() => setMenuClicked(!menuClicked)}
              icon={faBars}
            />
          ) : null}
        </nav>
      </div>
      {menuClicked ? (
        <ul id="rightNavMobile">
          <li className="listItemMobile">
            <Link onClick={() => setMenuClicked(!menuClicked)} to="/about">
              ABOUT
            </Link>
          </li>
          <li className="listItemMobile">
            <Link onClick={() => setMenuClicked(!menuClicked)} to="/signup">
              SIGN UP
            </Link>
          </li>
          <li className="listItemMobile listBtn">
            <Link onClick={() => setMenuClicked(!menuClicked)} to="/login">
              <button id="loginBtn">LOGIN</button>
            </Link>
          </li>
        </ul>
      ) : null}
    </>
  );
}

export default NavBar;
