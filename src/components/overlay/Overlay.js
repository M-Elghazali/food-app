// OverlayBox.js
import React from "react";
import "./OverlayBox.css";

const OverlayBox = ({ children, onClose }) => {
  return (
    <div className="overlay-box">
      <div className="overlay-backdrop" onClick={onClose}></div>
      <div className="box-content">
        {children}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default OverlayBox;
