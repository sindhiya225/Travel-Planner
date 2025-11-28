import React, { useState, useRef } from "react";
import Modal from "react-modal";
import TripForm from "./TripForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const EditTrip = ({
  tripId,
  tripName,
  description,
  location,
  startDate,
  endDate,
}) => {
  const subtitleRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <span className="mx-2">
      <FontAwesomeIcon
        icon={faPencil}
        type="button"
        className="btn btn-outline-dark"
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Edit Trip"
        style={customStyles}
      >
        <h4 className="fs-4" ref={subtitleRef}>
          Edit Trip
        </h4>
        <TripForm
          tripId={tripId}
          tripName={tripName}
          description={description}
          location={location}
          startDate={startDate}
          endDate={endDate}
        />
        <button className="btn btn-outline-danger my-3" onClick={closeModal}>
          Cancel
        </button>
      </Modal>
    </span>
  );
};

export default EditTrip;