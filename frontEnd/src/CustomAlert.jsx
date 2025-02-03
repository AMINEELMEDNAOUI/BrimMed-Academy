import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ type, message, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-header">
        <span className="company-name">BRIM&MED ACADEMY</span>
        <button className="alert-close" onClick={onClose}>&times;</button>
      </div>
      <span className="alert-message">{message}</span>
    </div>
  );
};

export default CustomAlert;
