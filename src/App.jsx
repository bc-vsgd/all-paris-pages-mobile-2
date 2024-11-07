import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";
import routesData from "./data/routesData";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {routesData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<SummaryPage route={route} />}
          />
        ))}
        {routesData.flatMap((route) =>
          route.components.map((component, index) => (
            <Route
              key={`${route.path}-${index}`}
              path={component.path}
              element={
                <MapPage component={component} parentLink={route.path} />
              }
            />
          ))
        )}
      </Routes>
    </Router>
  );
};

export default App;
