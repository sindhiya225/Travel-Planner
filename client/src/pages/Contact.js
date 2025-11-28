import React, { useEffect } from "react";

// Import Bootstrap and its CSS
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS bundle

// Import multiple images for the banner (you'll need to add these to your assets folder)
import image1 from "../assets/paris.jpg"; // Replace with your image paths
import image2 from "../assets/switzerland.jpeg";
import image3 from "../assets/ireland.jpeg";
import image4 from "../assets/china.jpeg";

const Contact = () => {
  // Array of images for the banner
  const bannerImages = [
    { src: image1, alt: "Paris" },
    { src: image2, alt: "Switzerland" },
    { src: image3, alt: "Ireland" },
    { src: image4, alt: "China" },
  ];

  useEffect(() => {
    // Initialize Bootstrap carousel
    const carousel = document.querySelector('#contactCarousel');
    if (carousel) {
      new bootstrap.Carousel(carousel, {
        interval: 2000, // Reduced autoplay to 2 seconds
        ride: 'carousel', // Automatically start cycling
      });
    }
  }, []);

  return (
    <div className="container mt-2">
      <h2 className="display-6 text-center">Contact</h2>

      {/* Banner Section (Carousel) */}
      <div id="contactCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
        <div className="carousel-inner">
          {bannerImages.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={image.src}
                alt={image.alt}
                className="d-block w-100"
                style={{ height: "500px", objectFit: "contain" }} // Maintains full image with increased height
              />
            </div>
          ))}
        </div>

        {/* Custom Navigation Buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#contactCarousel"
          data-bs-slide="prev"
          style={{
            position: 'absolute',
            bottom: '10px', // Positioned at the bottom edge of the banner
            left: '50%',
            transform: 'translateX(-40px) translateY(340px)', // Adjusted to reduce distance
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            backdropFilter: 'blur(5px)',
            color: 'white',
            fontSize: '20px',
            zIndex: 10,
          }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#contactCarousel"
          data-bs-slide="next"
          style={{
            position: 'absolute',
            bottom: '10px', // Positioned at the bottom edge of the banner
            left: '50%',
            transform: 'translateX(10px) translateY(340px)', // Adjusted to reduce distance
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            backdropFilter: 'blur(5px)',
            color: 'white',
            fontSize: '20px',
            zIndex: 10,
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* "OUR TEAM" Text After Banner */}
      <div className="text-center mb-3">
        <h3 className="text-dark">OUR TEAM</h3>
      </div>

      {/* Contact Information Section */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-4 text-center">
          <h2 className="display-6">Shyam GK</h2>
          <a
            href={"https://github.com/Shyam-GK"}
            className="link-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shyam GK's Github
          </a>
        </div>
        <div className="col-md-4 text-center">
          <h2 className="display-6">Sindhya</h2>
          <a
            href={"https://github.com/sindhya"}
            className="link-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sindhya's Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;