import React from "react";
import { Link } from "react-router-dom";
import routesData from "../data/routesData";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {routesData.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
