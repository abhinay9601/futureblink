import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const ColdEmailNode = ({ data }) => {
  const [emailContent, setEmailContent] = useState(data.emailContent || '');

  const handleSelectChange = (event) => {
    const selectedContent = event.target.value;
    setEmailContent(selectedContent);

    // Call the onChange callback to pass the selected content back to the parent
    if (data.onChange) {
      data.onChange(selectedContent);
    }
  };

  return (
    <div 
      style={{
        padding: '20px',
        backgroundColor: '#fce4ec', // Light pink background
        borderRadius: '8px',
        minWidth: '200px',
        border: '2px solid #f06292', // Pink border
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
        color: '#e91e63', // Darker pink color for the heading
      }}>Cold Email</h3>

      {/* Email Dropdown */}
      <label htmlFor="emailSelect" style={{
        display: 'block', 
        marginBottom: '8px',
        width: '100%',
        textAlign: 'left', // Align label to the left
        color: '#e91e63', // Darker pink color for the label
      }}>
        Email
      </label>
      <select
        id="emailSelect"
        value={emailContent}
        onChange={handleSelectChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #f06292', // Light pink border
          fontFamily: 'Arial, sans-serif',
          marginBottom: '10px',
        }}
      >
        <option value="">Select an Email</option>
        <option value="Introduction">Introduction Email</option>
        <option value="Follow-Up">Follow-Up Email</option>
        <option value="Offer">Special Offer Email</option>
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

export default ColdEmailNode;


// import React, { useState } from 'react';
// import { Handle } from 'react-flow-renderer';

// const ColdEmailNode = ({ data, onChange }) => {
//   const [emailContent, setEmailContent] = useState(data.emailContent || '');

//   const handleSelectChange = (event) => {
//     const selectedContent = event.target.value;
//     setEmailContent(selectedContent);

//     // Call the onChange callback to pass the selected content back to the parent
//     if (onChange) {
//       onChange(selectedContent);
//     }
//   };

//   return (
//     <div style={{ /* styling omitted for brevity */ }}>
//       {/* Top Handle */}
//       <Handle type="target" position="top" id="top" />

//       <h3>Cold Email</h3>
      
//       <label htmlFor="emailSelect">Email</label>
//       <select id="emailSelect" value={emailContent} onChange={handleSelectChange}>
//         <option value="">Select an Email</option>
//         <option value="Introduction">Introduction Email</option>
//         <option value="Follow-Up">Follow-Up Email</option>
//         <option value="Offer">Special Offer Email</option>
//       </select>

//       {/* Bottom Handle */}
//       <Handle type="source" position="bottom" id="bottom" />
//     </div>
//   );
// };

// export default ColdEmailNode;
