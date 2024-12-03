
import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const WaitDelayNode = ({ data }) => {
  const [delayDuration, setDelayDuration] = useState(data.delayDuration || '');

  const handleSelectChange = (event) => {
    const selectedContent = event.target.value;
    setDelayDuration(selectedContent);

    // Call the onChange callback to pass the selected content back to the parent
    if (data.onChange) {
      data.onChange(selectedContent);
    }
  };

  return (
    <div 
      style={{
        padding: '20px',
        backgroundColor: '#e0f7fa', // Light blue background
        borderRadius: '8px',
        minWidth: '200px',
        border: '2px solid #00bcd4', // Blue border
        display: 'flex',
        flexDirection: 'column', // Align elements vertically
        alignItems: 'center', // Center elements horizontally
        justifyContent: 'space-between', // Space between items
      }}
    >
      {/* Top Handle */}
      <Handle 
        type="target" 
        position="top" 
        id="top" 
        style={{
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
        }} 
      />

      {/* Heading */}
      <h3 style={{
        textAlign: 'center', 
        margin: '10px 0',
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#00796b', // Darker teal color for the heading
      }}>Wait/Delay</h3>

      {/* Delay Dropdown */}
      <label htmlFor="delaySelect" style={{
        display: 'block', 
        marginBottom: '8px',
        width: '100%',
        textAlign: 'left', // Align label to the left
        color: '#00796b', // Darker teal color for the label
      }}>
        Delay Duration
      </label>
      <select
        id="delaySelect"
        value={delayDuration}
        onChange={handleSelectChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #00bcd4', // Light blue border
          fontFamily: 'Arial, sans-serif',
          marginBottom: '10px',
        }}
      >
        <option value="">Select a Duration</option>
        <option value="1">1 Hour</option>
        <option value="2">2 Hour</option>
        <option value="3">3 Hour</option>
        <option value="4">4 Hour</option>
      </select>

      {/* Bottom Handle */}
      <Handle 
        type="source" 
        position="bottom" 
        id="bottom" 
        style={{
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
        }} 
      />
    </div>
  );
};

export default WaitDelayNode;

