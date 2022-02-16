import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import beerMug from "../images/beerMug.png";

function Footer() {
  return (
    <footer id="footer">
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
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
