// ColdEmailButton.js
import React from 'react';

const ColdEmailButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: 'transparent', // Transparent background
        color: '#f06292', // Pink text color
        border: '2px solid #f06292', // Transparent border with pink color
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s', // Smooth transition for color change
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f06292'; // Pink background on hover
        e.target.style.color = '#ffffff'; // White text on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent'; // Transparent background on hover out
        e.target.style.color = '#f06292'; // Pink text on hover out
      }}
    >
      {label}
    </button>
  );
};

export default ColdEmailButton;
