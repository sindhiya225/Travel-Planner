// client/src/components/MapComponent.js
import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const mapInitialized = useRef(false); // Prevent multiple initializations

  useEffect(() => {
    if (mapInitialized.current) return; // Only initialize once

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 11.034717250055694, lng: 77.01553344726562 },
        zoom: 10,
        mapTypeControl: false, // Optional: cleaner UI
      });

      const geocoder = new window.google.maps.Geocoder();
      const service = new window.google.maps.DistanceMatrixService();
      const markersArray = [];

      map.addListener("click", (event) => {
        const clickedLocation = event.latLng;
        const choice = prompt("Is this an origin or destination? (Type 'origin' or 'destination')");

        if (choice === "origin") {
          setOrigin(clickedLocation);
          onLocationSelect({ origin: clickedLocation });
        } else if (choice === "destination") {
          setDestination(clickedLocation);
          onLocationSelect({ destination: clickedLocation });
        } else {
          alert("Invalid choice. Please type 'origin' or 'destination'.");
        }

        if (origin && choice === "destination") {
          const request = {
            origins: [origin],
            destinations: [clickedLocation],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          };

          service.getDistanceMatrix(request).then((response) => {
            const element = response.rows[0].elements[0];
            if (element.status === "OK") {
              setDistance(element.distance.text);
              setDuration(element.duration.text);
            }
          });
        }
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBHrhq0c96xL_cQmMX_NkPhAxZMYd5IF5A&callback=initMap`;
      script.async = true;
      window.initMap = initMap;
      document.body.appendChild(script);
    }

    mapInitialized.current = true;
  }, [origin, onLocationSelect]); // Dependencies ensure updates only when needed

  return (
    <div style={{ overflow: "auto" }}>
      <div ref={mapRef} style={{ height: "300px", width: "100%" }}></div>
      {distance && duration && (
        <div className="mt-2">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;