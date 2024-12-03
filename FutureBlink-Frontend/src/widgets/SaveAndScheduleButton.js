// SaveAndScheduleButton.js
import React from 'react';

const SaveAndScheduleButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: 'transparent', // Transparent background
        color: '#1976d2', // Blue text color
        border: '2px solid #1976d2', // Transparent border with blue color
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s', // Smooth transition for color change
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#1976d2'; // Blue background on hover
        e.target.style.color = '#ffffff'; // White text on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent'; // Transparent background on hover out
        e.target.style.color = '#1976d2'; // Blue text on hover out
      }}
    >
      {label}
    </button>
  );
};

export default SaveAndScheduleButton;
