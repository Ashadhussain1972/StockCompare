import React from 'react';
import Table from './Table';

function StockList({ stocks }) {
  return (
    <div>
      {stocks.length > 0 && stocks.map((stockData, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">{stockData.stock.toUpperCase()}</h2>
          <Table data={stockData} />
        </div>
      ))}
    </div>
  );
}

export default StockList;
