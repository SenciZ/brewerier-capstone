import React from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ currentuser }) {
  const [userBrewList, setUserBrewList] = useState([]);

  useEffect(() => {
    if (currentuser) {
      axios
        .get(`/getBrewList`, currentuser.id)
        .then((res) => {
          const brewList = res.data[0];
          console.log(res.data);
          setUserBrewList(brewList);
        })
        .catch((err) => console.log(err));
    }
  }, [currentuser]);

  return (
    <div id="dashboardBodyContainer">
      <div id="dashboardNav">
        <div id="dashboardNavContainer">
          {currentuser && <h2>Hello {currentuser.name}</h2>}
          <div id="dashboardNavBtnContainer">
            <button className="dashboardBeenBrewListBtn">
              VIEW MY BEENLIST
            </button>
            <button className="dashboardBeenBrewListBtn">
              VIEW MY BREWLIST
            </button>
          </div>
        </div>
      </div>
      <div className="cardContainer">
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
