import React from "react";
import "./About.css";
import beer1 from "../images/beer1.jpg";
import beer2 from "../images/beer2.jpg";
import beer3 from "../images/beer3.jpg";
import beer4 from "../images/beer4.jpg";
import beer5 from "../images/beer5.jpg";
import beer6 from "../images/beer6.jpg";

function About() {
  return (
    <div id="aboutContainer">
      <div id="aboutContent">
        <h1 id="aboutHeading">
          BREWERIER IS COMMITTED TO BRINGING YOU HIGH-QUALITY & DEPENDABLE BEER
          SOURCE DATA.
        </h1>
        <p>
          Breweries can be hard to find that is why we developed the Brewerier
          online platform. It is a one stop source for locating and visiting
          breweries from around the nation and the world.
        </p>
      </div>
      <div id="beerImageHolder">
        <img src={beer3} alt="Picture of brewery"></img>
        <img src={beer2} alt="Picture of brewery"></img>
        <img src={beer4} alt="Picture of brewery"></img>
        <img src={beer1} alt="Picture of brewery"></img>
        <img src={beer5} alt="Picture of brewery"></img>
        <img src={beer6} alt="Picture of brewery"></img>
      </div>
      <div id="aboutContent">
        <h3>How It Works.</h3>
        <p>
          With Brewerier you are able to search your city for all of its
          breweries or casually browse through the many breweries around the
          world. After you find the brewery you have been looking for, if you
          have an account, you can add that specific brewery to your account as
          a part of your BrewList or BeenList. The BrewList option allows you to
          keep track of the breweries that you wish to visit while the BeenList
          keeps track of all of the breweries you have already visited.
        </p>
      </div>
    </div>
  );
}

export default About;
