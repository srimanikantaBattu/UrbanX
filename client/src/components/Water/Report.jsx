import React, { useState } from 'react';
import { useIssues } from './IssuesContext'; // Import the context
import Navbar from './Navbar';

const Report = () => {
  const [issue, setIssue] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const { addIssue } = useIssues(); // Get addIssue function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportedDate = new Date().toLocaleDateString();
    const assignedDate = new Date();
    assignedDate.setDate(assignedDate.getDate() + 2); // Assign date 2 days after reported date

    const newIssue = {
      issue,
      location: `${street}, ${area}, ${city}, ${state}, ${zipCode}`, // Combine address fields
      reportedOn: reportedDate,
      assignedOn: assignedDate.toLocaleDateString(),
      technician: getRandomTechnician(),
    };

    addIssue(newIssue);
    setIssue('');
    setStreet('');
    setArea('');
    setCity('');
    setState('');
    setZipCode('');
  };

  const getRandomTechnician = () => {
    const technicians = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Charlie Davis',
                         'David Wilson', 'Emma Taylor', 'Olivia Martinez', 'Lucas Thompson',
                         'Sophia Anderson'];
    return technicians[Math.floor(Math.random() * technicians.length)];
  };

  return (
    <div>
        <Navbar/>
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Report an Issue</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">Water Problem</label>
          <select 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="" disabled>Select a water problem</option>
            <option value="No water supply">No water supply</option>
            <option value="Low water pressure">Low water pressure</option>
            <option value="Water leak">Water leak</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">Street</label>
          <input 
            type="text" 
            placeholder="Street" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">Area/Colony</label>
          <input 
            type="text" 
            placeholder="Area/Colony" 
            value={area} 
            onChange={(e) => setArea(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
          <input 
            type="text" 
            placeholder="City" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
          <input 
            type="text" 
            placeholder="State" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">Zip Code</label>
          <input 
            type="text" 
            placeholder="Zip Code" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Report;
