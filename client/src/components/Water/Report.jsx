import React from 'react';

const Report = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Report an Issue</h2>
      <p>This is where the user can report issues related to the water supply.</p>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea placeholder="Describe the issue" style={{ width: '60%', height: '100px', marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}></textarea>
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none' }}>Submit</button>
      </form>
    </div>
  );
};

export default Report;
