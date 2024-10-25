import React, { useState } from 'react';

const Issues = () => {
  const [activeTab, setActiveTab] = useState('reported');

  // Table content based on active tab
  const renderTableContent = () => {
    switch (activeTab) {
      case 'reported':
        return (
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
                <th className="p-3 w-1/12 text-left">SL.NO</th>
                <th className="p-3 w-4/12 text-left">ISSUE</th>
                <th className="p-3 w-3/12 text-left">REPORTED ON</th>
                <th className="p-3 w-3/12 text-left">ASSIGNED ON</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">1</td>
                <td className="p-3">No water supply</td>
                <td className="p-3">October 20, 2024</td>
                <td className="p-3">October 21, 2024</td>
              </tr>
            </tbody>
          </table>
        );

      case 'verify':
        return (
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
                <th className="p-3 w-1/12 text-left">SL.NO</th>
                <th className="p-3 w-2/12 text-left">ISSUE</th>
                <th className="p-3 w-2/12 text-left">LOCATION</th>
                <th className="p-3 w-2/12 text-left">REPORTED ON</th>
                <th className="p-3 w-2/12 text-left">ASSIGNED ON</th>
                <th className="p-3 w-2/12 text-left">TECHNICIAN</th>
                <th className="p-3 w-2/12 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">1</td>
                <td className="p-3">Low water pressure</td>
                <td className="p-3">Main Street, Sector 5</td>
                <td className="p-3">October 18, 2024</td>
                <td className="p-3">October 19, 2024</td>
                <td className="p-3">John Doe</td>
                <td className="p-3">Pending Verification</td>
              </tr>
            </tbody>
          </table>
        );

      case 'resolved':
        return (
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
                <th className="p-3 w-1/12 text-left">SL.NO</th>
                <th className="p-3 w-3/12 text-left">ISSUE</th>
                <th className="p-3 w-3/12 text-left">LOCATION</th>
                <th className="p-3 w-2/12 text-left">REPORTED ON</th>
                <th className="p-3 w-2/12 text-left">ASSIGNED ON</th>
                <th className="p-3 w-2/12 text-left">TECHNICIAN</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">1</td>
                <td className="p-3">Water leak</td>
                <td className="p-3">Park Avenue, Block A</td>
                <td className="p-3">October 15, 2024</td>
                <td className="p-3">October 16, 2024</td>
                <td className="p-3">Jane Smith</td>
              </tr>
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setActiveTab('reported')}
          className={`px-6 py-2 font-semibold rounded-full transition-all ${
            activeTab === 'reported' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white`}
        >
          REPORTED
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={`px-6 py-2 font-semibold rounded-full transition-all ${
            activeTab === 'verify' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white`}
        >
          VERIFY
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`px-6 py-2 font-semibold rounded-full transition-all ${
            activeTab === 'resolved' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white`}
        >
          RESOLVED
        </button>
      </div>

      {/* Render table based on active tab */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        {renderTableContent()}
      </div>
    </div>
  );
};

export default Issues;
