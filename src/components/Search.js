import React from "react";
import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useEffect } from "react";

function Search() {
  const [breweries, setBreweries] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.openbrewerydb.org/breweries/search?query=${searchWord}`)
      .then((res) => {
        const brews = res.data;
        setBreweries(brews);
      })
      .catch((err) => console.log(err));
  }, [searchWord]);

  return (
    <div className="search">
      <input
        id="mainSearchBar"
        onChange={(e) => setSearchWord(e.target.value)}
        type="text"
        placeholder="Search breweries by keyword, city, or state"
      ></input>
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
    </div>
  );
}

export default Search;
