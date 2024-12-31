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

  const sampleData = [
    {
      latitude: 51.456430000000005,
      longitude: -0.17719000000000001,
      trafficLevel: 54,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.16719,
      trafficLevel: 15,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.15719,
      trafficLevel: 7,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.14719,
      trafficLevel: 40,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.13718999999999998,
      trafficLevel: 11,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.12718999999999997,
      trafficLevel: 40,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.11718999999999997,
      trafficLevel: 104,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.10718999999999998,
      trafficLevel: 13,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.09718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.08718999999999999,
      trafficLevel: 7,
    },
    {
      latitude: 51.456430000000005,
      longitude: -0.07719,
      trafficLevel: 17,
    },
    {
      latitude: 51.46643,
      longitude: -0.17719000000000001,
      trafficLevel: 0,
    },
    {
      latitude: 51.46643,
      longitude: -0.16719,
      trafficLevel: 125,
    },
    {
      latitude: 51.46643,
      longitude: -0.15719,
      trafficLevel: 49,
    },
    {
      latitude: 51.46643,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.46643,
      longitude: -0.13718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.46643,
      longitude: -0.12718999999999997,
      trafficLevel: 8,
    },
    {
      latitude: 51.46643,
      longitude: -0.11718999999999997,
      trafficLevel: -1,
    },
    {
      latitude: 51.46643,
      longitude: -0.10718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.46643,
      longitude: -0.09718999999999998,
      trafficLevel: 20,
    },
    {
      latitude: 51.46643,
      longitude: -0.08718999999999999,
      trafficLevel: 0,
    },
    {
      latitude: 51.46643,
      longitude: -0.07719,
      trafficLevel: 0,
    },
    {
      latitude: 51.47643,
      longitude: -0.17719000000000001,
      trafficLevel: -5,
    },
    {
      latitude: 51.47643,
      longitude: -0.16719,
      trafficLevel: 21,
    },
    {
      latitude: 51.47643,
      longitude: -0.15719,
      trafficLevel: 0,
    },
    {
      latitude: 51.47643,
      longitude: -0.14719,
      trafficLevel: -5,
    },
    {
      latitude: 51.47643,
      longitude: -0.13718999999999998,
      trafficLevel: 15,
    },
    {
      latitude: 51.47643,
      longitude: -0.12718999999999997,
      trafficLevel: 36,
    },
    {
      latitude: 51.47643,
      longitude: -0.11718999999999997,
      trafficLevel: 27,
    },
    {
      latitude: 51.47643,
      longitude: -0.10718999999999998,
      trafficLevel: 42,
    },
    {
      latitude: 51.47643,
      longitude: -0.09718999999999998,
      trafficLevel: 11,
    },
    {
      latitude: 51.47643,
      longitude: -0.08718999999999999,
      trafficLevel: 0,
    },
    {
      latitude: 51.47643,
      longitude: -0.07719,
      trafficLevel: 46,
    },
    {
      latitude: 51.48643,
      longitude: -0.17719000000000001,
      trafficLevel: 5,
    },
    {
      latitude: 51.48643,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.48643,
      longitude: -0.15719,
      trafficLevel: 0,
    },
    {
      latitude: 51.48643,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.48643,
      longitude: -0.13718999999999998,
      trafficLevel: 29,
    },
    {
      latitude: 51.48643,
      longitude: -0.12718999999999997,
      trafficLevel: 16,
    },
    {
      latitude: 51.48643,
      longitude: -0.11718999999999997,
      trafficLevel: -11,
    },
    {
      latitude: 51.48643,
      longitude: -0.10718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.48643,
      longitude: -0.09718999999999998,
      trafficLevel: 50,
    },
    {
      latitude: 51.48643,
      longitude: -0.08718999999999999,
      trafficLevel: 20,
    },
    {
      latitude: 51.48643,
      longitude: -0.07719,
      trafficLevel: 9,
    },
    {
      latitude: 51.49643,
      longitude: -0.17719000000000001,
      trafficLevel: 0,
    },
    {
      latitude: 51.49643,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.49643,
      longitude: -0.15719,
      trafficLevel: 35,
    },
    {
      latitude: 51.49643,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.49643,
      longitude: -0.13718999999999998,
      trafficLevel: 52,
    },
    {
      latitude: 51.49643,
      longitude: -0.12718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.49643,
      longitude: -0.11718999999999997,
      trafficLevel: 33,
    },
    {
      latitude: 51.49643,
      longitude: -0.10718999999999998,
      trafficLevel: 44,
    },
    {
      latitude: 51.49643,
      longitude: -0.09718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.49643,
      longitude: -0.08718999999999999,
      trafficLevel: 98,
    },
    {
      latitude: 51.49643,
      longitude: -0.07719,
      trafficLevel: 122,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.17719000000000001,
      trafficLevel: 0,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.15719,
      trafficLevel: 25,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.14719,
      trafficLevel: 30,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.13718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.12718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.11718999999999997,
      trafficLevel: -5,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.10718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.09718999999999998,
      trafficLevel: 3,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.08718999999999999,
      trafficLevel: 68,
    },
    {
      latitude: 51.506429999999995,
      longitude: -0.07719,
      trafficLevel: 52,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.17719000000000001,
      trafficLevel: 0,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.15719,
      trafficLevel: 11,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.13718999999999998,
      trafficLevel: 9,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.12718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.11718999999999997,
      trafficLevel: 43,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.10718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.09718999999999998,
      trafficLevel: -11,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.08718999999999999,
      trafficLevel: -8,
    },
    {
      latitude: 51.51642999999999,
      longitude: -0.07719,
      trafficLevel: 20,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.17719000000000001,
      trafficLevel: 16,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.15719,
      trafficLevel: 0,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.13718999999999998,
      trafficLevel: 45,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.12718999999999997,
      trafficLevel: 34,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.11718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.10718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.09718999999999998,
      trafficLevel: 45,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.08718999999999999,
      trafficLevel: 21,
    },
    {
      latitude: 51.52642999999999,
      longitude: -0.07719,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.17719000000000001,
      trafficLevel: 6,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.16719,
      trafficLevel: 7,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.15719,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.14719,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.13718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.12718999999999997,
      trafficLevel: -3,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.11718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.10718999999999998,
      trafficLevel: 20,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.09718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.08718999999999999,
      trafficLevel: 0,
    },
    {
      latitude: 51.53642999999999,
      longitude: -0.07719,
      trafficLevel: 0,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.17719000000000001,
      trafficLevel: 9,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.15719,
      trafficLevel: 15,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.14719,
      trafficLevel: -21,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.13718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.12718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.11718999999999997,
      trafficLevel: -2,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.10718999999999998,
      trafficLevel: 15,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.09718999999999998,
      trafficLevel: 6,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.08718999999999999,
      trafficLevel: 5,
    },
    {
      latitude: 51.54642999999999,
      longitude: -0.07719,
      trafficLevel: 0,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.17719000000000001,
      trafficLevel: 21,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.16719,
      trafficLevel: 0,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.15719,
      trafficLevel: 0,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.14719,
      trafficLevel: -4,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.13718999999999998,
      trafficLevel: 1,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.12718999999999997,
      trafficLevel: 0,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.11718999999999997,
      trafficLevel: 59,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.10718999999999998,
      trafficLevel: 17,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.09718999999999998,
      trafficLevel: 0,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.08718999999999999,
      trafficLevel: 18,
    },
    {
      latitude: 51.556429999999985,
      longitude: -0.07719,
      trafficLevel: -2,
    },
  ];

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
      // setCityCentre({ lat: 51.50739, lng: -0.127696});
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
        const trafficData = await response.json();

        const data = trafficData.map((item) => ({
          ...item,
          trafficLevel: item.trafficLevel < 0 ? 0 : item.trafficLevel, // Treat negative traffic as 0
        }));

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
            Math.max(
              0,
              (trafficPoint.trafficLevel - minTraffic) /
                (maxTraffic - minTraffic)
            ), // Normalize traffic level for heatmap
          ])
        );
        return data.map((trafficPoint) => [
          trafficPoint.latitude,
          trafficPoint.longitude,
          Math.max(
            0,
            (trafficPoint.trafficLevel - minTraffic) / (maxTraffic - minTraffic)
          ), // Normalize traffic level for heatmap
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
              const mapInstance = L.map("map", {
                center: [cityCentre.lat, cityCentre.lng],
                zoom:12, // Set the initial zoom level
                zoomControl: false, // Disable the zoom control buttons
                minZoom: 12, // Set a fixed min zoom level
                maxZoom: 12, // Set a fixed max zoom level (no zooming in/out)
              });

              L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                  maxZoom: 12,
                  attribution: "© OpenStreetMap",
                }
              ).addTo(mapInstance);

              mapRef.current = mapInstance;
      } else {
        mapRef.current.setView([cityCentre.lat, cityCentre.lng], 12.4);
      }

      // Fetch and render traffic data
      fetchTrafficData(city).then((heatmapData) => {
        console.log("Heatmap Data:", heatmapData);
        if (heatmapLayer) {
          heatmapLayer.remove();
          mapRef.current.removeLayer(heatmapLayer);
        }
        const newHeatmapLayer = L.heatLayer(heatmapData, {
          radius: 20,
          blur: 5, // Smooth transitions
          gradient: {
            0.0: "lightblue",
            0.20: "blue",
            0.40:"darkblue",
            0.50: "yellow",
            0.70:"orange",
            0.90:"red",
            1.0: "darkred",
          },
          opacity:0.5,
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
