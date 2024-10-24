import React, { useState } from 'react';

const Issues = () => {
  const [activeTab, setActiveTab] = useState('reported');

  // Table content based on active tab
  const renderTableContent = () => {
    switch (activeTab) {
      case 'reported':
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th>SL.NO</th>
                <th>ISSUE</th>
                <th>REPORTED ON</th>
                <th>ASSIGNED ON</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>1</td>
                <td>No water supply</td>
                <td>October 20, 2024</td>
                <td>October 21, 2024</td>
              </tr>
            </tbody>
          </table>
        );
      
      case 'verify':
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th>SL.NO</th>
                <th>ISSUE</th>
                <th>LOCATION</th>
                <th>REPORTED ON</th>
                <th>ASSIGNED ON</th>
                <th>TECHNICIAN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>1</td>
                <td>Low water pressure</td>
                <td>Main Street, Sector 5</td>
                <td>October 18, 2024</td>
                <td>October 19, 2024</td>
                <td>John Doe</td>
                <td>Pending Verification</td>
              </tr>
            </tbody>
          </table>
        );
      
      case 'resolved':
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th>SL.NO</th>
                <th>ISSUE</th>
                <th>LOCATION</th>
                <th>REPORTED ON</th>
                <th>ASSIGNED ON</th>
                <th>TECHNICIAN</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>1</td>
                <td>Water leak</td>
                <td>Park Avenue, Block A</td>
                <td>October 15, 2024</td>
                <td>October 16, 2024</td>
                <td>Jane Smith</td>
              </tr>
            </tbody>
          </table>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('reported')} 
          style={{ padding: '10px', background: activeTab === 'reported' ? '#007bff' : '#ccc', color: '#fff' }}>
          REPORTED
        </button>
        <button 
          onClick={() => setActiveTab('verify')} 
          style={{ padding: '10px', background: activeTab === 'verify' ? '#007bff' : '#ccc', color: '#fff' }}>
          VERIFY
        </button>
        <button 
          onClick={() => setActiveTab('resolved')} 
          style={{ padding: '10px', background: activeTab === 'resolved' ? '#007bff' : '#ccc', color: '#fff' }}>
          RESOLVED
        </button>
      </div>

      {/* Render table based on active tab */}
      {renderTableContent()}
    </div>
  );
};

export default Issues;
