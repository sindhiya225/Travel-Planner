// src/components/AddImage.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_IMAGE } from "../utils/mutations";
import { QUERY_TRIP } from "../utils/queries";

const AddImage = ({ tripId }) => {
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [addImage, { error }] = useMutation(ADD_IMAGE);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addImage({
        variables: {
          tripId,
          image: imageFile,
          description,
        },
        refetchQueries: [{ query: QUERY_TRIP, variables: { tripId } }],
      });
      setImageFile(null);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="imageDescription">Description</label>
          <textarea
            id="imageDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Add a description for your image"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={!imageFile}
        >
          Upload Image
        </button>
      </form>
      {error && <p className="text-danger mt-2">Error uploading image: {error.message}</p>}
    </div>
  );
};

export default AddImage;