import React from "react";
import MapView from "./MapView";
import { useState } from "react";

const App = () => {
    const [city, setCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

      const handleGetTrafficData = () => {
        setSelectedCity(city); // Updates the city to render the map when the button is pressed
      };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <h1>Traffic Map</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            margin: "10px 0",
            width: "50%",
          }}
        />
        <button
          onClick={handleGetTrafficData}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Get Traffic Data
        </button>
      </div>
      {selectedCity && <MapView city={selectedCity} />}
    </div>
  );
};

export default App;
