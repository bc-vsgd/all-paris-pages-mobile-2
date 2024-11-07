import React from "react";
import { Circle, Popup, Polygon, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";

const SpotComp = ({ component, result }) => {
  const getNestedValue = (obj, keys) => {
    return keys.reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
  };

  let lat, lon;
  let geometryType, coordinates;
  if (component.featureIsPoint && component.coords) {
    const coordsKeys = component.coords.split(".");
    const coordsValue = getNestedValue(result, coordsKeys);
    if (coordsValue && typeof coordsValue === "object") {
      const [lonValue, latValue] = Object.values(coordsValue);
      lon = parseFloat(lonValue);
      lat = parseFloat(latValue);
    }
  } else if (!component.featureIsPoint && component.coords) {
    const coordsKeys = component.coords.split(".");
    const coordsValue = getNestedValue(result, coordsKeys);
    if (coordsValue && typeof coordsValue === "object") {
      geometryType = coordsValue.type;
      coordinates = coordsValue.coordinates;
    }
  }

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
      return { key: keyPath, value: getNestedValue(result, keys) };
    })
    .filter(
      (item) =>
        item.value !== undefined &&
        item.value !== null &&
        (!Array.isArray(item.value) || item.value.length > 0)
    );

  const addressValues = component.address
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(result, keys);
    })
    .filter((value) => value !== undefined);

  const notDisplayedKeys = new Set([
    component.coords,
    ...component.fixedDisplayed,
    ...component.img,
    ...component.firstDisplayed,
    ...component.address,
    ...component.notDisplayed,
  ]);

  const remainingKeys = Object.keys(result)
    .filter((key) => !notDisplayedKeys.has(key))
    .map((key) => ({ key, value: result[key] }))
    .filter(
      (item) =>
        item.value !== undefined &&
        item.value !== null &&
        (!Array.isArray(item.value) || item.value.length > 0)
    );

  const renderPopupContent = () => (
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
        {addressValues.length > 0 && (
          <div style={{ marginTop: "10px" }}>{addressValues.join(" ")}</div>
        )}
        {firstDisplayedValues.length > 0 &&
          firstDisplayedValues.map((item, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <strong>{item.key}:</strong>{" "}
              {Array.isArray(item.value)
                ? item.value.map((val, i) => <div key={i}>{val}</div>)
                : item.value}
            </div>
          ))}
        {remainingKeys.length > 0 &&
          remainingKeys.map((item, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <strong>{item.key}:</strong>{" "}
              {Array.isArray(item.value)
                ? item.value.map((val, i) => <div key={i}>{val}</div>)
                : item.value}
            </div>
          ))}
      </Box>
    </Popup>
  );

  const renderGeometry = () => {
    if (geometryType && coordinates) {
      switch (geometryType) {
        case "Polygon":
          return (
            <Polygon
              positions={coordinates[0].map((coord) => [coord[1], coord[0]])}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polygon>
          );
        case "MultiPolygon":
          return coordinates.map((polygonCoords, index) => (
            <Polygon
              key={index}
              positions={polygonCoords[0].map((coord) => [coord[1], coord[0]])}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polygon>
          ));
        case "LineString":
          return (
            <Polyline
              positions={coordinates.map((coord) => [coord[1], coord[0]])}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polyline>
          );
        case "MultiLineString":
          return coordinates.map((lineCoords, index) => (
            <Polyline
              key={index}
              positions={lineCoords.map((coord) => [coord[1], coord[0]])}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polyline>
          ));

        case "MultiPoint":
          return coordinates.map((pointCoords, index) => (
            <Circle
              key={index}
              center={[pointCoords[1], pointCoords[0]]}
              radius={10}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Circle>
          ));
        default:
          return null;
      }
    }
    return null;
  };

  return component.featureIsPoint && lat && lon ? (
    <Circle center={[lat, lon]} radius={10} pathOptions={{ color: "blue" }}>
      {renderPopupContent()}
    </Circle>
  ) : (
    renderGeometry()
  );
};

export default SpotComp;
