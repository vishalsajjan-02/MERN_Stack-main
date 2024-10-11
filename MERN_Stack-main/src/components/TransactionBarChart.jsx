import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionBarChart = ({ barChartData }) => {
  const data = barChartData ? Object.entries(barChartData).map(([range, count]) => ({ range, count })) : [];

  if (data.length === 0) {
    return <div>No bar chart data available</div>;
  }

  return (
    <div className="h-96 mb-8">
      <h2 className="text-xl font-bold mb-4">Price Range Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionBarChart;