import React from "react";
import { Link } from "react-router-dom";

const SummaryPage = ({ route }) => {
  return (
    <div>
      <h2>{route.title}</h2>
      <ul>
        {route.components.map((component, index) => (
          <li key={index}>
            <Link to={component.path}>{component.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryPage;
