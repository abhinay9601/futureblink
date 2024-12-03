// DeleteNodeButton.js
import React from 'react';

const DeleteNodeButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: 'transparent', // Transparent background
        color: '#d32f2f', // Red text color
        border: '2px solid #d32f2f', // Transparent border with red color
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s', // Smooth transition for color change
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#d32f2f'; // Red background on hover
        e.target.style.color = '#ffffff'; // White text on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent'; // Transparent background on hover out
        e.target.style.color = '#d32f2f'; // Red text on hover out
      }}
    >
      {label}
    </button>
  );
};

export default DeleteNodeButton;
