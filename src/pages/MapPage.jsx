import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SpotComp from "../components/SpotComp";

const MapPage = ({ component, parentLink }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let allResults = [];
        let offset = 0;
        let moreData = true;

        while (moreData) {
          const response = await axios.get(
            `${component.url}/records?start=${offset}&limit=100`
          );
          if (response.data && response.data.results) {
            allResults = [...allResults, ...response.data.results];
            offset += 100;
            moreData = response.data.results.length === 100;
          } else {
            moreData = false;
          }
        }

        setResults(allResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [component.url]);

  return (
    <div>
      <a href={parentLink}>Retour</a>
      <h3>
        {component.title} ({results.length})
      </h3>
      {component.comment !== undefined && (
        <p>
          {component.comment.charAt(0).toUpperCase() +
            component.comment.slice(1)}
        </p>
      )}
      <a
        href={`${component.url}/records`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lien vers le jeu de données
      </a>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {results.map((result, index) => (
          <SpotComp key={index} component={component} result={result} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
