import React from "react";
import "./Home.css";
import Search from "./Search";
function Home() {
  return (
    <>
      <div id="homeHero">
        <div className="darkDiv">
          <span id="textContainer">
            <h2 id="searchEngineText">Brewerier is a brewery search engine.</h2>
            <p id="instructionsText">search breweries near you below.</p>
          </span>
        </div>
      </div>
      <Search />
    </>
  );
}

export default Home;
