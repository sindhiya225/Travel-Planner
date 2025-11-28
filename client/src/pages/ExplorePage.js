// client/src/pages/ExplorePage.js
import React, { useEffect, useRef, useState } from "react";
import "../style/explore.css";

const ExplorePage = () => {
  const mapRef = useRef(null);
  const GEOAPIFY_API_KEY = "ad4670aa39614843b216f5ad8223986b";
  const GOOGLE_MAPS_API_KEY = "AIzaSyBHrhq0c96xL_cQmMX_NkPhAxZMYd5IF5A";

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [placeMarkers, setPlaceMarkers] = useState([]);
  const [currentPlaces, setCurrentPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noPlaces, setNoPlaces] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Check if Google Maps API is already loaded
  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
    }
  }, []);

  // Load Google Maps API if not already loaded
  useEffect(() => {
    if (googleMapsLoaded) {
      // Google Maps already loaded, initialize the map
      initMap();
      return;
    }

    // Prevent loading the script multiple times
    if (document.getElementById('google-maps-script')) {
      return;
    }

    const script = document.createElement("script");
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      setGoogleMapsLoaded(true);
      initMap();
    };
    script.onerror = (e) => {
      console.error("Failed to load Google Maps API:", e);
      setError("Failed to load Google Maps API. Check your API key and internet connection.");
    };

    document.head.appendChild(script);

    return () => {
      // Script cleanup is optional as we don't want to remove it if others need it
    };
  }, [googleMapsLoaded]);

  // This effect will run when selectedCategory changes, but only if map is initialized
  useEffect(() => {
    if (map && marker && marker.getPosition()) {
      getNearbyPlaces(marker.getPosition());
    }
  }, [selectedCategory, map]);

  const initMap = () => {
    console.log("Initializing map...");
    if (!mapRef.current) {
      console.error("Map ref is not available");
      setError("Map container not found. Please refresh the page.");
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error("Google Maps not loaded yet");
      setError("Google Maps not loaded. Please refresh the page.");
      return;
    }

    try {
      console.log("Creating map instance");
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 },  // New York City
        zoom: 12,
      });

      newMap.addListener("click", (event) => {
        placeMarker(event.latLng, newMap);
        getNearbyPlaces(event.latLng);
      });

      // Set map state with new map instance
      setMap(newMap);
      setIsMapLoaded(true);
      setError(null);
      console.log("Map initialized successfully");
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Error initializing map: " + err.message);
    }
  };

  const placeMarker = (location, mapInstance) => {
    // Use passed map instance or state map
    const mapToUse = mapInstance || map;
    
    if (!mapToUse || !location) {
      console.error("Cannot place marker: map or location not available");
      return;
    }

    try {
      if (marker) {
        marker.setPosition(location);
      } else {
        const newMarker = new window.google.maps.Marker({
          position: location,
          map: mapToUse,
          animation: window.google.maps.Animation.DROP,
        });
        setMarker(newMarker);
      }

      if (infowindow) infowindow.close();
      
      const newInfowindow = new window.google.maps.InfoWindow({
        content: "Selected Location",
      });
      
      if (marker) {
        newInfowindow.open(mapToUse, marker);
      } else {
        // There might be a timing issue, so we open it after the marker state is updated
        setTimeout(() => {
          if (newInfowindow && marker) {
            newInfowindow.open(mapToUse, marker);
          }
        }, 100);
      }
      
      setInfowindow(newInfowindow);

      if (mapToUse.getZoom() < 12) mapToUse.setZoom(14);
      mapToUse.panTo(location);
    } catch (err) {
      console.error("Error placing marker:", err);
      setError("Error placing marker: " + err.message);
    }
  };

  const getCategoryString = () => {
    switch (selectedCategory) {
      case "catering": return "catering";
      case "accommodation": return "accommodation";
      case "tourism": return "tourism";
      case "commercial": return "commercial";
      case "transportation": return "transportation";
      case "entertainment": return "entertainment";
      case "healthcare": return "healthcare";
      case "education": return "education";
      default: return "catering,accommodation,tourism";
    }
  };

  const clearPlaceMarkers = () => {
    placeMarkers.forEach((marker) => {
      if (marker) marker.setMap(null);
    });
    setPlaceMarkers([]);
  };

  const isValidLocation = (location) => {
    return (
      location && 
      typeof location === 'object' && 
      typeof location.lat === 'function' && 
      typeof location.lng === 'function'
    );
  };

  const getNearbyPlaces = async (location) => {
    if (!isMapLoaded || !map) {
      console.error("Map not initialized:", { isMapLoaded, mapExists: !!map });
      setError("Map not initialized. Please refresh the page.");
      setLoading(false);
      return;
    }

    if (!isValidLocation(location)) {
      console.error("Invalid location object:", location);
      setLoading(false);
      return;
    }

    const radius = 5000;
    const category = getCategoryString();
    clearPlaceMarkers();
    setLoading(true);
    setError(null);
    setNoPlaces(false);

    try {
      const lat = location.lat();
      const lng = location.lng();
      
      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Invalid coordinates");
      }

      const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(category)}&filter=circle:${lng},${lat},${radius}&limit=200&apiKey=${GEOAPIFY_API_KEY}`;

      console.log("Fetching nearby places...");
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.features || !Array.isArray(data.features)) {
        throw new Error("Invalid API response format");
      }

      const filteredPlaces = data.features.filter(
        (place) => place.properties?.name && place.geometry?.coordinates
      );

      if (filteredPlaces.length === 0) {
        setNoPlaces(true);
        setCurrentPlaces([]);
      } else {
        setCurrentPlaces(filteredPlaces);
        calculateDistances(filteredPlaces, location);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setError(error.message || "Unable to fetch places. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDistances = (places, userLocation) => {
    if (!places?.length || !isValidLocation(userLocation)) {
      console.error("Cannot calculate distances: invalid places or user location");
      return;
    }
    
    if (!window.google?.maps?.geometry?.spherical) {
      console.error("Google Maps geometry library not available");
      return;
    }

    try {
      const placesWithDistances = places.map((place) => {
        const coords = place.geometry.coordinates;
        const placeLatLng = new window.google.maps.LatLng(coords[1], coords[0]);
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          userLocation,
          placeLatLng
        );
        return {
          ...place,
          distance: Math.round(distance),
          travelTime: Math.round(distance / 833), // Rough estimate walking speed
        };
      });
      setCurrentPlaces(placesWithDistances.sort((a, b) => a.distance - b.distance));
    } catch (err) {
      console.error("Error calculating distances:", err);
      // Still show places without distance information
      setCurrentPlaces(places);
    }
  };

  const getCategoryName = (categories) => {
    if (!categories || !Array.isArray(categories)) return "Place";
    const categoryParts = categories[0].split(".");
    return categoryParts.length >= 2
      ? capitalizeFirstLetter(categoryParts[1])
      : "Place";
  };

  const getCategoryIcon = (categories) => {
    if (!categories || !Array.isArray(categories)) return "📍";
    const cats = categories[0];
    if (cats.includes("catering")) return "🍽️";
    if (cats.includes("accommodation")) return "🏨";
    if (cats.includes("tourism")) return "🏛️";
    if (cats.includes("commercial")) return "🛒";
    if (cats.includes("entertainment")) return "🎭";
    if (cats.includes("healthcare")) return "🏥";
    if (cats.includes("education")) return "🏫";
    if (cats.includes("transportation")) return "🚆";
    return "📍";
  };

  const capitalizeFirstLetter = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  const handlePlaceClick = (place) => {
    if (!map) {
      console.error("Cannot handle place click: map not initialized");
      return;
    }
    
    try {
      const coords = place.geometry.coordinates;
      const placeLatLng = new window.google.maps.LatLng(coords[1], coords[0]);
      map.setCenter(placeLatLng);
      map.setZoom(16);

      const placeMarker = new window.google.maps.Marker({
        position: placeLatLng,
        map,
        title: place.properties.name,
        animation: window.google.maps.Animation.DROP,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
      });
      setPlaceMarkers((prev) => [...prev, placeMarker]);

      const placeInfo = new window.google.maps.InfoWindow({
        content: `<div><h3>${place.properties.name}</h3><p>${place.properties.formatted}</p></div>`,
      });
      placeMarker.addListener("click", () => placeInfo.open(map, placeMarker));
    } catch (err) {
      console.error("Error handling place click:", err);
    }
  };

  const handleDownload = () => {
    if (currentPlaces.length === 0) return;

    try {
      const categoryName =
        document.getElementById("category-select")?.selectedOptions[0]?.text || "Places";
      let manualContent = `Traveler's Manual: Nearby ${categoryName}\n`;
      manualContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
      manualContent += "Places to Explore:\n----------------\n\n";

      currentPlaces.forEach((place, index) => {
        const name = place.properties.name || "Unnamed Place";
        const address = place.properties.formatted || "No address";
        const category = getCategoryName(place.properties.categories);
        const distance = place.distance ? `${(place.distance / 1000).toFixed(2)} km` : "N/A";
        const travelTime = place.travelTime || "N/A";
        const coords = place.geometry.coordinates;

        manualContent += `${index + 1}. ${name}\n`;
        manualContent += `   Category: ${category}\n   Address: ${address}\n   Distance: ${distance}\n   Travel Time: ${travelTime} minutes (approx.)\n   Coordinates: Lat ${coords[1]}, Lon ${coords[0]}\n\n`;
      });

      manualContent += "Travel Tips:\n------------\n- Plan your route based on distances and travel times.\n- Check local hours and availability before visiting.\n- Bring water and a map for a smooth journey!\n";

      const blob = new Blob([manualContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "traveler_manual.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating download:", err);
      setError("Error generating download: " + err.message);
    }
  };

  return (
    <div className="explore-container">
      <h1>Nearby Places Finder</h1>
      <div className="controls-container">
        <div className="filter-controls">
          <div>
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="catering">Restaurants & Cafes</option>
              <option value="accommodation">Hotels & Accommodation</option>
              <option value="tourism">Tourist Attractions</option>
              <option value="commercial">Shopping</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>
          <button
            id="download-btn"
            onClick={handleDownload}
            style={{ display: currentPlaces.length > 0 ? "block" : "none" }}
          >
            Download Manual
          </button>
        </div>
      </div>
      <p className="instructions">Click anywhere on the map to find nearby places</p>
      <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
      <div id="places-list">
        {loading ? (
          <div className="message loading">
            <p>Searching for nearby places...</p>
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="message error">
            <p>{error}</p>
          </div>
        ) : noPlaces ? (
          <div className="message">
            <p>No places found in this area. Try another location or category.</p>
          </div>
        ) : currentPlaces.length === 0 ? (
          <div className="message">
            <p>Select a location on the map to see nearby places</p>
          </div>
        ) : (
          <>
            <h2>
              Found {currentPlaces.length} Nearby{" "}
              {document.getElementById("category-select")?.selectedOptions[0]?.text || "Places"}
            </h2>
            {currentPlaces.map((place, index) => {
              if (!place.properties || !place.geometry) return null;

              const name = place.properties.name || "Unnamed Place";
              const address = place.properties.formatted || "No address";
              const category = getCategoryName(place.properties.categories);
              const icon = getCategoryIcon(place.properties.categories);
              const distanceText = place.distance
                ? `Distance: ${(place.distance / 1000).toFixed(2)} km`
                : "Distance: calculating...";
              const timeText = place.travelTime
                ? `Travel Time: ${place.travelTime} minutes`
                : "Time: calculating...";

              return (
                <div
                  key={index}
                  className="place-item"
                  onClick={() => handlePlaceClick(place)}
                >
                  <div className="place-header">
                    <span className="place-icon">{icon}</span>
                    <h3>{name}</h3>
                  </div>
                  <p className="category">{category}</p>
                  <p className="address">{address}</p>
                  <div className="details">
                    <p className="detail"><strong>{distanceText}</strong></p>
                  </div>
                  <p className="detail"><strong>{timeText}</strong></p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;