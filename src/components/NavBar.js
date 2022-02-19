import React from "react";
import { Link } from "react-router-dom";
import beerMug from "../images/beerMug.png";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function NavBar({ currentuser, isLoggedIn, setLoggedOutHandler }) {
  const [menuClicked, setMenuClicked] = useState(false);

  // let name = localStorage.getItem("name");
  // useEffect(() => {
  //   name = localStorage.getItem("name");
  // }, [loggedStatus]);

  // useEffect(() => {
  //   return () => {};
  // }, [user]);

  return (
    <>
      <div id="navBarContainer">
        <nav id="navBar">
          <Link to="/home">
            <span id="logoHolder">
              <img alt="Beer Mug Logo" src={beerMug} />
              <h1 id="logoFont">BREWERIER</h1>
            </span>
          </Link>
          {isLoggedIn ? (
            <div id="rightNavContainer">
              <ul id="rightNav">
                <li className="listItem border">
                  <Link to="/about">ABOUT</Link>
                </li>
                <li className="listItem border">
                  <Link to="/dashboard">MY BREWERIES</Link>
                </li>
                <li className="listItem listBtn">
                  <Link to="/home">
                    <button id="loginBtn" onClick={setLoggedOutHandler}>
                      LOGOUT
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
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
          )}

          <FontAwesomeIcon
            className="hamburger"
            onClick={() => setMenuClicked(!menuClicked)}
            icon={faBars}
          />
        </nav>
      </div>
      <ul className="rightNavMobile" id={menuClicked ? null : "hidden"}>
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
    </>
  );
}

export default NavBar;
