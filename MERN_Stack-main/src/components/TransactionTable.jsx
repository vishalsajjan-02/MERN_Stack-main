import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TransactionTable = ({ transactions = [], searchQuery }) => {
  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.price.toString().includes(searchQuery)
  );

  if (filteredTransactions.length === 0) {
    return <div>No transactions found</div>;
  }

  return (
    <div className="mb-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
              <TableCell>
              <img src={transaction.image} alt={transaction.title} className="w-10 h-10 object-cover" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;