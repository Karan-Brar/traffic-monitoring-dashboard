import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";




const MapView = ({city}) => {
  const [cityCentre, setCityCentre] = useState(null); // State to store city center
  const [heatmapLayer, setHeatmapLayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const fetchCityCentre = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/city-centre/${cityName}`
      );
      const data = await response.json();
      if (data && data.latitude && data.longitude) {
        setCityCentre({ lat: data.latitude, lng: data.longitude });
      } else {
        console.error("City center not found.");
      }
    } catch (error) {
      console.error("Error fetching city center:", error);
    } finally {
      setLoading(false)
    }
  };

    const fetchTrafficData = async (cityName) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/traffic/${cityName}`
        );
        const data = await response.json();

        const maxTraffic = Math.max(
          ...data.map((item) => item.trafficLevel)
        );

        const minTraffic = Math.min(
          ...data.map((item) => item.trafficLevel)
        );

        console.log(
          data.map((trafficPoint) => [
            trafficPoint.latitude,
            trafficPoint.longitude,
            (trafficPoint.trafficLevel - minTraffic) /
              (maxTraffic - minTraffic), // Normalize traffic level for heatmap
          ])
        );
        return data.map((trafficPoint) => [
          trafficPoint.latitude,
          trafficPoint.longitude,
          (trafficPoint.trafficLevel - minTraffic) / (maxTraffic - minTraffic), // Normalize traffic level for heatmap
        ]);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
        return [];
      }
    };

  useEffect(() => {
    if (city) {
      setLoading(true); // Start loading when city is being fetched
      fetchCityCentre(city); // Fetch city center
    }
  }, [city]); // Re-run when city name changes

  useEffect(() => {
    if (cityCentre) {
      // Initialize the map only once
      if (!mapRef.current) {
              const mapInstance = L.map("map").setView(
                [cityCentre.lat, cityCentre.lng],
                12
              );

              mapInstance.on("load", () => {
                fetchTrafficData(city).then((heatmapData) => {
                  if (heatmapLayer) {
                    mapRef.current.removeLayer(heatmapLayer);
                  }
                  const newHeatmapLayer = L.heatLayer(heatmapData, {
                    radius: 100,
                    blur: 15,
                    maxZoom: 17,
                    gradient: {
                      0.1: "green",
                      0.3: "blue",
                      0.5: "orange",
                      0.7: "red",
                      1.0: "darkred",
                    },
                  }).addTo(mapRef.current);
                  setHeatmapLayer(newHeatmapLayer);
                });
              });

              L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                  maxZoom: 18,
                  attribution: "© OpenStreetMap",
                }
              ).addTo(mapInstance);

              mapRef.current = mapInstance;
      } else {
        mapRef.current.setView([cityCentre.lat, cityCentre.lng], 12);
      }

      // Fetch and render traffic data
      fetchTrafficData(city).then((heatmapData) => {
        console.log("Heatmap Data:", heatmapData);
        if (heatmapLayer) {
          heatmapLayer.remove();
          mapRef.current.removeLayer(heatmapLayer);
        }
        const newHeatmapLayer = L.heatLayer(heatmapData, {
          radius: 100,
          blur: 15, // Smooth transitions
          maxZoom: 17,
          gradient: {
            0.1: "green",
            0.3: "blue",
            0.5: "orange",
            0.7: "red",
            1.0: "darkred",
          },
        }).addTo(mapRef.current);
        setHeatmapLayer(newHeatmapLayer);
      });
    }
  }, [cityCentre]);


  return (
    <div style={styles.mapWrapper}>
      {loading ? (
        <p>Loading map...</p>
      ) : (
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
      )}
    </div>
  );
};

const styles = {
  mapWrapper: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh", // Full screen height
    width: "50vw", // Full screen width
    overflow: "hidden", // Prevent scrolling issues
    backgroundColor: "#f0f0f0", // Optional: Add a subtle background color
  },
};

export default MapView;
