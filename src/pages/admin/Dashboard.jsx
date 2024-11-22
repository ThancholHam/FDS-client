import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Sales</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">$12,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-500 mt-2">345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Customers</h2>
          <p className="text-2xl font-bold text-yellow-500 mt-2">150</p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span>New order placed by John Doe</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Product "Headphones" was added</span>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>New customer "Jane Smith" registered</span>
            <span className="text-gray-500 text-sm">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
