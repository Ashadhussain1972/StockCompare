import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import DropdownList from './DropdownList';
import StockBarChart from './StockBarChart';

const StockDataViewer = () => {
  const [query, setQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks?query=${query}`);
      setStocks(response.data);
    } catch (err) {
      setError('Error fetching data');
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
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full" style={{ maxWidth: '90vw' }}>
        <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-8">
          <SearchForm query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
          {loading && <p className="text-blue-400 mt-4">Loading...</p>}
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        <div className="bg-white-800 shadow-xl rounded-lg p-8 mb-8">
          <DropdownList
            data={stocks}
            selectedKey={selectedKey}
            onSelectionChange={handleSelectionChange}
            selectedValues={selectedValues}
          />
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-8">
          <StockBarChart stocks={stocks} selectedKey={selectedKey} />
        </div>
      </div>
    </div>
  );
};

export default StockDataViewer;
