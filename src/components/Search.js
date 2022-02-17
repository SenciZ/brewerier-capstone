import React from "react";
import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [breweries, setBreweries] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (searchWord === "") {
      axios
        .get(`https://api.openbrewerydb.org/breweries?page=${pageNumber}`)
        .then((res) => {
          const brews = res.data;
          setBreweries(brews);
        })
        .catch((err) => console.log(err));
    } else if (searchWord !== "") {
      axios
        .get(`https://api.openbrewerydb.org/breweries?by_city=${searchWord}`)
        .then((res) => {
          const brews = res.data;
          setBreweries(brews);
        })
        .catch((err) => console.log(err));
    }
  }, [searchWord, pageNumber]);

  return (
    <div className="search">
      <input
        id="mainSearchBar"
        onChange={(e) => setSearchWord(e.target.value)}
        type="text"
        placeholder="Search breweries by city"
      ></input>
      {!searchWord ? (
        <div id="breweryPageNav">
          <h2>All Breweries in Alphabetical Order</h2>
          <div id="breweryNavChevrons">
            <FontAwesomeIcon
              className="directionChevron"
              onClick={() => {
                if (pageNumber === 0) {
                  return;
                }
                setPageNumber((prev) => prev - 1);
              }}
              icon={faChevronCircleLeft}
            />
            <p id="pageNumberDisplay">PAGE {pageNumber}</p>
            <FontAwesomeIcon
              className="directionChevron"
              onClick={() => setPageNumber((prev) => prev + 1)}
              icon={faChevronCircleRight}
            />
          </div>
        </div>
      ) : (
        <h2>Breweries in {searchWord}</h2>
      )}
      <div className="cardContainer">
        {breweries.map((item, index) => (
          <div className="breweryCard" key={index}>
            {!item.website_url && (
              <img
                className="breweryLogo"
                alt={item.name}
                src={`https://dummyimage.com/128x128/ffffff/000000.jpg&text=${item.name}`}
              ></img>
            )}
            {item.website_url && (
              <img
                className="breweryLogo"
                alt={item.name}
                src={`https://logo.clearbit.com/${item.website_url}`}
                onError={(e) =>
                  (e.target.src = `https://dummyimage.com/128x128/ffffff/000000.jpg&text=${item.name}`)
                }
              ></img>
            )}
            <h3 className="breweryName">{item.name}</h3>
            <h4>
              {item.city}, {item.state}
            </h4>
          </div>
        ))}
      </div>
      {!searchWord && (
        <div id="breweryPageNav">
          <div id="breweryNavChevrons">
            <FontAwesomeIcon
              className="directionChevron"
              onClick={() => {
                if (pageNumber === 0) {
                  return;
                }
                setPageNumber((prev) => prev - 1);
              }}
              icon={faChevronCircleLeft}
            />
            <p id="pageNumberDisplay">PAGE {pageNumber}</p>
            <FontAwesomeIcon
              className="directionChevron"
              onClick={() => setPageNumber((prev) => prev + 1)}
              icon={faChevronCircleRight}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
