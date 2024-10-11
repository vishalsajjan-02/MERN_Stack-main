import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import TransactionStatistics from './TransactionStatistics';
import TransactionBarChart from './TransactionBarChart';
import MonthSelector from './MonthSelector';
import SearchBox from './SearchBox';

// Mock data
/*const mockTransactions = [
  { id: 1, title: 'Product A', description: 'Description A', price: 100, category: 'Electronics', sold: true, image: 'https://via.placeholder.com/50' },
  { id: 2, title: 'Product B', description: 'Description B', price: 200, category: 'Clothing', sold: false, image: 'https://via.placeholder.com/50' },
  // Add more mock transactions as needed
];

const mockStatistics = {
  totalSaleAmount: 1000,
  soldItems: 5,
  notSoldItems: 3
};

const mockBarChartData = {
  '0-100': 2,
  '101-200': 3,
  '201-300': 1,
  '301-400': 0,
  '401-500': 1
};*/

const fetchTransactionData= async (month) => {
  const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/roxiler.com/product_transaction.json?month={}'`);

}
const TransactionDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchQuery, setSearchQuery] = useState('');
  

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactionData', selectedMonth],
    queryFn: () => fetchTransactionData(selectedMonth),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Transaction Dashboard</h1>
      <div className="flex justify-between mb-4">
        <SearchBox setSearchQuery={setSearchQuery} />
        <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      </div>
      <TransactionStatistics statistics={data.statistics} />
      <TransactionTable 
        transactions={data.transactions.transactions} 
        searchQuery={searchQuery}
      />
      <TransactionBarChart barChartData={data.barChart} />
    </div>
  );
};

export default TransactionDashboard;