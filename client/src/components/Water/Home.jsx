import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sensor chart */}
        <div style={{ width: '60%' }}>
          <h3>Sensor</h3>
          <div style={{ height: '200px', border: '1px solid #ddd', padding: '10px' }}>
            <p>Water Flow</p>
            <p>Water Pressure</p>
            <p>Chart would go here...</p>
          </div>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>October 24th, 2024</div>
        </div>

        {/* Water Pressure and Flowrate */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd', marginBottom: '10px' }}>
            <h4>Water Pressure</h4>
            <h1>4.53 pa</h1>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd' }}>
            <h4>Water Flowrate</h4>
            <h1>2.68 lpm</h1>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '10px', color: '#ff0000' }}>⚠️ Water supply is detected</div>
      <button style={{ marginTop: '10px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none' }}>Report</button>
    </div>
  );
};

export default Home;
