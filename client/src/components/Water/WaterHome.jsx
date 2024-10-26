import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const WaterHome = () => {
  const [flowRateData, setFlowRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [selectedPipe, setSelectedPipe] = useState('');
  
  const pipeDiameter = 0.1; // Diameter in meters (10 cm)
  const pipeArea = Math.PI * Math.pow(pipeDiameter / 2, 2); // Area in m²
  const waterDensity = 1000; // Density of water in kg/m³
  const navigate = useNavigate();

  const areas = ['Area 1', 'Area 2'];
  const streets = ['Street A', 'Street B'];
  const pipes = ['Pipe 101', 'Pipe 102'];

  const apiLinks = {
    'Area 1': {
      'Street A': {
        'Pipe 101': 'https://api.thingspeak.com/channels/2711332/feeds.json?api_key=LUT4AJGB1TO95XR4&results=1000',
        'Pipe 102': 'https://api.thingspeak.com/channels/2715108/feeds.json?api_key=ZWDS3GRWW7KEZYYN&results=1000',
      },
      'Street B': {
        'Pipe 101': 'https://api.thingspeak.com/channels/2715135/feeds.json?api_key=4EB8N6HV4PEW1P47&results=1000',
        'Pipe 102': 'https://api.thingspeak.com/channels/2715136/feeds.json?api_key=89LQLKBBUB30CZ77&results=1000',
      },
    },
    'Area 2': {
      'Street A': {
        'Pipe 101': 'https://api.thingspeak.com/channels/2715144/feeds.json?api_key=F0MDBBWPMDASTZEL&results=1000',
        'Pipe 102': 'https://api.thingspeak.com/channels/2715145/feeds.json?api_key=N78E7VV1HHUR2YT9&results=1000',
      },
      'Street B': {
        'Pipe 101': 'https://api.thingspeak.com/channels/2715146/feeds.json?api_key=G7Y21QZGWPS29I88&results=1000',
        'Pipe 102': 'https://api.thingspeak.com/channels/2715148/feeds.json?api_key=IJYN0XXH2NUGSP0O&results=1000',
      },
    },
  };

  // Helper function to get API link based on selected area, street, and pipe
  const getApiLink = (area, street, pipe) => {
    return apiLinks[area]?.[street]?.[pipe] || null;
  };

  // Fetch data when selected area, street, or pipe changes
  useEffect(() => {
    const fetchData = async () => {
      const apiLink = getApiLink(selectedArea, selectedStreet, selectedPipe);
      if (!apiLink) return; // Exit if no valid API link

      setLoading(true);
      try {
        const response = await axios.get(apiLink);
        setFlowRateData(response.data.feeds);
        setError(null);
      } catch (err) {
        setError(err);
        setFlowRateData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedArea, selectedStreet, selectedPipe]);

  // if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error fetching data: {error.message}</div>;

  // Filter data based on selected date
  const filteredData = flowRateData.filter(feed => {
    const feedDate = new Date(feed.created_at);
    return (
      feedDate.getFullYear() === selectedDate.getFullYear() &&
      feedDate.getMonth() === selectedDate.getMonth() &&
      feedDate.getDate() === selectedDate.getDate()
    );
  });

  const flowRates = filteredData.map(feed => parseFloat(feed.field1)).filter(rate => !isNaN(rate));

  // Calculate average flow rate and highest pressure
  const averageFlowRate = flowRates.length > 0 
    ? flowRates.reduce((sum, rate) => sum + rate, 0) / flowRates.length 
    : 0;

  const averageFlowRateM3S = (averageFlowRate / 60) / 1000;
  const highestFlowRate = Math.max(...flowRates) || 0;
  const highestFlowRateM3S = (highestFlowRate / 60) / 1000;
  const highestPressure = (highestFlowRateM3S > 0 && pipeArea > 0) 
    ? (Math.pow(highestFlowRateM3S, 2) * waterDensity) / Math.pow(pipeArea, 2) 
    : 0;

  const chartData = filteredData.map(feed => ({
    time: new Date(feed.created_at).toLocaleTimeString(),
    flowRate: parseFloat(feed.field1),
  }));

  const handleReportIssue = () => {
    navigate('/report');
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Water Flow Insights Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left Panel - Graph and Filters */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Sensor Data</h2>
          
          {/* Dropdowns for Area, Street, Pipe */}
          <div className="flex justify-around mb-4">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Area</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <select
              value={selectedStreet}
              onChange={(e) => setSelectedStreet(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Street</option>
              {streets.map(street => (
                <option key={street} value={street}>{street}</option>
              ))}
            </select>
            <select
              value={selectedPipe}
              onChange={(e) => setSelectedPipe(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Pipe</option>
              {pipes.map(pipe => (
                <option key={pipe} value={pipe}>{pipe}</option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="flowRate" name="Water Flow Rate (LPM)" stroke="#38bdf8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-center mt-4">
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Panel - Insights */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Water Flow Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
              <span className="text-gray-600 text-sm">Average Flow Rate (LPM)</span>
              <span className="text-2xl font-bold text-blue-600">{averageFlowRate.toFixed(2)} LPM</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
              <span className="text-gray-600 text-sm">Highest Pressure Recorded (Pa)</span>
              <span className="text-2xl font-bold text-red-500">{highestPressure.toFixed(2)} Pa</span>
            </div>
          </div>
          <button
            onClick={handleReportIssue}
            className="mt-6 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
          >
            Report Issue
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WaterHome;