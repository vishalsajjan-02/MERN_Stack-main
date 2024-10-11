import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TransactionStatistics = ({ statistics }) => {
  if (!statistics) {
    return <div>No statistics available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${statistics.totalSaleAmount?.toFixed(2) || '0.00'}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{statistics.soldItems || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unsold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{statistics.notSoldItems || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStatistics;