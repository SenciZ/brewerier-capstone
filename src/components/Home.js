import React from "react";
import "./Home.css";
import Search from "./Search";
function Home({ isLoggedIn, userId }) {
  return (
    <>
      <div id="homeHero">
        <div className="darkDiv">
          <span id="textContainer">
            <h2 id="searchEngineText">Brewerier is a brewery search engine.</h2>
            <p id="instructionsText">
              search breweries around the country below.
            </p>
          </span>
        </div>
      </div>
      <Search isLoggedIn={isLoggedIn} userId={userId} />
    </>
  );
}

export default Home;
