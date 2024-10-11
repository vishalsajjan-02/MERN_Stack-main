const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let transactions = [];

// Initialize database
app.get('/api/initialize', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    transactions = response.data;
    res.json({ message: 'Database initialized successfully', count: transactions.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// List all transactions
app.get('/api/transactions', (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  
  let filteredTransactions = transactions.filter(t => {
    const saleDate = new Date(t.dateOfSale);
    return saleDate.toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase();
  });

  if (search) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.price.toString().includes(search)
    );
  }

  const startIndex = (page - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + parseInt(perPage));

  res.json({
    transactions: paginatedTransactions,
    totalCount: filteredTransactions.length,
    page: parseInt(page),
    perPage: parseInt(perPage)
  });
});

// Statistics
app.get('/api/statistics', (req, res) => {
  const { month } = req.query;
  
  const filteredTransactions = transactions.filter(t => {
    const saleDate = new Date(t.dateOfSale);
    return saleDate.toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase();
  });

  const totalSaleAmount = filteredTransactions.reduce((sum, t) => sum + t.price, 0);
  const soldItems = filteredTransactions.filter(t => t.sold).length;
  const notSoldItems = filteredTransactions.length - soldItems;

  res.json({
    totalSaleAmount,
    soldItems,
    notSoldItems
  });
});

// Bar chart data
app.get('/api/bar-chart', (req, res) => {
  const { month } = req.query;
  
  const filteredTransactions = transactions.filter(t => {
    const saleDate = new Date(t.dateOfSale);
    return saleDate.toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase();
  });

  const priceRanges = {
    '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0, '401-500': 0,
    '501-600': 0, '601-700': 0, '701-800': 0, '801-900': 0, '901-above': 0
  };

  filteredTransactions.forEach(t => {
    const price = t.price;
    if (price <= 100) priceRanges['0-100']++;
    else if (price <= 200) priceRanges['101-200']++;
    else if (price <= 300) priceRanges['201-300']++;
    else if (price <= 400) priceRanges['301-400']++;
    else if (price <= 500) priceRanges['401-500']++;
    else if (price <= 600) priceRanges['501-600']++;
    else if (price <= 700) priceRanges['601-700']++;
    else if (price <= 800) priceRanges['701-800']++;
    else if (price <= 900) priceRanges['801-900']++;
    else priceRanges['901-above']++;
  });

  res.json(priceRanges);
});

// Pie chart data
app.get('/api/pie-chart', (req, res) => {
  const { month } = req.query;
  
  const filteredTransactions = transactions.filter(t => {
    const saleDate = new Date(t.dateOfSale);
    return saleDate.toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase();
  });

  const categories = {};
  filteredTransactions.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + 1;
  });

  res.json(categories);
});

// Combined data
app.get('/api/combined-data', async (req, res) => {
  const { month } = req.query;
  
  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:${PORT}/api/transactions?month=${month}`),
      axios.get(`http://localhost:${PORT}/api/statistics?month=${month}`),
      axios.get(`http://localhost:${PORT}/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:${PORT}/api/pie-chart?month=${month}`)
    ]);

    res.json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});