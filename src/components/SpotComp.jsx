import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";

const SpotComp = ({ component, result }) => {
  const coords = component.coords;

  const getNestedValue = (obj, keys) => {
    return keys.reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
  };

  const latKeys = coords[0].split(".");
  const lonKeys = coords[1].split(".");
  const lat = parseFloat(getNestedValue(result, latKeys));
  const lon = parseFloat(getNestedValue(result, lonKeys));

  const fixedDisplayedValues = component.fixedDisplayed
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(result, keys);
    })
    .filter((value) => value !== undefined);

  const imgUrls = component.img
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(result, keys);
    })
    .filter((url) => url !== undefined);

  const firstDisplayedValues = component.firstDisplayed
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(result, keys);
    })
    .filter((value) => value !== undefined);

  const addressValues = component.address
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(result, keys);
    })
    .filter((value) => value !== undefined);

  const notDisplayedKeys = new Set([
    ...component.coords,
    ...component.fixedDisplayed,
    ...component.img,
    ...component.firstDisplayed,
    ...component.address,
    ...component.notDisplayed,
  ]);

  const remainingKeys = Object.keys(result).filter(
    (key) => !notDisplayedKeys.has(key)
  );
  console.log(remainingKeys);

  const translatedKeys = {
    name: "Nom",
    description: "Description",
    address: "Adresse",
    // Ajouter ici d'autres traductions si nécessaire
  };

  return lat && lon ? (
    <Circle center={[lat, lon]} radius={10} pathOptions={{ color: "blue" }}>
      <Popup>
        {fixedDisplayedValues.length > 0 && (
          <div>
            <strong>{fixedDisplayedValues.join(" ")}</strong>
          </div>
        )}
        <Box sx={{ maxHeight: "200px", overflowY: "auto", marginTop: "10px" }}>
          {imgUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`img-${index}`}
              style={{
                height: "100px",
                objectFit: "contain",
                display: "block",
                marginBottom: "10px",
              }}
            />
          ))}
          {firstDisplayedValues.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>{firstDisplayedValues.join(" ")}</strong>
            </div>
          )}
          {addressValues.length > 0 && (
            <div style={{ marginTop: "10px" }}>{addressValues.join(" ")}</div>
          )}
          {remainingKeys.length > 0 &&
            remainingKeys.map((key, index) => (
              <div key={index} style={{ marginTop: "10px" }}>
                <strong>{translatedKeys[key] || key}:</strong> {result[key]}
              </div>
            ))}
        </Box>
      </Popup>
    </Circle>
  ) : null;
};

export default SpotComp;
