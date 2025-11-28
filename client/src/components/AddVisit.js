import React, { useState, useRef } from "react";
import Modal from "react-modal";
import PlanForm from "./PlanForm";

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

const AddVisit = ({ category }) => {
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
        className="btn-lg grey-button"
        onClick={openModal}
      >
        Add New
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Visit"
      >
        <h4 className="fs-4" ref={subtitleRef}>
          Add a new visit
        </h4>
        <PlanForm category={category} />
        <button
          type="button"
          className="btn btn-outline-danger my-2"
          onClick={closeModal}
        >
          close
        </button>
      </Modal>
    </div>
  );
};

export default AddVisit;