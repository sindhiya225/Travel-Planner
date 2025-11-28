// src/components/ImageCard.js
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_IMAGE } from "../utils/mutations";
import { QUERY_TRIP } from "../utils/queries";

const ImageCard = ({ images, tripId }) => {
  const [deleteImage] = useMutation(DELETE_IMAGE);

  const handleDelete = async (imageId) => {
    try {
      await deleteImage({
        variables: { tripId, imageId },
        refetchQueries: [{ query: QUERY_TRIP, variables: { tripId } }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {images.length === 0 ? (
          <p>No images uploaded yet</p>
        ) : (
          images.map((image) => (
            <div key={image._id} className="mb-3 border p-2">
              <img
                src={image.url}
                alt={image.description || "Trip image"}
                className="img-fluid mb-2"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
              {image.description && (
                <p className="small">{image.description}</p>
              )}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(image._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageCard;