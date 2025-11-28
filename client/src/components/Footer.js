import React from "react";
import NavBar from "./NavBar";

const styles = {
  footer: {
    background: "white",
  
 }}

const Footer = () => {
  return (
    <footer className="footer navbar-fixed-bottom mb-2 mt-auto border-top pt-2" style={styles.footer}>
      <p className="text-center text-muted">&copy; Travel Planner</p>
    </footer>
  );
};

export default Footer;
