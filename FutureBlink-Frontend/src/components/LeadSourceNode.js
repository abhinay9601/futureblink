
import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const LeadSourceNode = ({ data }) => {
  const [leadSource, setLeadSource] = useState(data.leadSource || '');

  const handleSelectChange = (event) => {
    const selectedContent = event.target.value;
    // console.log(selectedContent);
    setLeadSource(selectedContent);

    // Call the onChange callback to pass the selected content back to the parent
    if (data.onChange) {
        console.log("true")
      data.onChange(selectedContent);
    }
  };

  return (
    <div 
      style={{
        padding: '20px',
        backgroundColor: '#f3e5f5', // Light purple background
        borderRadius: '8px',
        minWidth: '200px',
        border: '2px solid #9c27b0', // Purple border
        display: 'flex',
        flexDirection: 'column', // Align elements vertically
        alignItems: 'center', // Center elements horizontally
        justifyContent: 'space-between', // Space between items
      }}
    >
      

      {/* Heading */}
      <h3 style={{
        textAlign: 'center', 
        margin: '10px 0',
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#8e24aa', // Darker purple color for the heading
      }}>Lead Source</h3>

      {/* Lead Source Dropdown */}
      <label htmlFor="leadSourceSelect" style={{
        display: 'block', 
        marginBottom: '8px',
        width: '100%',
        textAlign: 'left', // Align label to the left
        color: '#8e24aa', // Darker purple color for the label
      }}>
        Source
      </label>
      <select
        id="leadSourceSelect"
        value={leadSource}
        onChange={handleSelectChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #9c27b0', // Light purple border
          fontFamily: 'Arial, sans-serif',
          marginBottom: '10px',
        }}
      >
        <option value="">Select a Source</option>
        <option value="Organic Search">Organic Search</option>
        <option value="Paid Ads">Paid Ads</option>
        <option value="Social Media">Social Media</option>
        <option value="Referral">Referral</option>
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

export default LeadSourceNode;

