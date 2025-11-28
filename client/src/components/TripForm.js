// client/src/components/TripForm.js
import React, { useState } from "react";
import Auth from "../utils/auth";
import AddTripButton from "./AddTripButton";
import EditTripButton from "./EditTripButton";
import MapComponent from "./MapComponent";

const userId = Auth.getUser()?.data?._id;

const TripForm = ({
  tripId,
  tripName,
  description,
  location,
  startDate,
  endDate,
}) => {
  const [formState, setFormState] = useState({
    tripName: tripName || "",
    description: description || "",
    location: location || "",
    startDate: startDate || "",
    endDate: endDate || "",
    userId: userId || "",
  });
  const [selectedLocations, setSelectedLocations] = useState({ origin: null, destination: null });

  let button;
  if (tripId) {
    button = <EditTripButton formState={formState} tripId={tripId} />;
  } else {
    button = <AddTripButton formState={formState} />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Changing ${name} to ${value}`);
    setFormState((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      console.log("New formState:", newState);
      return newState;
    });
  };

  const resetValidation = (e) => {
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
  };

  const validation = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.add("is-valid");
    }
  };

  const handleLocationSelect = (locations) => {
    setSelectedLocations((prev) => ({ ...prev, ...locations }));
    if (locations.destination) {
      setFormState((prev) => ({
        ...prev,
        location: `${locations.destination.lat()},${locations.destination.lng()}`,
      }));
    }
  };

  return (
    <div className="mx-3" style={{ height: "100vh", overflowY: "auto" }}>
      <form className="m-3">
        <div className="mb-2">
          <label htmlFor="tripName" className="form-label">
            Trip Name
          </label>
          <input
            id="tripName"
            name="tripName"
            placeholder="Trip name"
            value={formState.tripName}
            className="form-control"
            onChange={handleChange}
            type="text"
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="tripDesc" className="form-label">
            Description
          </label>
          <textarea
            id="tripDesc"
            name="description"
            placeholder="What's the occasion?"
            value={formState.description}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          ></textarea>
          <div className="invalid-feedback">Tell me more..</div>
        </div>
        <div className="mb-2">
          <label htmlFor="location" className="form-label">
            Location (Selected via Map)
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Select origin and destination on the map"
            value={formState.location}
            className="form-control"
            readOnly
          />
        </div>
        <div className="mb-2">
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>
        <div className="mb-2">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formState.startDate}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">Start date required..</div>
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={formState.endDate}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
            disabled={!formState.startDate}
            min={formState.startDate}
          />
          <div className="invalid-feedback">End date required</div>
        </div>
        <div>{button}</div>
      </form>
    </div>
  );
};

export default TripForm;