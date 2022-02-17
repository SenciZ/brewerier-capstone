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
              <li className="listItem">
                <Link to="/">HOME</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div id="bottomFooter"></div>
    </footer>
  );
}

export default Footer;
