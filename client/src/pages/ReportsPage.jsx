import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock data to simulate a backend API response.
// Replace this with a fetch call to your actual backend once it's implemented.
const mockLeadsOverTime = [
  { name: 'Jan', leads: 4000, placed: 2400 },
  { name: 'Feb', leads: 3000, placed: 1398 },
  { name: 'Mar', leads: 2000, placed: 9800 },
  { name: 'Apr', leads: 2780, placed: 3908 },
  { name: 'May', leads: 1890, placed: 4800 },
  { name: 'Jun', leads: 2390, placed: 3800 },
  { name: 'Jul', leads: 3490, placed: 4300 },
  { name: 'Aug', leads: 4500, placed: 5200 },
];

const mockLeadSources = [
  { name: 'Job Portal', count: 400 },
  { name: 'Referral', count: 300 },
  { name: 'Social Media', count: 200 },
  { name: 'Walk-ins', count: 150 },
  { name: 'Partners', count: 100 },
];

const mockAgentPerformance = [
  { name: 'John Doe', activeCases: 25, successRate: '92%' },
  { name: 'Jane Smith', activeCases: 18, successRate: '85%' },
  { name: 'Sam Wilson', activeCases: 32, successRate: '95%' },
  { name: 'Emily White', activeCases: 21, successRate: '88%' },
];

const ReportsPage = () => {
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="container-global">
        {/* Main Heading */}
        <h1 className="text-heading-lg mb-6 text-gray-800">Reports Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Total Candidates</h3>
            <p className="mt-2 text-4xl font-bold color-primary">5,432</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Placed Candidates</h3>
            <p className="mt-2 text-4xl font-bold text-green-600">1,210</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Active Agents</h3>
            <p className="mt-2 text-4xl font-bold text-gray-800">15</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Open Job Posts</h3>
            <p className="mt-2 text-4xl font-bold color-secondary">245</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Leads Over Time Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Leads and Placements Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockLeadsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#1B3890"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="placed" stroke="#0F79C5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Sources Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Leads by Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockLeadSources}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#1B3890" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Performance Table */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Agent Performance Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Cases
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAgentPerformance.map((agent, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.activeCases}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.successRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;