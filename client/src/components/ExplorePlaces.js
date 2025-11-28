// client/src/components/ExplorePlaces.js
import React, { useEffect, useRef, useState } from "react";

const ExplorePlaces = ({ destination }) => {
  const mapRef = useRef(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: destination ? { lat: destination.lat(), lng: destination.lng() } : { lat: 0, lng: 0 },
        zoom: destination ? 12 : 2,
      });

      let marker;
      if (destination) {
        marker = new window.google.maps.Marker({
          position: destination,
          map: map,
        });
      }

      const getNearbyPlaces = async (location) => {
        const apiKey = "4573aff3bc7b46e1942d90f60093e017";
        const radius = 5000;
        const categories = "catering.restaurant,accommodation.hotel,tourism.sights";
        const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${location.lng()},${location.lat()},${radius}&limit=20&apiKey=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const filteredPlaces = data.features.filter((place) => place.properties.name);
          const placesWithDetails = await Promise.all(
            filteredPlaces.map(async (place) => {
              const details = await getPlaceDetails(location, place.geometry.coordinates);
              return { ...place, distance: details.distance, travelTime: details.travelTime };
            })
          );
          setPlaces(placesWithDetails);
        } catch (error) {
          console.error("Error fetching nearby places:", error);
        }
      };

      const getPlaceDetails = async (origin, destination) => {
        const apiKey = "4573aff3bc7b46e1942d90f60093e017";
        const [destLng, destLat] = destination;
        const [originLng, originLat] = [origin.lng(), origin.lat()];
        const url = `https://api.geoapify.com/v1/routing?waypoints=${originLat},${originLng}|${destLat},${destLng}&mode=drive&apiKey=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const route = data.features[0];
          const distance = route.properties.distance;
          const travelTime = Math.ceil(route.properties.time / 60);
          return { distance, travelTime };
        } catch (error) {
          return { distance: "N/A", travelTime: "N/A" };
        }
      };

      if (destination) {
        getNearbyPlaces(destination);
      }
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
  }, [destination]);

  return (
    <div>
      <div ref={mapRef} style={{ height: "400px", width: "100%", marginBottom: "20px" }}></div>
      <div id="places-list">
        {places.map((place, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
            <h3>{place.properties.name || "Unnamed Place"}</h3>
            <p>Distance: {place.distance !== "N/A" ? `${place.distance} meters` : "N/A"}</p>
            <p>Travel Time: {place.travelTime !== "N/A" ? `${place.travelTime} minutes` : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePlaces;