import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SpotComp from "../components/SpotComp";

const MapPage = ({ component }) => {
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
      <h1>Map Page for {component.title}</h1>
      <p>Path: {component.path}</p>
      <p>
        This is the page where the map will be displayed for {component.title}.
      </p>
      <p>Number of results: {results.length}</p>
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
      <div></div>
    </div>
  );
};

export default MapPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const MapPage = ({ component }) => {
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         let allResults = [];
//         let offset = 0;
//         let moreData = true;

//         while (moreData) {
//           const response = await axios.get(
//             `${component.url}/records?start=${offset}&limit=100`
//           );
//           if (response.data && response.data.results) {
//             allResults = [...allResults, ...response.data.results];
//             offset += 100;
//             moreData = response.data.results.length === 100;
//           } else {
//             moreData = false;
//           }
//         }

//         setResults(allResults);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchAllData();
//   }, [component.url]);

//   return (
//     <div>
//       <h1>Map Page for {component.title}</h1>
//       <p>Path: {component.path}</p>
//       <p>
//         This is the page where the map will be displayed for {component.title}.
//       </p>
//       <p>Number of results: {results.length}</p>
//       <MapContainer
//         center={[48.8566, 2.3522]}
//         zoom={12}
//         style={{ height: "500px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPage;
