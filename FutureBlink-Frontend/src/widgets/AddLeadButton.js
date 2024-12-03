// CustomButton.js
import React from 'react';

const AddLeadButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: 'transparent', // Transparent background
        color: '#9c27b0', // Purple text color
        border: '2px solid #9c27b0', // Transparent border with purple color
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s', // Smooth transition for color change
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#9c27b0'; // Purple background on hover
        e.target.style.color = '#ffffff'; // White text on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent'; // Transparent background on hover out
        e.target.style.color = '#9c27b0'; // Purple text on hover out
      }}
    >
      {label}
    </button>
  );
};

export default AddLeadButton;
