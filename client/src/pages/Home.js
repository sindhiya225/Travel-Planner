import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import video from "../assets/Travel_Planner_Background_Compressed.mp4";
import backgroundImage from "../assets/background-pic.jpg";
import "../style/video.css";

import Auth from "../utils/auth";

const Home = () => {
  const userId = Auth.getUser()?.data?.username;

  return (
    <div className="video-container" style={{ height: "80vh" }}>
      <video 
        autoPlay={true} 
        muted={true} 
        loop={true} 
        src={video}
        style={{ height: "85vh", objectFit: "cover" }}
      ></video>
      <div className="content d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
        <div className="container">
          <div 
            className="p-5 mb-4 rounded-3 glass-panel mx-auto"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '800px',
              textAlign: 'center'
            }}
          >
            {/* Overlay div for blur effect */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                zIndex: 1
              }}
            ></div>
            
            {/* Content positioned above the blur */}
            <div className="container-fluid py-5" style={{ position: 'relative', zIndex: 2 }}>
              <h1 className="display-2 fw-bold">Travel Planner</h1>
              <p className="fs-4 mx-auto" style={{ maxWidth: '600px' }}>
                Never miss that recommendation again
              </p>
              {userId ? (
                <Link to={`/users/${userId}`}>
                  <button type="button" className="grey-button btn-lg">
                    {userId.toUpperCase()}'s Trips
                  </button>
                </Link>
              ) : (
                <Link to={`/login`}>
                  <button type="button" className="grey-button btn-lg">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;