import React, { useState, useRef } from "react";
import Modal from "react-modal";

import FactForm from "./FactForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Added for responsive width
    maxWidth: "600px", // Added for maximum width
    padding: "20px", // Added for better spacing
  },
};

Modal.setAppElement("#root");

const AddFact = () => {
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
    <div className="d-grid">
      <button
        type="button"
        className="grey-button btn-lg"
        onClick={openModal}
      >
        Add New
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Fact" // Updated contentLabel to match the purpose
      >
        <h4 className="fs-4" ref={subtitleRef}>
          Add a new fact
        </h4>
        <FactForm />
        <button className="btn btn-outline-danger my-3" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default AddFact;