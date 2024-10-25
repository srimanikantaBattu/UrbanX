import React, { useState } from 'react';
import { useIssues } from './IssuesContext'; // Import the context

const Issues = () => {
  const [activeTab, setActiveTab] = useState('reported');
  const { issues } = useIssues(); // Get issues from context

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
              {issues.map((issue, index) => (
                <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{issue.issue}</td>
                  <td className="p-3">{issue.reportedOn}</td>
                  <td className="p-3">{issue.assignedOn}</td>
                </tr>
              ))}
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
              {issues.map((issue, index) => (
                <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{issue.issue}</td>
                  <td className="p-3">{issue.location}</td>
                  <td className="p-3">{issue.reportedOn}</td>
                  <td className="p-3">{issue.assignedOn}</td>
                  <td className="p-3">{issue.technician}</td>
                  <td className="p-3">Pending Verification</td>
                </tr>
              ))}
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
              {/* Here you could add resolved issues similarly, if you have a mechanism to change the state of issues */}
              {/* For now, we'll keep it simple and just show reported issues */}
              {issues.map((issue, index) => (
                <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{issue.issue}</td>
                  <td className="p-3">{issue.location}</td>
                  <td className="p-3">{issue.reportedOn}</td>
                  <td className="p-3">{issue.assignedOn}</td>
                  <td className="p-3">{issue.technician}</td>
                </tr>
              ))}
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

