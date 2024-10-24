import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css'; // Tailwind CSS import

const WaterHome = () => {
  const [flowRateData, setFlowRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Define fixed pipe diameter (in meters) and calculate cross-sectional area
  const pipeDiameter = 0.1; // 10 cm
  const pipeArea = Math.PI * Math.pow(pipeDiameter / 2, 2); // m²
  const waterDensity = 1000; // kg/m³

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.thingspeak.com/channels/2711332/feeds.json?api_key=LUT4AJGB1TO95XR4&results=1000'
        );
        setFlowRateData(response.data.feeds);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Format data for the chart
  const flowRates = flowRateData.map(feed => parseFloat(feed.field1)).filter(rate => !isNaN(rate));
  
  // Filter data based on selected date
  const filteredData = flowRateData.filter(feed => {
    const feedDate = new Date(feed.created_at);
    return (
      feedDate.getFullYear() === selectedDate.getFullYear() &&
      feedDate.getMonth() === selectedDate.getMonth() &&
      feedDate.getDate() === selectedDate.getDate()
    );
  });

  const chartData = filteredData.map(feed => ({
    time: new Date(feed.created_at).toLocaleString(),
    flowRate: parseFloat(feed.field1)
  }));

  // Calculate average flow rate (in m³/s)
  const averageFlowRate = flowRates.reduce((sum, rate) => sum + rate, 0) / flowRates.length;
  const averageFlowRateM3S = averageFlowRate / 1000 / 60; // L/min to m³/s

  // Calculate average pressure
  const averagePressure = (Math.pow(averageFlowRateM3S, 2) * waterDensity) / Math.pow(pipeArea, 2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl w-full grid grid-cols-2 gap-4">
        {/* Left Side - Sensor Chart */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Sensor</h2>
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-teal-400 w-4 h-4 inline-block"></span>
            <span>Water Flow</span>
            <span className="bg-pink-400 w-4 h-4 inline-block ml-4"></span>
            <span>Water Pressure</span>
          </div>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="flowRate" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
          <div className="mt-4">
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="border p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Pressure and Flow Info */}
        <div className="flex flex-col justify-center items-center bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between w-full mb-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Water Pressure</h3>
              <p className="text-3xl font-bold">{averagePressure.toFixed(2)} pa</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Water Flowrate</h3>
              <p className="text-3xl font-bold">{averageFlowRate.toFixed(2)} lpm</p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-yellow-200 text-yellow-800 p-2 rounded-lg">
            <span className="mr-2">⚠️</span> Low water supply is detected.
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterHome;