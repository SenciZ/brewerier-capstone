import React from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ currentuser }) {
  const navigate = useNavigate();

  const [userBrewList, setUserBrewList] = useState([]);
  const [brewNumber, setBrewNumber] = useState(0);
  const [beenNumber, setBeenNumber] = useState(0);
  const [showNumbers, setShowNumbers] = useState(true);
  const [ loadingState, setLoadingState ] = useState(false);

  useEffect(() => {
    let userId = currentuser.id;
    axios
      .post(`/getBrewList`, { userId })
      .then((res) => {
        const brewListNum = res.data[1].rowCount;
        console.log(res.data);
        setBrewNumber(brewListNum);
      })
      .catch((err) => console.log(err));
    axios
      .post(`/getBeenList`, { userId })
      .then((res) => {
        const beenListNum = res.data[1].rowCount;
        console.log(res.data);
        setBeenNumber(beenListNum);
      })
      .catch((err) => console.log(err));
  }, []);

  const getBrewList = () => {
    setLoadingState(true);
    console.log(currentuser.id);
    let userId = currentuser.id;
    axios
      .post(`/getBrewList`, { userId })
      .then((res) => {
        const brewList = res.data[0];
        console.log(res.data);
        setUserBrewList(brewList);
        setShowNumbers(false);
        setLoadingState(false);
      })
      .catch((err) => console.log(err));
  };

  const getBeenList = () => {
    setLoadingState(true);
    console.log(currentuser.id);
    let userId = currentuser.id;
    axios
      .post(`/getBeenList`, { userId })
      .then((res) => {
        const brewList = res.data[0];
        console.log(res.data);
        setUserBrewList(brewList);
        setShowNumbers(false);
        setLoadingState(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="dashboardBodyContainer">
      <div id="dashboardNav">
        <div id="dashboardNavContainer">
          {currentuser && <h2>Hello {currentuser.name}</h2>}
          <div id="dashboardNavBtnContainer">
            <button onClick={getBeenList} className="dashboardBeenBrewListBtn">
              VIEW MY BEENLIST
            </button>
            <button onClick={getBrewList} className="dashboardBeenBrewListBtn">
              VIEW MY BREWLIST
            </button>
          </div>
        </div>
      </div>
      <div className="cardContainer">
        {showNumbers && (
          <div id="breweryNumberDisplayHolder">
            <div className="breweryNumberDisplay">
              <h2>{brewNumber}</h2>
              <p>Breweries in your BrewList</p>
            </div>
            <div className="breweryNumberDisplay">
              <h2>{beenNumber}</h2>
              <p>Breweries in your BeenList</p>
            </div>
          </div>
        )}
        { !!loadingState && <p>Items Loading</p>}
        {userBrewList.map((item, index) => (
          <div className="breweryCard" key={index} id={item.id}>
            {!item.website_url && (
              <img
                className="breweryLogo"
                alt={item.name}
                src={`${item.brewery_logo}`}
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
            <h3 className="breweryName">{item.brewery_name}</h3>
            <h4>{`${item.brewery_location}`}</h4>
            <h5>
              <a className="brewWebsite" target="blank" href={item.website_url}>
                {item.website_url}
              </a>
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
