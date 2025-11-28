import React, { useState, useRef } from "react";
import Modal from "react-modal";
import FactForm from "./FactForm";
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

const EditFact = ({ factId, description }) => {
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
    <div>
      <FontAwesomeIcon
        icon={faPencil}
        type="button"
        onClick={openModal}
        className="btn"
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Edit Fact"
        style={customStyles}
      >
        <h4 className="fs-4" ref={subtitleRef}>
          Edit Fact
        </h4>
        <FactForm factId={factId} description={description} />
        <button className="btn btn-outline-danger my-3" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default EditFact;