import React, { useState } from 'react';
import DropdownList from '../components/DropdownList';
import SearchForm from '../components/SearchForm';
import StockBarChart from '../components/StockBarChart';
import StockList from '../components/StockList';

function Compare() {
  const [stocks, setStocks] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/stocks?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      setError('Error fetching stock data');
      console.error('Error fetching stock data:', error);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStockData();
  };

  const handleSelectionChange = (event) => {
    const key = event.target.value;
    setSelectedKey(key);
    if (stocks.length > 0) {
      const values = stocks.map(stock => stock[key]).filter(value => value !== undefined);
      setSelectedValues(values);
    } else {
      setSelectedValues([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
        Stock Comparison
      </h1>
      <div className="w-full max-w-3xl bg-gray-700 shadow-2xl rounded-xl p-8 mb-8">
        <SearchForm query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        {loading && <p className="text-blue-400 mt-4 text-xl font-semibold">Loading...</p>}
        {error && <p className="text-red-400 mt-4 text-xl font-semibold">{error}</p>}
      </div>
      
      {stocks.length > 0 && (
        <div className="w-full max-w-3xl bg-gray-700 shadow-2xl rounded-xl p-8">
          <DropdownList
            data={stocks}
            selectedKey={selectedKey}
            onSelectionChange={handleSelectionChange}
            selectedValues={selectedValues}
          />
          <div className="mt-8">
            <StockBarChart stocks={stocks} selectedKey={selectedKey} />
          </div>
          <div className="mt-8">
            <StockList stocks={stocks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Compare;
