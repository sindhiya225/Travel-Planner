import React, { useState, useRef } from "react"; // Add useRef
import Modal from "react-modal";

import TripForm from "./TripForm";

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

const AddTrip = () => {
  const subtitleRef = useRef(null); // Create a ref for the subtitle

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00"; // Use the ref to set the style
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <span>
      <button
        type="button"
        className="grey-button btn-lg"
        onClick={openModal}
      >
        Add trip
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Trip"
      >
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <h4 className="fs-4" ref={subtitleRef}>
              Add a new trip
            </h4>
            <TripForm />
            <button className="btn btn-outline-danger" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </span>
  );
};

export default AddTrip;