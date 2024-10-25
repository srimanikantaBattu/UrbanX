import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

const WaterHome = () => {
  const [flowRateData, setFlowRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error fetching data: {error.message}</div>;

  const flowRates = flowRateData.map(feed => parseFloat(feed.field1)).filter(rate => !isNaN(rate));
  const filteredData = flowRateData.filter(feed => {
    const feedDate = new Date(feed.created_at);
    return (
      feedDate.getFullYear() === selectedDate.getFullYear() &&
      feedDate.getMonth() === selectedDate.getMonth() &&
      feedDate.getDate() === selectedDate.getDate()
    );
  });

  const chartData = filteredData.map(feed => ({
    time: new Date(feed.created_at).toLocaleTimeString(),
    flowRate: parseFloat(feed.field1),
  }));

  const averageFlowRate = flowRates.reduce((sum, rate) => sum + rate, 0) / flowRates.length;
  const averageFlowRateM3S = averageFlowRate / 1000 / 60;
  const averagePressure = (Math.pow(averageFlowRateM3S, 2) * waterDensity) / Math.pow(pipeArea, 2);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Water Flow Insights Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">

        {/* Left Panel - Graph and Date Picker */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Sensor Data</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Flow Rate (LPM)', angle: -90, position: 'insideLeft', offset: 10 }} />
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
              <h3 className="text-lg font-semibold">Average Water Pressure</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{averagePressure.toFixed(2)} Pa</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">Average Flow Rate</h3>
              <p className="text-2xl font-bold text-teal-600 mt-2">{averageFlowRate.toFixed(2)} LPM</p>
            </div>
            <div className="flex items-center justify-between bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow mt-4">
              <span>⚠️</span>
              <p className="text-center font-medium">Low water supply detected</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow mt-4">
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterHome;
