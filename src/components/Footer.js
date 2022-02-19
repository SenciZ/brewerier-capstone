import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import beerMug from "../images/beerMug.png";

function Footer() {
  return (
    <footer id="footer">
      <nav id="footerNavBar">
        <Link to="/">
          <span id="footerLogoHolder">
            <img alt="Beer Mug Logo" src={beerMug} />
            <h1 id="logoFont">BREWERIER</h1>
          </span>
        </Link>
        <div id="socialMediaHolder">
          <span>
            <a
              href="https://www.linkedin.com/in/senad-zenkovic/"
              className="fab fa-linkedin"
            ></a>
          </span>
          <span>
            <a href="https://github.com/SenciZ" className="fab fa-github"></a>
          </span>
        </div>
      </nav>
      <div id="bottomFooter"></div>
    </footer>
  );
}

export default Footer;
